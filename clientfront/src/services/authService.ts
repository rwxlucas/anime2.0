import { GET, POST } from "./service"
import { loginURL } from "../config";

export const login = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signin', { username, password });
}

export const register = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signup', { username, password });
}

export const verifyAuthorization = async (xauthorization: string) => {
	return GET(loginURL, 'auth/verify', { headers: { xauthorization } });
}