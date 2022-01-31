import { Router } from "express";

import Game3rbController from "../controllers/game3rb";

const router = Router();

router.get("/get", Game3rbController.getFeed);

export default router;
