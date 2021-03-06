import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const makeUrl = (url: string, path: string) => {
	return `${url}/${path}`;
}

export const GET = async (url: string, path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
	return await axios.get(makeUrl(url, path), config);
}

export const POST = async (url: string, path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
	return await axios.post(makeUrl(url, path), data, config);
}

export const PUT = async (url: string, path: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
	return await axios.put(makeUrl(url, path), data, config);
}

export const DELETE = async (url: string, path: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
	return await axios.delete(makeUrl(url, path), config);
}