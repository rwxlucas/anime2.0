import { resType } from "../utils/types";
import { makeResponse } from "../utils/utils";
import jwt from 'jsonwebtoken';
import User from '../models/user';
import env from '../config/index';
import bcrypt from 'bcrypt';
import { deleteFile, uploadFile } from './aws';

interface IUpdateProfile {
	displayName?: string;
	email?: string;
	phone?: string;
	description?: string;
}

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
	await newUser.save().catch(err => (makeResponse(500, { message: err })));
	return makeResponse(200, { message: 'User created' });
}

const setImage = async (body: { username: string }, file: Express.Multer.File): Promise<resType> => {
	const { username } = body;
	if (!username) return makeResponse(400, { message: 'Missing username' });
	const user = await User.findOne({ username });
	if (!user) return makeResponse(404, { message: 'User not found' });
	if (!file) return makeResponse(404, { message: 'Missing image' });
	const userImage = await uploadFile(file, 'profileImage', `${user.username}-profileImage`).catch(err => (makeResponse(500, { message: err })));
	user.image = {
		location: userImage.Location,
		key: userImage.Key
	};
	await user.save().catch(err => (makeResponse(500, { message: err })));
	return makeResponse(200, { message: 'Success' });
}

const deleteImage = async (body: { username: string }): Promise<resType> => {
	const { username } = body;
	if (!username) return makeResponse(400, { message: 'Missing username' });
	const user = await User.findOne({ username });
	if (!user) return makeResponse(404, { message: 'User not found' });
	if (!user.image) return makeResponse(400, { message: 'User doesn\'t have a profile image' });
	await deleteFile(user.image.key).catch(err => (makeResponse(500, { message: err })));
	await user.updateOne({ $unset: { image: 1 } }).catch(err => (makeResponse(500, { message: err })));;
	return makeResponse(200, { message: 'Profile image deleted successfully' });
}

const addEmail = async (body: { username: string, email: string }): Promise<resType> => {
	const { username, email } = body;
	if (!username) return makeResponse(400, { message: 'Missing username' });
	if (!email) return makeResponse(400, { message: 'Missing email' });
	const user = await User.findOne({ username });
	if (!user) return makeResponse(404, { message: 'User not found' });
	if (user.email) return makeResponse(400, { message: 'User already have an email' });
	user.email = email;
	await user.save().catch(err => (makeResponse(500, { message: err })));
	return makeResponse(200, { message: 'Email added successfully' });
}


const updateUserProfile = async (body: IUpdateProfile, username: string): Promise<resType> => {
	const { description, displayName, email, phone } = body;
	const user = await User.findOne({ username });
	return makeResponse(200, { message: 'Sucess' });
}

export default {
	signIn,
	signUp,
	setImage,
	deleteImage,
	addEmail,
	updateUserProfile
}