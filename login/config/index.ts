import { config } from 'dotenv';
config();

export default {
	serverPort: process.env.SERVER_PORT as string,
	databaseUrl: process.env.DATABASE_URL as string,
	authJWT: process.env.AUTH_JWT as string
}