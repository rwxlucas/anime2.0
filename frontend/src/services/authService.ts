import { POST } from "./service"
import { loginURL } from "../config";

export const login = async (username: string, password: string) => {
	return POST(loginURL, 'auth/signin', { username, password });
}