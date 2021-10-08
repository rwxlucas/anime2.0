import { Request, Response } from 'express';

const signin = (req: Request, res: Response) => {
	const { body } = req;
	console.log(body);
	return res.send();
}

export default {
	signin
}