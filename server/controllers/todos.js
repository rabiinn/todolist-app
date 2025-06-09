import logger from "../utils/logger.js";
import { Router } from "express";
import todo from "../models/todo.js";
const todoRouter = Router();

todoRouter.get('/', async (req, res, next) => {
    try{
        const todos = await todo.find({});
        res.status(200).json(todos);
    }
    catch(error){
        next(error);
    }
})

todoRouter.get('/info', (req, res) => {
    res.status(200).send("A simple todolist server");
})

todoRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const returnedtodo= await todo.findById(id);
        if(returnedtodo){
            res.status(200).json(returnedtodo); 
        }
        else {
            res.status(404).end();
        }
    }
    catch(error){
        next(error);
    }
} )

todoRouter.post('/', async (req, res, next) => {
    const body = req.body;

    try{
        if(!body.title){
            return res.send(400).json({error: "title required"});
        }
        const newToDo = new todo({
            title: body.title,
            description: body.description,
            status: 'open',
            createdat: new Date(),
            dueDate: body.dueDate,
        })

        const returnedTodo = await newToDo.save();
        res.status(201).json(returnedTodo);

    }
    catch(error){
        next(error);
    }

})



export default todoRouter
