import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route/users_route.js';
import videoRoute from './route/videos_route.js';
import commentRoute from './route/comments_route.js';
import authRoute from './route/auth_route.js';
import cookieParser from 'cookie-parser';
// import { handleErrorMessages } from './utils/errorStatusHandler.js';

const app = express();
dotenv.config() 

//Connect to mongodb
const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err) => {
        throw err
    })
}
//App routes in use
app.use(cookieParser())
app.use(express.json()) //to take external json 
app.use('/api/users', userRoute)
app.use('/api/videos', videoRoute)
app.use('/api/comments', commentRoute)
app.use('/api/auth', authRoute)

//Error handling middleware - handles errors in better way
app.use((err, req, res, next) => {
   return res.status(err.errorStatus || 500).json({
        success: false,
        status: err.status || 500,
        code: err.code || "Internal Server Error",
        message: err.message || "Oops! Something went wrong.",
   })
})


app.listen(2311, () => {
    connect()
    console.log("Connected to Server")
});