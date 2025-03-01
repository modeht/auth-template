import { FormField } from '../common/FormField';
import { ActionButton } from '../common/ActionButton';
import { Eye } from 'lucide-react';

interface LoginFormProps {
	onSubmit: (e: React.FormEvent) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formData: {
		email: string;
		password: string;
	};
	toggleMode: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	errors: {
		email?: string;
		password?: string;
	};
}

export const LoginForm = ({ onSubmit, onChange, formData, toggleMode, errors }: LoginFormProps) => {
	return (
		<form
			onSubmit={onSubmit}
			className='w-full'
		>
			<h1 className='text-2xl md:text-3xl font-medium text-start mb-6 text-cgray-900'>Login to your account</h1>

			<FormField
				id='email'
				name='email'
				type='email'
				label='Email'
				value={formData.email}
				onChange={onChange}
				autoComplete='new-email'
				error={errors?.email}
			/>

			<FormField
				id='password'
				name='password'
				type='password'
				label='Password'
				value={formData.password}
				onChange={onChange}
				autoComplete='new-password'
				containerClassName='mb-6'
				error={errors?.password}
			/>

			<div>
				<ActionButton type='submit'>Login</ActionButton>
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
