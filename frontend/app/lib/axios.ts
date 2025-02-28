import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/types';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		Authorization:
			typeof document !== 'undefined'
				? `Bearer ${
						document.cookie
							.split('; ')
							.find((row) => row.startsWith('auth_t='))
							?.split('=')[1]
				  }`
				: '',
	},
});

export const apiErrorHandler = (error: unknown, t: Record<string, string> = {}) => {
	console.log('error', (error as AxiosError)?.response?.data || (error as AxiosError)?.response || error);
	const data = (error as AxiosError)?.response?.data as ApiErrorResponse;
	const translated = t[data?.message] || t.UNKNOWN_ERROR || data?.message;
	return translated;
};

export const setAuthToken = (token: string) => {
	document.cookie = `auth_t=${token}; expires=${new Date(
		Date.now() + 1000 * 60 * 60 * 24 * 90
	).toUTCString()}; path=/;`;
	api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = () => {
	document.cookie = 'auth_t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	api.defaults.headers.Authorization = '';
};

export const getAuthToken = (cookies: string[]) => {
	return cookies.find((row) => row.startsWith('auth_t='))?.split('=')[1];
};

export const getCookies = (request?: Request) => {
	if (request) {
		return (
			request.headers
				.get('cookie')
				?.split(';')
				.map((c) => c.trim()) || []
		);
	}

	return typeof document !== 'undefined' ? document.cookie.split(';') : [];
};
