import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email
        });
        await newUser.save()
        res.status(201).json({message: "User created successfully"})
    } catch (err) {
        next(err);
     }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) return next(createError(400, "User password incorrect"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET)
        
        const { isAdmin, password, ...otherDetails } = user._doc;
        res.
            cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ ...otherDetails });
        
    } catch (err) {
        next(err);
     }
}