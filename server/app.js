import express from "express";
import { json } from "express";
import logger from "./utils/logger.js";
import todoRouter from "./controllers/todos.js";

const app = express()
app.use(json());
app.use('/api/todos',todoRouter)



export default app;