import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react';

export type AuthState = {
	auth: AuthContext | undefined;
	setAuth: Dispatch<SetStateAction<AuthContext | undefined>>;
};
export interface AuthContext {
	id: number;
	name: string;
	email: string;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);
export const defaultAuthState: AuthContext | undefined = undefined;

export const AuthProvider = ({
	initialAuth = defaultAuthState,
	children,
}: {
	initialAuth?: AuthContext;
	children: React.ReactNode;
}) => {
	const [auth, setAuth] = useState<AuthContext | undefined>(initialAuth);
	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
