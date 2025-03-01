import { useState } from 'react';

interface SignupFormProps {
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formData: {
		name: string;
		email: string;
		password: string;
	};
}

export const SignupForm = ({ onSubmit, onChange, formData }: SignupFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			<div className='mb-4'>
				<label
					htmlFor='name'
					className='block text-gray-700 text-sm font-medium mb-2'
				>
					Full Name
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={onChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='email'
					className='block text-gray-700 text-sm font-medium mb-2'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={onChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='password'
					className='block text-gray-700 text-sm font-medium mb-2'
				>
					Password
				</label>
				<input
					type='password'
					id='password'
					name='password'
					value={formData.password}
					onChange={onChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500'
					required
				/>
			</div>
			<div>
				<button
					type='submit'
					className='w-full bg-cpurple-600 text-white py-2 px-4 rounded-md hover:bg-cpurple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpurple-500'
				>
					Sign Up
				</button>
			</div>
		</form>
	);
};
