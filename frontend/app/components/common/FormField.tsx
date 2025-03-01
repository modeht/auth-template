import { Eye } from 'lucide-react';
import { useState } from 'react';

interface FormFieldProps {
	id: string;
	name: string;
	type: 'text' | 'email' | 'password';
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
	autoComplete?: string;
	className?: string;
	containerClassName?: string;
	error?: string;
}

export const FormField = ({
	id,
	name,
	type,
	label,
	value,
	onChange,
	placeholder,
	required = true,
	autoComplete,
	className = '',
	containerClassName = 'mb-4',
	error,
}: FormFieldProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={containerClassName}>
			<label
				htmlFor={id}
				className='block text-cgray-400 text-sm font-medium mb-2'
			>
				{label}
			</label>

			<div
				className='relative flex items-center bg-cgray-50 rounded-md border border-gray-300'
				style={{
					borderColor: error ? 'var(--red-9)' : 'var(--cgray-300)',
				}}
			>
				<input
					type={showPassword ? 'text' : type}
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					className={`w-full px-4 py-4 text-cgray-700 rounded-md focus:outline-none bg-inherit focus:ring-2 focus:ring-cpurple-500 ${className}`}
					required={required}
					autoComplete={autoComplete}
					placeholder={placeholder}
				/>
				{type === 'password' && (
					<button
						type='button'
						className='text-cgray-400 px-4'
						title='Show password'
						onClick={() => setShowPassword(!showPassword)}
					>
						<Eye size={20} />
					</button>
				)}
			</div>

			{type === 'password' && (
				<p className='text-cgray-400 text-xs font-light mt-2'>
					Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter,
					one number, and one special character.
				</p>
			)}

			{error && <p className='text-red-500 text-xs font-light mt-2'>{error}</p>}
		</div>
	);
};
