import express from "express";
import { controller } from "../Controllers/produseController.js";
import multer from "multer";
import {authenticateJWT} from "../Middleware/authJwt.js";

const produsRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()});

// produsRouter.use(authenticateJWT);

// produsRouter.get('/getAllProduse', controller.getAllProducts);
produsRouter.get('/getProduct', controller.getProduct);
produsRouter.post('/getProductsByUser', controller.getProductsByUser);
produsRouter.post("/createProduct",upload.single("filename"), controller.addProduct);
produsRouter.put("/update-product",upload.single("filename"),controller.updateProduct);
produsRouter.delete("/delete-product", controller.deleteProduct);

export {produsRouter}