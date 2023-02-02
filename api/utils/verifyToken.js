import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = async (req, res, next) => {
    console.log(req);
    const token = req.cookies.access_token;
    
    if (!token) return next(createError(401, "User not authorized!"))
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return next(createError(403, "Token not valid"))
        req.user = user
        next() 
    })
}

export const verifyUser = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not authorized!"))
        }
        
    })
}

export const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(403, "You are not an admin!"))
        }
        
    })
}