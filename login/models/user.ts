import { Schema, Document, model } from "mongoose";

interface IUserImage {
	key: string;
	location: string;
}
interface IUser extends Document {
	_doc?: any;
	username: string;
	password: string;
	email?: string;
	image?: IUserImage;
	description?: string;
	phone?: string;
	displayName?: string;
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		maxlength: 254
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	image: {
		type: {
			key: String,
			location: String
		},
		required: false,
		_id: false
	},
	description: {
		type: String,
		required: false
	},
	displayName: {
		type: String,
		required: false
	},
	phone: {
		type: String,
		required: false
	}
});

const userModel = model<IUser>('user', userSchema);

export default userModel;