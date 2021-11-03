import { makeResponse, verifyEmail } from "../utils/utils";
import User from '../models/user';
import { resType } from "../utils/types";
import { deleteFile, uploadFile } from "./aws";

interface IUpdateProfile {
	displayName: string;
	email: string;
	phone?: string;
	description: string;
}

const deleteImage = async (body: { username: string }): Promise<resType> => {
	try {
		const { username } = body;
		if (!username) return makeResponse(400, { message: 'Missing username' });
		const user = await User.findOne({ username });
		if (!user) return makeResponse(404, { message: 'User not found' });
		if (!user.image) return makeResponse(400, { message: 'User doesn\'t have a profile image' });
		await deleteFile(user.image.key);
		await user.updateOne({ $unset: { image: 1 } });
		return makeResponse(200, { message: 'Profile image deleted successfully' });
	} catch (error: any) {
		return makeResponse(500, { message: error })
	}
}

const addEmail = async (body: { username: string, email: string }): Promise<resType> => {
	try {
		const { username, email } = body;
		if (!username || !email) return makeResponse(400, { message: 'Missing parameters' });
		const user = await User.findOne({ username });
		if (!user) return makeResponse(404, { message: 'User not found' });
		if (user.email) return makeResponse(409, { message: 'User already have an email' });
		user.email = email;
		await user.save();
		return makeResponse(200, { message: 'Email added successfully' });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}


const updateUserProfile = async (body: IUpdateProfile, username: string): Promise<resType> => {
	try {
		const { description, displayName, email, phone } = body;
		const user = await User.findOne({ username });
		if (!user) return makeResponse(404, { message: 'User not found' });
		if (!description || !displayName || !email) return makeResponse(400, { message: 'Missing parameters' });
		if (!verifyEmail(email)) return makeResponse(400, { message: 'Incorrect email format' });
		if (phone) user._doc.phone = phone;
		await user.updateOne({
			...user._doc,
			description,
			displayName,
			email
		});
		return makeResponse(200, { message: 'Success', data: { description, displayName, email, phone } });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}


const setImage = async (username: string, file: any): Promise<resType> => {
	try {
		if (!username) return makeResponse(400, { message: 'Missing username' });
		const user = await User.findOne({ username });
		if (!user) return makeResponse(404, { message: 'User not found' });
		if (!file) return makeResponse(404, { message: 'Missing image' });
		const userImage = await uploadFile(file, 'profileImage', `${user.username}-profileImage`);
		user.image = {
			location: userImage.Location,
			key: userImage.Key
		};
		await user.save();
		const base64Image = file.buffer.toString('base64');
		return makeResponse(200, { message: 'Success', data: `data:${file.mimetype};base64, ${base64Image}` });
	} catch (error: any) {
		return makeResponse(500, { message: error });
	}
}

export default {
	deleteImage,
	addEmail,
	updateUserProfile,
	setImage
}