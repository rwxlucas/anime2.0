import { Router } from "express";
import auth from '../controllers/auth'

const route = Router();

route.post('/signin', auth.signIn); // @POST User Login
route.post('/signup', auth.signUp); // @POST Register user

export default route;