import { config } from 'dotenv';
config();

interface IKeys {
	serverPort: string;
	databaseUrl: string;
	authJWT: string;
	awsBucket: string;
	awsS3Region: string;
	awsAccessKeyId: string;
	awsSecretAccessKey: string;
}
const keys: IKeys = {
	serverPort: process.env.SERVER_PORT!,
	databaseUrl: process.env.DATABASE_URL!,
	authJWT: process.env.AUTH_JWT!,
	awsBucket: process.env.AWS_BUCKET!,
	awsS3Region: process.env.AWS_S3_REGION!,
	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
}

export default keys;