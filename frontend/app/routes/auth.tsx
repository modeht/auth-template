import type { Route } from './+types/home';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { CompanySection } from '../components/home/CompanySection';
import { AuthForm } from '../components/home/AuthForm';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Easygenerator Auth' }, { name: 'description', content: 'Easygenerator Auth' }];
}

export default function AuthPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeMode = searchParams.get('mode') || 'signup';
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleMode = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const newMode = activeMode === 'login' ? 'signup' : 'login';
		setSearchParams({ mode: newMode });
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		const mode = searchParams.get('mode');
		if (mode !== 'login' && mode !== 'signup') {
			setSearchParams({ mode: 'signup' });
			setIsExpanded(false);
		}

		if (mode === 'login') {
			setIsExpanded(true);
		} else if (mode === 'signup') {
			setIsExpanded(false);
		}
	}, [searchParams, setSearchParams]);

	return (
		<div className='min-h-screen h-screen w-full flex overflow-hidden bg-white font-sans'>
			<div className='max-w-8xl w-full mx-auto p-[14px] flex justify-between'>
				<CompanySection isExpanded={isExpanded} />

				<AuthForm
					isExpanded={isExpanded}
					activeMode={activeMode}
					toggleMode={toggleMode}
				/>
			</div>
		</div>
	);
}
