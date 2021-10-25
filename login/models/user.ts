import { Schema, Document, model } from "mongoose";

interface User extends Document {
	username: string;
	password: string;
	email?: string;
	image?: string;
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
	}
})

const userModel = model<User>('user', userSchema);

export default userModel;