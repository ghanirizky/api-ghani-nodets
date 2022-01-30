import { Router } from 'express';

import UserController from '../controllers/user'

const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/verify/:token', UserController.verify);


export default router;