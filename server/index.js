import express from "express";
import { json } from "express";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import todoRouter from "./controllers/todos.js";
const app = express()
app.use(json());
app.use('/api/todos',todoRouter)

app.listen(config.PORT,() => {
    logger.info(`Server started on port ${config.PORT}`);
})