import { useCallback } from 'react';

export const useAuthValidations = () => {
	const validateEmail = useCallback((email: string) => {
		if (!email) {
			return 'Email is required';
		} else if (!email.includes('@')) {
			return 'Invalid email address';
		}
	}, []);

	const validatePassword = useCallback((password: string) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!password) {
			return 'Password is required';
		} else if (!passwordRegex.test(password)) {
			return 'Make sure your password meets the requirements';
		}
	}, []);

	const validateName = useCallback((name: string) => {
		if (!name) {
			return 'Name is required';
		} else if (name.length < 3) {
			return 'Name must be at least 3 characters long';
		}
	}, []);

	return { validateEmail, validatePassword, validateName };
};
