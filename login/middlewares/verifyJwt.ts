import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/index';

interface IJwtPayload extends JwtPayload {
	username?: string;
}

export interface IHeaders extends IncomingHttpHeaders {
	xauthorization: string;
	username?: string;
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
	try {
		const xauthorization: string = (<IHeaders>req.headers).xauthorization;
		if (!xauthorization) return res.status(400).json({ message: 'Token not provided' });
		const decoded = (<IJwtPayload>jwt.verify(xauthorization, env.authJWT));
		req.headers.username = decoded.username;
		next();
	} catch (err: any) {
		if (err.message == 'invalid signature') return res.status(403).json({ message: 'Not allowed' });
		return res.status(500).json({ message: err.message });
	}
}