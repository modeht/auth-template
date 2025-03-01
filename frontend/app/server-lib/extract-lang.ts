import { DEFAULT_LANG, supportedLanguages, type SupportedLanguages } from '../i18n/supported';
import en from '../i18n/en.json';
import { redirect } from 'react-router';

const langs = { en };

export function extractLang(request: Request | Location) {
	if (request instanceof Request) {
		const lang = new URL(request.url).pathname.split('/')[1] as SupportedLanguages;
		if (supportedLanguages.includes(lang)) {
			const t = langs[lang];
			return { lang: lang, t };
		} else {
			//starts with a lang
			const isLang = lang.length === 2;
			if (!isLang) {
				return {
					lang: DEFAULT_LANG,
					t: langs[DEFAULT_LANG],
					redirect: `/${DEFAULT_LANG}/${new URL(request.url).pathname.slice(2)}`,
				};
			}
			throw new Response('Page not found', {
				status: 404,
			});
		}
	} else if (request?.pathname) {
		const lang = request.pathname.split('/')[1] as SupportedLanguages;
		if (supportedLanguages.includes(lang)) {
			const t = langs[lang];
			return { lang: lang, t };
		} else {
			//starts with a lang
			const isLang = lang.length === 2;
			if (!isLang) {
				return {
					lang: DEFAULT_LANG,
					t: langs[DEFAULT_LANG],
					redirect: `/${DEFAULT_LANG}/${request.pathname.slice(2)}`,
				};
			}

			throw new Response('Page not found', {
				status: 404,
			});
		}
	}

	return { lang: DEFAULT_LANG, t: langs[DEFAULT_LANG], redirect: undefined };
}
