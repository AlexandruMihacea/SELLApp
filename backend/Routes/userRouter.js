import express from "express";
import { controller } from "../Controllers/userController.js";
import multer from "multer";
const userRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()});

userRouter.get('/getAllUsers', controller.getAllUsers);
userRouter.post('/getUser', controller.getUser);
userRouter.post("/createUser",upload.single("filename"), controller.addUser);
userRouter.put("/update-user",upload.single("filename"),controller.updateUser);
userRouter.delete("/delete-user", controller.deleteUser);

export {userRouter};