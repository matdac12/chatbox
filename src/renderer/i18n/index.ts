import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import itIT from './locales/it-IT/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    'it-IT': {
      translation: itIT,
    },
  },
  lng: 'it-IT',
  fallbackLng: 'it-IT',

  interpolation: {
    escapeValue: false,
  },

  detection: {
    caches: [],
  },
})

export default i18n

export function changelog() {
  return '' // No changelog for now
}
