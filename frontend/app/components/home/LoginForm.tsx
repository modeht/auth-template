import { useState } from 'react';

interface LoginFormProps {
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formData: {
		email: string;
		password: string;
	};
	toggleMode: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LoginForm = ({ onSubmit, onChange, formData, toggleMode }: LoginFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			<h1 className='text-2xl md:text-3xl font-medium text-start mb-6 text-cgray-900'>Login to your account</h1>
			<div className='mb-4'>
				<label
					htmlFor='email'
					className='block text-cgray-400 text-sm font-medium mb-2'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={onChange}
					className='w-full px-4 py-4 bg-cgray-50 text-cgray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
					autoComplete='new-email'
				/>
			</div>
			<div className='mb-6'>
				<label
					htmlFor='password'
					className='block text-cgray-400 text-sm font-medium mb-2'
				>
					Password
				</label>
				<input
					type='password'
					id='password'
					name='password'
					value={formData.password}
					onChange={onChange}
					className='w-full px-4 py-4 bg-cgray-50 text-cgray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
					autoComplete='new-password'
				/>
			</div>
			<div>
				<button
					type='submit'
					className='w-full bg-cpurple-600 text-white py-4 px-8 rounded-md text-lg font-medium hover:bg-cpurple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpurple-500'
				>
					Login
				</button>
			</div>
			<div className='mt-6 text-center'>
				<p className='text-cgray-400'>
					Don't have an account?{' '}
					<a
						href='/signup'
						className='text-cpurple-600 hover:text-cpurple-800 font-medium'
						onClick={toggleMode}
					>
						Sign up instead
					</a>
				</p>
			</div>
		</form>
	);
};
