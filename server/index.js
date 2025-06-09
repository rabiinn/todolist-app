import express from "express";
import { json } from "express";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
const app = express()
app.use(json());

app.get('/', (req, res) => {
    res.status(200).json({Message: "Welcome to my todoserver"});
})

app.get('/info', (req, res) => {
    res.status(200).send("A simple todolist server");
})

app.listen(config.PORT,() => {
    logger.info(`Server started on port ${config.PORT}`);
})