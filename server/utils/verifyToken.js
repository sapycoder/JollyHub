import jwt from 'jsonwebtoken'
import { exceptionCode } from '../constants/error_status.js'
import { CustomError } from '../utils/errorHandler.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(CustomError(exceptionCode.UNAUTHORIZED.status, exceptionCode.UNAUTHORIZED.code, exceptionCode.UNAUTHORIZED.message))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err){
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message + " Token not Valid"))
        }
        req.user = user;
        next();
    })
}