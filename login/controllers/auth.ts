import { Request, Response } from 'express';
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
	const { body, file } = req;
	const controller = await auth.setImage(body, file!);
	return res.status(controller.status).json(controller.response);
}

export default {
	signIn,
	signUp,
	setImage
}