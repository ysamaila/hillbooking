import express from 'express';
import Hotel from '../models/Hotel.js';
import {createHotel, updateHotel, deleteHotel, getHotel, getHotels} from '../controllers/hotel.js'
import {createError} from '../utils/error.js'

const router = express.Router();

//CREATE
router.post('/', createHotel)
//UPDATE
router.put('/:id', updateHotel)
//DELETE
router.delete('/:id', deleteHotel)
//GET
router.get('/:id', getHotel)
//GETALL
router.get('/', getHotels)


export default router;