import { resType } from "../utils/types";
import { makeResponse } from "../utils/utils";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import env from '../config/index';
import bcrypt from 'bcrypt';
import { uploadFile } from './aws';

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

const setImage = async (body: { username: string }, file: Express.Multer.File): Promise<resType> => {
	const { username } = body;
	if (!username) return makeResponse(400, { message: 'Missing username' });
	const user = await User.findOne({ username });
	if (!user) return makeResponse(404, { message: 'User not found' });
	if (!file) return makeResponse(404, { message: 'Missing image' });
	const userImage = await uploadFile(file, `${user.username}-profileImage`).catch(err => {
		if (err) return makeResponse(500, { message: err });
	});
	user.image = userImage.Location;
	await user.save().catch(err => {
		if (err) return makeResponse(500, { message: err });
	});
	return makeResponse(200, { message: 'Success' });
}

export default {
	signIn,
	signUp,
	setImage
}