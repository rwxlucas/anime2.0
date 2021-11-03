import { Router } from "express";
import user from '../controllers/user';
import { verifyJwt } from '../middlewares/verifyJwt';
import multer from 'multer';

const route = Router();

route.post('/setimage', verifyJwt, multer().single('image'), user.setImage); // @POST Manage user image
route.delete('/deleteimage', verifyJwt, user.deleteImage); // @DELETE Delete user image
route.put('/profile', verifyJwt, user.updateProfile) // @POST Update user profile info's

export default route;