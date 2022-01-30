import { Router } from 'express';

import CryptoController  from '../controllers/crypto'
import ValidationHeader from '../validation/header';

const router = Router()

router.get('/list', CryptoController.getList);
router.get('/', ValidationHeader.verifyToken);

export default router;