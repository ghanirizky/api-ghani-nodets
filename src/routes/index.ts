import { Router } from "express";
import Game3rbRouter from "./game3rb";
import UserRouter from "./user"

const router = Router();

router.use("/game3rb", Game3rbRouter);
router.use("/user", UserRouter)

export default router