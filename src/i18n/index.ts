import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en/common";
import aboutPageEn from "./locales/en/aboutPage";
import casinoAggregationEn from "./locales/en/casinoAggregation";
import contactPageEn from "./locales/en/contactPage";
import gameProviderEn from "./locales/en/gameProvider";
import gameStudioEn from "./locales/en/gameStudio";
import homeEn from "./locales/en/home";
import blogEn from "./locales/en/blog";
import commonEs from "./locales/es/common";
import aboutPageEs from "./locales/es/aboutPage";
import casinoAggregationEs from "./locales/es/casinoAggregation";
import contactPageEs from "./locales/es/contactPage";
import gameProviderEs from "./locales/es/gameProvider";
import gameStudioEs from "./locales/es/gameStudio";
import homeEs from "./locales/es/home";
import blogEs from "./locales/es/blog";

export const SUPPORTED_LANGUAGES = ["es", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  es: {
    common: commonEs,
    aboutPage: aboutPageEs,
    casinoAggregation: casinoAggregationEs,
    contactPage: contactPageEs,
    gameProvider: gameProviderEs,
    gameStudio: gameStudioEs,
    home: homeEs,
    blog: blogEs,
  },
  en: {
    common: commonEn,
    aboutPage: aboutPageEn,
    casinoAggregation: casinoAggregationEn,
    contactPage: contactPageEn,
    gameProvider: gameProviderEn,
    gameStudio: gameStudioEn,
    home: homeEn,
    blog: blogEn,
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
