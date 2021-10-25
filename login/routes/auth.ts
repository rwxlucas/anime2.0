import { Router } from "express";
import auth from '../controllers/auth';
import multer from 'multer';

const route = Router();

route.post('/signin', auth.signIn); // @POST User Login
route.post('/signup', auth.signUp); // @POST Register user
route.post('/setimage', multer().single('image'), auth.setImage); // @POST Manage user image

export default route;