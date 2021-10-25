import S3 from 'aws-sdk/clients/s3';
import env from '../config/index';

interface IConfig {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

const fileType: any = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

const config: IConfig = {
  bucket: env.awsBucket,
  region: env.awsS3Region,
  accessKeyId: env.awsAccessKeyId,
  secretAccessKey: env.awsSecretAccessKey
};

const S3Client = new S3(config);

export const uploadFile = async (file: any, name: string): Promise<any> => {
  return await S3Client.upload({
    Bucket: config.bucket,
    Body: file.buffer,
    Key: `${name}.${fileType[file.mimetype]}`
  }).promise();
}

export const deleteFile = async (key: string): Promise<any> => {
  return await S3Client.deleteObject({
    Bucket: config.bucket,
    Key: key
  }).promise();
}