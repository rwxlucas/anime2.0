import { resType } from "./types"

export const makeResponse = (status: number, response?: { message?: string, data?: any }): resType => {
	return {
		status,
		response
	}
}