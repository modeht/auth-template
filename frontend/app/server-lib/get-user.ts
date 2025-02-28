import axios from 'axios';
import type { AuthContext } from '../contexts/authContext';
import { apiErrorHandler } from '../lib/axios';

export async function getUser(auth: string) {
	try {
		const r = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
			headers: {
				Authorization: `Bearer ${auth}`,
			},
		});
		return r.data as AuthContext;
	} catch (error) {
		console.error('error getting user');
		apiErrorHandler(error);
		return undefined;
	}
}
