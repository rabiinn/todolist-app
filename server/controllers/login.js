import { Router } from "express";
import bcrypt from 'bcrypt';
import user from "../models/user.js";
import jwt from "jsonwebtoken"
import config from "../utils/config.js";
const loginRouter = Router();

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }
        if (username.length < 4 || password.length < 6) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const usertobeloggedin = await user.findOne({ username });
        const passwordCorrect = usertobeloggedin
            ? await bcrypt.compare(password, usertobeloggedin.passwordHash)
            : false;

        if (!usertobeloggedin || !passwordCorrect) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const userForToken = {
            username: usertobeloggedin.username,
            id: usertobeloggedin._id
        }
        const token = jwt.sign(userForToken, config.SECRET);

        res.status(200).json({ token, username: usertobeloggedin.username, name: usertobeloggedin.name});
    } catch (error) {
        next(error);
    }
});

export default loginRouter;