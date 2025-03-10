import {
	data,
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useNavigate,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { usePersistedStore } from './store/store';
import { themeCookieMaxAge, type ThemeSlice } from './store/themeSlice';
import { extractLang } from './server-lib/extract-lang';
import { DEFAULT_LANG } from './i18n/supported';
import { useLang } from './hooks/useLang';
import { LanguageContext } from './contexts/languageContext';
import { getAuthToken, getCookies } from './lib/axios';
import { getUser } from './server-lib/get-user';
import { useEffect } from 'react';
import { Toast } from './components/common/Toast';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
	},
	{ rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: Route.LoaderArgs) {
	const { lang, t, redirect: redirectToDefaultLang } = extractLang(request);

	if (redirectToDefaultLang) {
		return redirect(redirectToDefaultLang);
	}

	const cookies = getCookies(request);

	const auth_t = getAuthToken(cookies);
	const user = auth_t ? await getUser(auth_t) : undefined;
	const theme = cookies?.find((c) => c.trim().startsWith('theme='))?.split('=')[1] || 'light';

	return data(
		{
			theme: theme as ThemeSlice['mode'],
			lang,
			user,
			t,
		},
		{
			headers: {
				'Set-Cookie': `theme=${theme}; Max-age=${themeCookieMaxAge}; path=/`,
			},
		}
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	const serverData = useLoaderData<typeof loader>();

	const theme = usePersistedStore((state) => state.mode) || serverData?.theme;
	const lang = serverData?.lang;

	const setTheme = usePersistedStore((state) => state.setMode);

	useEffect(() => {
		setTheme(theme as ThemeSlice['mode']);
	}, []);

	return (
		<html
			lang={lang}
			dir={'ltr'}
		>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Theme appearance={theme}>{children}</Theme>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const d = useLang();
	return (
		<LanguageContext.Provider value={d}>
			<Outlet />
			<Toast />
		</LanguageContext.Provider>
	);
}

export function ErrorBoundary(errorBoundary: Route.ErrorBoundaryProps) {
	const { error } = errorBoundary;
	console.log('ErrorBoundary', errorBoundary);
	const navigate = useNavigate();
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className='pt-16 p-4 container mx-auto'>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className='w-full p-4 overflow-x-auto'>
					<code>{stack}</code>
				</pre>
			)}

			<button
				className='bg-cpurple-500 text-white px-4 py-2 rounded-md mt-4'
				onClick={() => {
					navigate('/');
				}}
			>
				Go to home
			</button>
		</main>
	);
}
