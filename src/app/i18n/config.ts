import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import hi from "./locales/hi";
import ta from "./locales/ta";
import te from "./locales/te";
import bn from "./locales/bn";
import mr from "./locales/mr";
import gu from "./locales/gu";
import kn from "./locales/kn";
import ml from "./locales/ml";
import pa from "./locales/pa";
import ur from "./locales/ur";
import od from "./locales/od";

export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", script: "latin" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", script: "devanagari" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", script: "tamil" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", script: "telugu" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", script: "bengali" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", script: "devanagari" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", script: "gujarati" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", script: "kannada" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", script: "malayalam" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ", script: "gurmukhi" },
  { code: "ur", label: "Urdu", nativeLabel: "اردو", script: "arabic", rtl: true },
  { code: "od", label: "Odia", nativeLabel: "ଓଡ଼ିଆ", script: "odia" },
];

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ta: { translation: ta },
    te: { translation: te },
    bn: { translation: bn },
    mr: { translation: mr },
    gu: { translation: gu },
    kn: { translation: kn },
    ml: { translation: ml },
    pa: { translation: pa },
    ur: { translation: ur },
    od: { translation: od },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
