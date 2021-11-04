import { Application } from "express";
import express from "./express";
import mongodb from './mongodb';

interface ILoaders {
	expressApp: Application
}
export default ({ expressApp }: ILoaders): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log('Initializing loaders...');
			await express({ app: expressApp });
			console.log('***Express loaded');
			await mongodb();
			console.log('***MongoDB loaded');
			return resolve(true);
		} catch (err) {
			if (err) {
				console.log(err);
				return reject(err)
			};
		}
	})
}