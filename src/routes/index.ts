import { Router } from "express";
import Game3rbRouter from "./game3rb";
import UserRouter from "./user"
import CryptoRouter from "./crypto"
import ListRouter from "./list"
import ValidationHeader from "../validation/header";



const router = Router();

// router.use("/game3rb",  ValidationHeader.verifyApiKey, ValidationHeader.verifyToken, Game3rbRouter);
router.use("/game3rb", Game3rbRouter);
router.use("/user", UserRouter)
router.use("/crypto", CryptoRouter)
router.use("/list", ListRouter)
// router.use("/list", ValidationHeader.verifyApiKey ,ValidationHeader.verifyToken, ListRouter)

export default router