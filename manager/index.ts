import express from 'express';
import env from './config/index';
import loaders from './loaders/index';

const startServer = async () => {
	console.log(`Manager initialized`);
	const app = express();
	await loaders({ expressApp: app });
	app.listen(env.serverPort, () => console.log(`Server started on port ${env.serverPort}`));
}

startServer();