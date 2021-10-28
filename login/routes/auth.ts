import { Router } from "express";
import auth from '../controllers/auth';
import { verifyJwt } from '../middlewares/verifyJwt';
import multer from 'multer';

const route = Router();

route.post('/signin', auth.signIn); // @POST User Login
route.post('/signup', auth.signUp); // @POST Register user
route.post('/setimage', verifyJwt, multer().single('image'), auth.setImage); // @POST Manage user image
route.delete('/deleteimage', verifyJwt, auth.deleteImage); // @DELETE Delete user image
route.put('/profile', verifyJwt, auth.updateProfile) // @POST Update user profile info's

export default route;