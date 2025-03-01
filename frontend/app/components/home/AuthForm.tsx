import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { motion } from 'motion/react';

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
	return (
		<motion.div
			className='flex-1 flex items-center z-10'
			animate={{
				x: isExpanded ? 'calc(-1440px + 832px)' : 0,
				justifyContent: isExpanded ? 'flex-start' : 'flex-end',
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
		>
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
