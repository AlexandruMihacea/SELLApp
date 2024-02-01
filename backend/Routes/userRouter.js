import express from "express";
import { controller } from "../Controllers/userController.js";
import multer from "multer";
const userRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()});

userRouter.get('/getAllUsers', controller.getAllUsers);
userRouter.get('/getUser', controller.getUser);
userRouter.post("/createUser",upload.single("filename"), controller.addUser);

export {userRouter};