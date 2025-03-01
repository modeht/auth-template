import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { motion } from 'motion/react';

interface AuthFormProps {
	isExpanded: boolean;
	activeMode: string;
	toggleMode: () => void;
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
		<div className='w-full max-w-md'>
			<div className='flex justify-center mb-6'>
				<div className='bg-gray-100 p-1 rounded-lg inline-flex'>
					<button
						className={`px-4 py-2 rounded-md ${
							activeMode === 'login' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
						}`}
						onClick={activeMode === 'signup' ? toggleMode : undefined}
					>
						Login
					</button>
					<button
						className={`px-4 py-2 rounded-md ${
							activeMode === 'signup' ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
						}`}
						onClick={activeMode === 'login' ? toggleMode : undefined}
					>
						Sign Up
					</button>
				</div>
			</div>

			{activeMode === 'login' ? (
				<LoginForm
					formData={loginData}
					onChange={handleLoginChange}
					onSubmit={handleLoginSubmit}
				/>
			) : (
				<SignupForm
					formData={signupData}
					onChange={handleSignupChange}
					onSubmit={handleSignupSubmit}
				/>
			)}
		</div>
	);
};
