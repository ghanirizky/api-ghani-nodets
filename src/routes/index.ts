import { Router } from "express";
import Game3rbRouter from "./game3rb";
import UserRouter from "./user"
import CryptoRouter from "./crypto"
import ListRouter from "./list"

const router = Router();

router.use("/game3rb", Game3rbRouter);
router.use("/user", UserRouter)
router.use("/crypto", CryptoRouter)
router.use("/list", ListRouter)

export default router