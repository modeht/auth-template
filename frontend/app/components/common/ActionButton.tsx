import React from 'react';

interface ActionButtonProps {
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type = 'submit', onClick, children, className = '' }) => {
	const baseClassName =
		'w-full bg-cpurple-600 text-white py-4 px-8 rounded-md text-lg font-medium hover:bg-cpurple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpurple-500';

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${baseClassName} ${className}`}
		>
			{children}
		</button>
	);
};
