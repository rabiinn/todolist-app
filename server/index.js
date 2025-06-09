import express from "express";
import { json } from "express";
const app = express()
const PORT = 8080;
app.use(json());

app.get('/', (req, res) => {
    res.status(200).json({Message: "Welcome to my todoserver"});
})

app.get('/info', (req, res) => {
    res.status(200).send("A simple todolist server");
})

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})