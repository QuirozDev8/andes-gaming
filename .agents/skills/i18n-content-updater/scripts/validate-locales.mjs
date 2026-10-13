import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../../');

const NAMESPACES = [
  'common',
  'home',
  'aboutPage',
  'casinoAggregation',
  'contactPage',
  'gameProvider',
  'gameStudio',
  'blog',
];

function extractInterpolations(text) {
  if (typeof text !== 'string') return [];
  const matches = text.match(/\{\{([^}]+)\}\}/g);
  return matches ? matches.map(m => m.trim()).sort() : [];
}

function compareObjects(esObj, enObj, currentPath = '', errors = []) {
  const esKeys = new Set(Object.keys(esObj || {}));
  const enKeys = new Set(Object.keys(enObj || {}));

  for (const key of esKeys) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key;
    if (!enKeys.has(key)) {
      errors.push(`[MISSING_IN_EN] Key "${fullPath}" exists in ES but missing in EN.`);
      continue;
    }

    const esVal = esObj[key];
    const enVal = enObj[key];

    if (typeof esVal !== typeof enVal) {
      errors.push(`[TYPE_MISMATCH] "${fullPath}": ES is ${typeof esVal}, EN is ${typeof enVal}.`);
      continue;
    }

    if (Array.isArray(esVal) || Array.isArray(enVal)) {
      if (!Array.isArray(esVal) || !Array.isArray(enVal)) {
        errors.push(`[TYPE_MISMATCH] "${fullPath}": Array type mismatch between ES and EN.`);
      } else if (esVal.length !== enVal.length) {
        errors.push(`[ARRAY_LENGTH_MISMATCH] "${fullPath}": ES length is ${esVal.length}, EN length is ${enVal.length}.`);
      }
      continue;
    }

    if (typeof esVal === 'object' && esVal !== null) {
      compareObjects(esVal, enVal, fullPath, errors);
    } else if (typeof esVal === 'string') {
      if (esVal.trim() === '') {
        errors.push(`[EMPTY_STRING_ES] "${fullPath}" is empty in ES.`);
      }
      if (enVal.trim() === '') {
        errors.push(`[EMPTY_STRING_EN] "${fullPath}" is empty in EN.`);
      }

      const esTokens = extractInterpolations(esVal);
      const enTokens = extractInterpolations(enVal);
      if (esTokens.join(',') !== enTokens.join(',')) {
        errors.push(
          `[INTERPOLATION_MISMATCH] "${fullPath}": Tokens mismatch. ES has [${esTokens.join(', ')}], EN has [${enTokens.join(', ')}]`
        );
      }
    }
  }

  for (const key of enKeys) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key;
    if (!esKeys.has(key)) {
      errors.push(`[MISSING_IN_ES] Key "${fullPath}" exists in EN but missing in ES.`);
    }
  }

  return errors;
}

async function runValidation() {
  console.log('🔍 Validating Andes Gaming i18n locales symmetry (ES <-> EN)...');
  let hasErrors = false;
  const allErrors = [];

  for (const ns of NAMESPACES) {
    const esPath = path.resolve(projectRoot, `src/i18n/locales/es/${ns}.ts`);
    const enPath = path.resolve(projectRoot, `src/i18n/locales/en/${ns}.ts`);

    try {
      const esModule = await import(`file://${esPath}`);
      const enModule = await import(`file://${enPath}`);

      const esData = esModule.default;
      const enData = enModule.default;

      if (!esData || !enData) {
        console.error(`❌ [${ns}] Default export missing in either ES or EN.`);
        hasErrors = true;
        continue;
      }

      const nsErrors = compareObjects(esData, enData, ns);
      if (nsErrors.length > 0) {
        hasErrors = true;
        allErrors.push(...nsErrors);
        console.error(`❌ [${ns}] Found ${nsErrors.length} issue(s):`);
        for (const err of nsErrors) {
          console.error(`   - ${err}`);
        }
      } else {
        console.log(`✅ [${ns}] Perfect symmetry (${Object.keys(esData).length} top-level sections).`);
      }
    } catch (err) {
      hasErrors = true;
      console.error(`❌ [${ns}] Error loading locale file:`, err.message);
    }
  }

  if (hasErrors) {
    console.error(`\n❌ Translation validation failed with ${allErrors.length} errors.`);
    process.exit(1);
  } else {
    console.log('\n✨ All locales are 100% synchronized and valid!');
    process.exit(0);
  }
}

runValidation();
