import express from "express";
import { json } from "express";
import logger from "./utils/logger.js";
import todoRouter from "./controllers/todos.js";
import config from "./utils/config.js";
import mongoose from "mongoose";

const app = express()

try {
    await mongoose.connect(config.mongoDBUri);
    logger.info('connected to MongoDB');
}
catch(error){
    logger.error('Error connecting to MongoDB', error.message);
}

app.use(json());
app.use('/api/todos',todoRouter)



export default app;