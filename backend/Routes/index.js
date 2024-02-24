import express from "express";
import { userRouter } from "./userRouter.js";
import { produsRouter } from "./produsRouter.js";
import { produsRouterPublic } from "./rutePublice.js";
const router = express.Router();

router.use('/', userRouter);
router.use('/',produsRouter);
router.use('/', produsRouterPublic);

export {router}