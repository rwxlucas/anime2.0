import { Request, Response } from 'express';
import { signIn } from '../services/auth';

const signin = (req: Request, res: Response) => {
	const { body } = req;
	const response = signIn(body);
	return res.status(response.status).json(response.data);
}

export default {
	signin
}