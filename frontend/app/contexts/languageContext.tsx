import { createContext } from 'react';
import { DEFAULT_LANG, type SupportedLanguages } from '../i18n/supported';

export interface LangContext {
	lang: SupportedLanguages;
	t: Record<string, string>;
	side: 'left' | 'right';
}
export const defaultLangContext: LangContext = {
	lang: DEFAULT_LANG,
	t: {},
	side: DEFAULT_LANG === 'en' ? 'right' : 'left',
};
export const LanguageContext = createContext(defaultLangContext);
