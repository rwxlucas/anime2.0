import { Router } from "express";
import auth from '../controllers/auth';
import { verifyJwt } from '../middlewares/verifyJwt';
import multer from 'multer';

const route = Router();

route.post('/signin', auth.signIn); // @POST User Login
route.post('/signup', auth.signUp); // @POST Register user
route.get('/verify', verifyJwt, auth.verifyAuthorization) // @GET Verify and get user data

export default route;