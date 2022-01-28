import { Router } from 'express';

import ListController from '../controllers/list'

const router = Router()

router.get('/', ListController.getList);
router.get('/:id', ListController.getListById);
router.post('/post', ListController.create);
router.put('/update', ListController.update);
router.delete('/:id', ListController.deleteById);
router.put('/:id', ListController.resolvedData);

export default router;