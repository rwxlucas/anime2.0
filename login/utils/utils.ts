import { resType } from "./types"

export const makeResponse = (status: number, data?: any): resType => {
	return {
		status,
		data
	}
}