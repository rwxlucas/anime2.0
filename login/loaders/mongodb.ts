import { connect } from 'mongoose';
import env from '../config/index'

const openConnection = (): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		return connect(env.databaseUrl, (err) => {
			if (err) return reject(err);
			return resolve(true);
		})
	})
}

export default openConnection;