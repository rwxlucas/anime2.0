import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
	const xauthorization: string = (<any>req.headers).xauthorization as string;
	if (!xauthorization) return res.status(403).json({ message: 'Token not provided' });
	
	next();
}