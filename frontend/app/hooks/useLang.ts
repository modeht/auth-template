import { useLoaderData, useParams } from 'react-router';
import { DEFAULT_LANG, type SupportedLanguages } from '../i18n/supported';
import type { LangContext } from '../contexts/languageContext';

export function useLang() {
	const url = useParams();
	const lang = (url.lang as SupportedLanguages) || DEFAULT_LANG;
	const side = (lang === 'ar' ? 'left' : 'right') as LangContext['side'];
	const t = useLoaderData()?.t || { error: 'No translation file found' };

	return {
		t,
		lang: lang,
		side,
	};
}
