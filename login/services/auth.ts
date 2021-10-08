import { resType } from "../utils/types";
import { makeResponse } from "../utils/utils";

export const signIn = (body: { username: string, password: string }): resType => {
	const { username, password } = body;
	if (!username || !password) return makeResponse(400, { message: 'Missing login parameters' });
	return makeResponse(400, { message: 'Login success!' });
}