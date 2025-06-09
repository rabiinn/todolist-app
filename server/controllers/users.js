import { Router } from "express";
import user from "../models/user.js";
import config from "../utils/config.js";
import bcrypt from "bcrypt";
const userRouter = Router();


 userRouter.get('/', async (req, res, next) => {
    const users = await user.find({}).populate('todos');
    res.status(200).json(users);
 })

userRouter.post('/', async (req, res, next) => {
    const {username, password, name} = req.body;
    try {
        if(!username){
            return res.status(400).json({error: "Username is required"});
        }
        if(username.length < 4){
            return res.status(400).json({error: "Username must be longer than 4 characters"});
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const existingUser = await user.findOne({username});
        if(existingUser){
            return res.status(400).json({error: "Usernames are expected to be unique"});
        }

        const passwordhash = await bcrypt.hash(password,config.saltRounds);
        const newUser = new user({
            username: username,
            passwordHash: passwordhash,
            name: name,
        });
        const returneduser = await newUser.save();
        const {passwordHash, ...userWithoutPassword} = returneduser;
        res.status(201).json(userWithoutPassword);

    }
    catch(error){
        next(error);
    }
})

export default userRouter;