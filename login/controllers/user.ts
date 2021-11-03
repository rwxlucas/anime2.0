import { Request, Response } from 'express';
import { IHeaders } from '../middlewares/verifyJwt';
import user from "../services/user";

const setImage = async (req: Request, res: Response) => {
	const { file }: any = req;
	const controller = await user.setImage((<IHeaders>req.headers).username!, file!);
	return res.status(controller.status).json(controller.response);
}

const deleteImage = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await user.deleteImage(body);
	return res.status(controller.status).json(controller.response);
}

const updateProfile = async (req: Request, res: Response) => {
	const { body } = req;
	const controller = await user.updateUserProfile(body, (<IHeaders>req.headers).username!);
	return res.status(controller.status).json(controller.response);
}

export default {
	setImage,
	deleteImage,
	updateProfile
}