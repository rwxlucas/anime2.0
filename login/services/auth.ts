import { resType } from "../utils/types";
import { makeResponse, verifyEmail } from "../utils/utils";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import env from '../config/index';
import bcrypt from 'bcrypt';
import { deleteFile, getFile, uploadFile } from './aws';

interface IUpdateProfile {
	displayName: string;
	email: string;
	phone?: string;
	description: string;
}

const signIn = async (body: { username: string, password: string }): Promise<resType> => {
	try {
		const { username, password } = body;
		if (!username || !password) return makeResponse(400, { message: 'Missing login parameters' });
		const user = await User.findOne({ username });
		if (!user) return makeResponse(404, { message: 'Incorrect username' });
		const verifyPw = await bcrypt.compare(password, user.password);
		if (!verifyPw) return makeResponse(401, { message: 'Incorrect password' });
		return makeResponse(200, { message: 'Sucess', data: jwt.sign({ username }, env.authJWT) });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}

const signUp = async (body: { username: string, password: string }): Promise<resType> => {
	try {
		const { username, password } = body;
		if (!username || !password) return makeResponse(400, { message: 'Missing login parameters' });
		const user = await User.findOne({ username });
		if (user) return makeResponse(409, { message: 'User already exists' });
		const newUser = new User({ username, password: await bcrypt.hash(password, 12) });
		await newUser.save();
		return makeResponse(200, { message: 'User created' });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}

const verifyAuthorization = async (username: string): Promise<resType> => {
	try {
		const user = await User.findOne({ username }).select("-_id displayName phone description email image");
		if (user) {
			if (user.image) {
				const imageBuffer = await getFile(user.image.key);
				const imageType = user.image.key.split('.');
				delete user._doc.image;
				if (imageBuffer.Body) user._doc.image = `data:${imageType[imageType.length - 1]};base64, ${Buffer.from(imageBuffer.Body).toString('base64')}`;
			}
			return makeResponse(200, { data: user });
		}
		return makeResponse(404, { message: 'User not found' });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}

export default {
	signIn,
	signUp,
	verifyAuthorization
}