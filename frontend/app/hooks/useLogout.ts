import { useNavigate } from 'react-router';
import { removeAuthToken } from '../lib/axios';
import { useAuth } from '../contexts/authContext';
import { useLang } from './useLang';

export function useLogout() {
	const { lang } = useLang();
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	const logout = () => {
		removeAuthToken();
		setAuth(undefined);
		navigate(`/${lang}`, { replace: true });
	};

	return { logout };
}
