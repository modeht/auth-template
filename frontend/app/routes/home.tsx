import { redirect, useLoaderData, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { getUser } from '../server-lib/get-user';
import { getCookies, removeAuthToken } from '../lib/axios';
import { getAuthToken } from '../lib/axios';
import { DEFAULT_LANG } from '../i18n/supported';
import { extractLang } from '../server-lib/extract-lang';
import { useEffect, useState } from 'react';
import { Confetti } from '@neoconfetti/react';
import { useLang } from '../hooks/useLang';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Easygenerator' }, { name: 'description', content: 'Easygenerator' }];
}

export async function loader({ request }: Route.LoaderArgs) {
	const cookies = getCookies(request);
	const { lang, t, redirect: redirectToDefaultLang } = extractLang(request);
	const auth_t = getAuthToken(cookies);
	const user = auth_t ? await getUser(auth_t) : undefined;

	if (user) {
		return {
			user,
		};
	}

	if (redirectToDefaultLang) {
		return redirect(`/${DEFAULT_LANG}/auth?mode=signup`);
	}

	return redirect(`/${lang}/auth?mode=signup`);
}

export default function HomePage() {
	const { user } = useLoaderData<typeof loader>();
	const [explode, setExplode] = useState(false);
	const navigate = useNavigate();
	const { lang } = useLang();

	useEffect(() => {
		setExplode(true);
	}, []);

	return (
		<div className='min-h-screen h-screen w-full overflow-hidden bg-white flex flex-col justify-center items-center'>
			<h1 className='text-cgray-900 text-4xl text-center font-semibold'>Welcome to The Application, {user?.name}</h1>
			<button
				className='bg-cpurple-500 text-white px-4 py-2 rounded-md mt-4'
				onClick={() => {
					removeAuthToken();
					navigate(`/${lang}`);
				}}
			>
				Logout
			</button>
			<Confetti />
		</div>
	);
}
