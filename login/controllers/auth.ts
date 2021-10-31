import { Request, Response } from 'express';
import { IHeaders } from '../middlewares/verifyJwt';
import auth from '../services/auth';

const signIn = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await auth.signIn(body);
	return res.status(controller.status).json(controller.response);
}

const signUp = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await auth.signUp(body);
	return res.status(controller.status).json(controller.response);
}

const setImage = async (req: Request, res: Response) => {
	const { file } = req;
	const controller = await auth.setImage((<IHeaders>req.headers).username!, file!);
	return res.status(controller.status).json(controller.response);
}

const deleteImage = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await auth.deleteImage(body);
	return res.status(controller.status).json(controller.response);
}

const updateProfile = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await auth.updateUserProfile(body, (<IHeaders>req.headers).username!);
	return res.status(controller.status).json(controller.response);
}

const verifyAuthorization = async (req: Request, res: Response) => {
	const controller = await auth.verifyAuthorization((<IHeaders>req.headers).username!);
	return res.status(controller.status).json(controller.response);
}

export default {
	signIn,
	signUp,
	setImage,
	deleteImage,
	updateProfile,
	verifyAuthorization
}