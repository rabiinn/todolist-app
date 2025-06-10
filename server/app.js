import express from "express";
import { json } from "express";
import logger from "./utils/logger.js";
import todoRouter from "./controllers/todos.js";
import config from "./utils/config.js";
import mongoose from "mongoose";
import middleware from "./utils/middleware.js";
import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import cors from 'cors';
const app = express()

try {
    await mongoose.connect(config.mongoDBUri);
    logger.info('connected to MongoDB');
}
catch(error){
    logger.error('Error connecting to MongoDB', error.message);
}

app.use(json());
app.use(middleware.requestLogger);
app.use(cors());
app.use('/api/todos',todoRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



export default app;