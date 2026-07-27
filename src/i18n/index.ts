import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en/common";
import casinoAggregationEn from "./locales/en/casinoAggregation";
import contactPageEn from "./locales/en/contactPage";
import homeEn from "./locales/en/home";
import commonEs from "./locales/es/common";
import casinoAggregationEs from "./locales/es/casinoAggregation";
import contactPageEs from "./locales/es/contactPage";
import homeEs from "./locales/es/home";

export const SUPPORTED_LANGUAGES = ["es", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  es: {
    common: commonEs,
    casinoAggregation: casinoAggregationEs,
    contactPage: contactPageEs,
    home: homeEs,
  },
  en: {
    common: commonEn,
    casinoAggregation: casinoAggregationEn,
    contactPage: contactPageEn,
    home: homeEn,
  },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: "es",
    defaultNS: "common",
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "andes-language",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = language.split("-")[0] ?? "es";
};

i18n.on("languageChanged", updateDocumentLanguage);
updateDocumentLanguage(i18n.resolvedLanguage ?? "es");

export default i18n;
