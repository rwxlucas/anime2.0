import { Router } from "express";
import auth from './auth';
import user from './user';

const route = Router();

route.use('/auth', auth);
route.use('/user', user);

export default route;