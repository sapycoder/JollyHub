import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import {createUser, findUser} from '../repository/user_repository.js'
import { exceptionCode } from '../constants/error_status.js'
import { CustomError } from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

export const signUpUser = async (req,res,next) => {
    try{
        const {password, ...otherUserDetails} = req.body;
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        await createUser({...otherUserDetails, password: hash});
        res.status(200).send("User registerd successfully!")
    }
    catch(err){
        next(err);
    }
}
export const signInUser = async (req,res,next) => {
    try{
        const user = await findUser({email: req.body.email});
        if(!user){
            return next(CustomError(exceptionCode.NOT_FOUND.status,exceptionCode.NOT_FOUND.code, "You are not registered!"))
        }
        //Comparing using bycrpt compare to validate hashed password --> async
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if(!validatePassword){
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, "Password is Incorrect!"))
        } 

        const {password, ...otherUserDetails} = user._doc;
        
        //Storing token to eliminate hassle of logging in user again and again
        const token = jwt.sign({id: user._id}, process.env.JWT)
        res
        .cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json(otherUserDetails)
    }
    catch(err){
        next(err);
    }
}