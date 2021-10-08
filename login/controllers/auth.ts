import { Request, Response } from 'express';
import { signIn } from '../services/auth';

const signin = (req: Request, res: Response) => {
	const { body } = req;
	const controller = signIn(body);
	return res.status(controller.status).json(controller.response);
}

export default {
	signin
}