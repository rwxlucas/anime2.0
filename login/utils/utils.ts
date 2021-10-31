import { resType } from "./types"

export const makeResponse = (status: number, response?: { message?: string, data?: any }): resType => {
	return {
		status,
		response
	}
}

export const verifyEmail = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}