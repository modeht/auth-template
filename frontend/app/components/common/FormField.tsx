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
}: FormFieldProps) => {
	return (
		<div className={containerClassName}>
			<label
				htmlFor={id}
				className='block text-cgray-400 text-sm font-medium mb-2'
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				className={`w-full px-4 py-4 bg-cgray-50 text-cgray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpurple-500 ${className}`}
				required={required}
				autoComplete={autoComplete}
				placeholder={placeholder}
			/>
		</div>
	);
};
