import { resType } from "../utils/types";
import { makeResponse } from "../utils/utils";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import env from '../config/index';
import bcrypt from 'bcrypt';

const signIn = async (body: { username: string, password: string }): Promise<resType> => {
	const { username, password } = body;
	if (!username || !password) return makeResponse(400, { message: 'Missing login parameters' });
	const user = await User.findOne({ username });
	if (!user) return makeResponse(404, { message: 'Incorrect username' });
	const verifyPw = await bcrypt.compare(password, user.password);
	if (!verifyPw) return makeResponse(401, { message: 'Incorrect password' });
	return makeResponse(200, { message: 'Sucess', data: jwt.sign({ username }, env.authJWT) });
}

const signUp = async (body: { username: string, password: string }): Promise<resType> => {
	const { username, password } = body;
	if (!username || !password) return makeResponse(400, { message: 'Missing login parameters' });
	const user = await User.findOne({ username });
	if (user) return makeResponse(409, { message: 'User already exists' });
	const newUser = new User({ username, password: await bcrypt.hash(password, 12) });
	await newUser.save().catch(err => {
		if (err) return makeResponse(500, { message: 'Error while creating user' });
	});
	return makeResponse(200, { message: 'User created' });
}

export default {
	signIn,
	signUp
}