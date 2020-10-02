import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "localization/locales";

i18n.use(initReactI18next).init({
  resources: locales,
  lng: "en",
  ns: "translation",

  // react already safes from xss
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
