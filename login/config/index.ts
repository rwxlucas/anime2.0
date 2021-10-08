import { config } from 'dotenv';
config();

export default {
	serverPort: process.env.SERVER_PORT as string,
	databaseUrl: process.env.DATABASE_URL as string,
	signUpJwt: process.env.SIGN_UP_JWT as string
}