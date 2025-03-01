import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
interface AuthFormProps {
	isExpanded: boolean;
	activeMode: string;
	toggleMode: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	loginData: {
		email: string;
		password: string;
	};
	signupData: {
		name: string;
		email: string;
		password: string;
	};
	handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSignupChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleLoginSubmit: (e: React.FormEvent) => void;
	handleSignupSubmit: (e: React.FormEvent) => void;
}

export const AuthForm = ({
	isExpanded,
	activeMode,
	toggleMode,
	loginData,
	signupData,
	handleLoginChange,
	handleSignupChange,
	handleLoginSubmit,
	handleSignupSubmit,
}: AuthFormProps) => {
	const [below1280, setBelow1280] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setBelow1280(window.innerWidth <= 1280);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<motion.div
			className='flex-1 flex flex-col xl:flex-row h-full items-center z-10 justify-center gap-y-16 xl:gap-y-0'
			animate={{
				x: isExpanded && !below1280 ? 'calc(-1440px + 832px)' : 0,
				...(!below1280 && { justifyContent: isExpanded ? 'flex-start' : 'flex-end' }),
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
		>
			{below1280 && (
				<div className='flex justify-center items-center'>
					<h1 className='text-cgray-900 text-xl font-semibold'>
						<span className='text-[#F0754D]'>easy</span>generator
					</h1>
				</div>
			)}

			<div className='w-full max-w-[630px]'>
				{activeMode === 'login' ? (
					<LoginForm
						formData={loginData}
						onChange={handleLoginChange}
						onSubmit={handleLoginSubmit}
						toggleMode={toggleMode}
					/>
				) : (
					<SignupForm
						formData={signupData}
						onChange={handleSignupChange}
						onSubmit={handleSignupSubmit}
						toggleMode={toggleMode}
					/>
				)}
			</div>
		</motion.div>
	);
};
