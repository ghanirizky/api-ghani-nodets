import { Router } from 'express';

import Game3rbController from '../controllers/game3rb'

const router = Router()

router.get('/feed', Game3rbController.getFeed);
router.get('/settings', Game3rbController.getLatestFeed);

export default router;