import express from "express";
import { userRouter } from "./userRouter.js";
import { produsRouter } from "./produsRouter.js";
const router = express.Router();

router.use('/', userRouter);
router.use('/',produsRouter);

export {router}