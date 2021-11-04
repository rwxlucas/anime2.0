import { Application, json } from "express";
import cors from 'cors';
import routes from '../routes/routes';

export default ({ app }: { app: Application }): Promise<any> => {
	return new Promise((resolve, reject) => {
		try {
			app.use(cors());
			app.use(json());

			app.use(routes);

			return resolve(true);
		} catch (err) {
			if (err) {
				console.log(err);
				return reject(err);
			}
		}
	})
}