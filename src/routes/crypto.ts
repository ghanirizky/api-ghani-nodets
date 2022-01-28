import { Router } from 'express';

import CryptoController  from '../controllers/crypto'

const router = Router()

router.get('/list', CryptoController.getList);

export default router;