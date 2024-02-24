import express from "express";
import { controller } from "../Controllers/produseController.js";
const produsRouterPublic = express.Router();

produsRouterPublic.get('/getAllProduse', controller.getAllProducts);

export {produsRouterPublic}