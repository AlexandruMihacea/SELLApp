import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import {router} from './Routes/index.js';
import {authenticateJWT} from "./Middleware/authJwt.js";


const app = express();
const port = 3000;

const corsOptions = {
    origin: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Headers"
    ],
    credentials: true,
    enablePreflight: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});