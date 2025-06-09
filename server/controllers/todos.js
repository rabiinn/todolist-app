import logger from "../utils/logger.js";
import { Router } from "express";

const todoRouter = Router();

todoRouter.get('/', (req, res) => {
    res.status(200).json({Message: "Welcome to my todoserver"});
})

todoRouter.get('/info', (req, res) => {
    res.status(200).send("A simple todolist server");
})

export default todoRouter
