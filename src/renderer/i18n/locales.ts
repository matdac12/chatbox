import { Language } from '../../shared/types'

export const languageNameMap: Record<Language, string> = {
  'it-IT': 'Italiano',
}

export const languages = Array.from(Object.keys(languageNameMap)) as Language[]
