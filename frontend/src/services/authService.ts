import { GET, POST, PUT } from "./service"
import { loginURL } from "../config";

interface IUserInfo {
	description: string;
	displayName: string;
	email: string;
	phone: string
}

export const login = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signin', { username, password });
}

export const register = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signup', { username, password });
}

export const verifyAuthorization = async (xauthorization: string) => {
	return GET(loginURL, 'auth/verify', { headers: { xauthorization } });
}

export const updateAccountInfo = async (userInfo: IUserInfo, xauthorization: string) => {
	return PUT(loginURL, 'auth/profile', userInfo, { headers: { xauthorization } });
}

export const setImage = async (userImage: FormData, xauthorization: string) => {
	return POST(loginURL, 'auth/setimage', userImage, { headers: { xauthorization } });
}