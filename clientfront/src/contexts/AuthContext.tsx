import { createContext, useState } from "react";

interface IAuthContext {
	auth: string;
	setAuth: Function;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = (props: any) => {
	const [auth, setLocalAuth] = useState<string>('');
	const setAuth = (value: string) => {
		if (!value) {
			setLocalAuth(value);
			localStorage.removeItem('xauthorization');
			return;
		}
		setLocalAuth(value);
		localStorage.setItem('xauthorization', value);
	}
	return <AuthContext.Provider value={{ auth, setAuth }}>
		{props.children}
	</AuthContext.Provider>
}

export default AuthProvider;