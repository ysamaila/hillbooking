import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose.set("strictQuery", false);

const app = express();

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
        console.log("Connected to MongoDB server!")
    } catch(error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB is disconnetced!");
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB is  connetced!")
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);


app.listen(5000, () => {
    connect();
    console.log("Connected to backend...");
})