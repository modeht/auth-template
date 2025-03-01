import { useState } from 'react';

interface SignupFormProps {
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formData: {
		name: string;
		email: string;
		password: string;
	};
	toggleMode: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SignupForm = ({ onSubmit, onChange, formData, toggleMode }: SignupFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			<h1 className='text-2xl md:text-3xl font-medium text-start mb-6 text-cgray-900'>
				Create your account with us below
			</h1>
			<div className='mb-4'>
				<label
					htmlFor='name'
					className='block text-cgray-400 text-sm font-medium mb-2'
				>
					Full Name
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={onChange}
					className='w-full px-4 py-4 bg-cgray-50 text-cgray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
					autoComplete='new-name'
					placeholder='Enter your full name'
				/>
			</div>
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
					placeholder='Enter your email'
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
					placeholder='Enter your password'
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
					Sign Up
				</button>
			</div>

			<div className='mt-6 text-center'>
				<p className='text-gray-600'>
					Already have an account?{' '}
					<a
						href='/login'
						className='text-cpurple-600 hover:text-cpurple-800 font-medium'
						onClick={toggleMode}
					>
						Login instead
					</a>
				</p>
			</div>
		</form>
	);
};
