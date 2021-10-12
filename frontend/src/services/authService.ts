import { POST } from "./service"
import { loginURL } from "../config";

export const login = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signin', { username, password });
}

export const register = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signup', { username, password });
}