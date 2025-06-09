import logger from "../utils/logger.js";
import { Router } from "express";
import todo from "../models/todo.js";
import user from "../models/user.js";
const todoRouter = Router();

todoRouter.get('/', async (req, res, next) => {
    try{
        const todos = await todo.find({}).populate('user');
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
            return res.status(400).json({error: "title required"});
        }
        const userid = body.userid;
        const useroftheTodo = await user.findById(userid);

        if (!useroftheTodo) {
            return res.status(404).json({ error: "User not found" });
        }

        const newToDo = new todo({
            title: body.title,
            description: body.description,
            status: 'open',
            createdat: new Date(),
            dueDate: body.dueDate,
            user: userid
        })

        const returnedTodo = await newToDo.save();
        useroftheTodo.todos.push(returnedTodo._id);
        await useroftheTodo.save()

        res.status(201).json(returnedTodo);

    }
    catch(error){
        next(error);
    }
})

todoRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try{
        if(!body){
            return res.status(400).json({error: "body required"});
        }
        const todotobeUpdated = await todo.findById(id);
        if(!todotobeUpdated){
            return res.status(404).json({error: "todo not found"});
        }
        
        todotobeUpdated.title = body.title;
        todotobeUpdated.description = body.description;
        todotobeUpdated.status = body.status;
        todotobeUpdated.dueDate = body.dueDate;

        const updatedtodo = await todotobeUpdated.save();
        res.status(200).json(updatedtodo);
    }
    catch(error){
        next(error);
    }
})

todoRouter.delete('/id', async (req, res, next) => {
    const id = req.params.id;
    try{
        await todo.findByIdAndDelete(id);
        res.status(204).end();
    }
    catch(error){
        next(error);
    }
})





export default todoRouter
