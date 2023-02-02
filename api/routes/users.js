import express from 'express';
import User from '../models/User.js';
import {updateUser, deleteUser, getUser, getUsers} from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
//import {createError} from '../utils/error.js'

const router = express.Router();

//UPDATE
router.put('/:id', verifyUser, updateUser)
//DELETE
router.delete('/:id', verifyUser, deleteUser)
//GET
router.get('/:id', verifyUser, getUser)
//GETALL
router.get('/', verifyAdmin, getUsers)




export default router;