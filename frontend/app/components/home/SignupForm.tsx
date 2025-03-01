import { ActionButton } from '../common/ActionButton';
import { FormField } from '../common/FormField';
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

			<FormField
				id='name'
				name='name'
				type='text'
				label='Full Name'
				value={formData.name}
				onChange={onChange}
				autoComplete='new-name'
				placeholder='Enter your full name'
			/>

			<FormField
				id='email'
				name='email'
				type='email'
				label='Email'
				value={formData.email}
				onChange={onChange}
				autoComplete='new-email'
				placeholder='Enter your email'
			/>

			<FormField
				id='password'
				name='password'
				type='password'
				label='Password'
				value={formData.password}
				onChange={onChange}
				autoComplete='new-password'
				placeholder='Enter your password'
				containerClassName='mb-6'
			/>
			<div>
				<ActionButton type='submit'>Sign Up</ActionButton>
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
