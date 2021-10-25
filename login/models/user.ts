import { Schema, Document, model } from "mongoose";

interface IUserImage {
	key: string;
	location: string;
}
interface User extends Document {
	username: string;
	password: string;
	email?: string;
	image?: IUserImage;
}

const userSchema = new Schema<User>({
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
	}
});

const userModel = model<User>('user', userSchema);

export default userModel;