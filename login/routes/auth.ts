import { Router } from "express";
import auth from '../controllers/auth'

const route = Router();

route.post('/signin', auth.signin);

export default route;