import type { Route } from './+types/home';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { CompanySection } from '../components/home/CompanySection';
import { AuthForm } from '../components/home/AuthForm';
import { motion } from 'motion/react';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Easygenerator Auth' }, { name: 'description', content: 'Easygenerator Auth' }];
}

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeMode = searchParams.get('mode') || 'signup';
	const [isExpanded, setIsExpanded] = useState(false);

	// Form data states
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const toggleMode = () => {
		const newMode = activeMode === 'login' ? 'signup' : 'login';
		setSearchParams({ mode: newMode });
		setIsExpanded(!isExpanded);
	};

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignupData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Login submitted:', loginData);
	};

	const handleSignupSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Signup submitted:', { ...signupData });
	};

	useEffect(() => {
		const mode = searchParams.get('mode');
		if (mode !== 'login' && mode !== 'signup') {
			setSearchParams({ mode: 'signup' });
		}
	}, [searchParams, setSearchParams]);

	return (
		<div className='min-h-screen h-screen w-full flex overflow-hidden bg-white font-sans'>
			{/* Company Section */}
			<div className='max-w-8xl w-full mx-auto p-[14px] flex justify-between'>
				<CompanySection isExpanded={isExpanded} />

				{/* Auth Form Section */}
				<AuthForm
					isExpanded={isExpanded}
					activeMode={activeMode}
					toggleMode={toggleMode}
					loginData={loginData}
					signupData={signupData}
					handleLoginChange={handleLoginChange}
					handleSignupChange={handleSignupChange}
					handleLoginSubmit={handleLoginSubmit}
					handleSignupSubmit={handleSignupSubmit}
				/>
			</div>
		</div>
	);
}
