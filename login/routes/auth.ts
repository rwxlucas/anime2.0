import { Router } from "express";
import auth from '../controllers/auth'

const route = Router();

route.post('/signin', auth.signIn);
route.post('/signup', auth.signUp);

export default route;