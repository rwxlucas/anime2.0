import { POST, PUT } from "./service"
import { loginURL } from "../config";

interface IUserInfo {
	description: string;
	displayName: string;
	email: string;
	phone: string
}

export const updateAccountInfo = async (userInfo: IUserInfo, xauthorization: string) => {
	return PUT(loginURL, 'user/profile', userInfo, { headers: { xauthorization } });
}

export const setImage = async (userImage: FormData, xauthorization: string) => {
	return POST(loginURL, 'user/setimage', userImage, { headers: { xauthorization } });
}