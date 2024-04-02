import mongoose from "mongoose";
import { findUserById, updateUser, deleteUser, subscribeChannel, unsubscribeChannel, subscribersIncrementDecrement } from '../repository/user_repository.js'
import { findVideoById } from '../repository/video_repository.js'
import { exceptionCode } from '../constants/error_status.js'

import { CustomError } from '../utils/errorHandler.js'

export const getUser = async (req, res, next) => {
    try {
        const user = await findUserById(req.params.id)
        if (!user) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
        }
        const { password, ...otherUserDetails } = user._doc;
        res
            .status(200)
            .json(otherUserDetails)
    }
    catch (err) {
        return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
    }
}

export const updateUserData = async (req, res, next) => {
    //User is allowed to do this operation ony if he is logged in / access token matches
    try {
        if (req.params.id === req.user.id) {
            const updateUserFields = await updateUser(req.params.id, req.body)
            res.status(200).json(updateUserFields)
        } else {
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message))
        }
    }
    catch (err) {
        next(err)
    }
}
export const deleteUserData = async (req, res, next) => {
    //User is allowed to do this operation ony if he is logged in / access token matches
    try {
        if (req.params.id === req.user.id) {
            await deleteUser(req.params.id)
            res.status(200).json("User Deleted Successfully!")
        } else {
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message))
        }
    }
    catch (err) {
        next(err)
    }
}
export const subscribeUserChannel = async (req, res, next) => { //req.user.id ==> logged in user , req.params.id ==> user we want to subscribe
    try {
        await subscribeChannel(req.user.id, req.params.id);
        await subscribersIncrementDecrement(req.params.id, 1);
        res.status(200).json("Subscription Successful!")
    }
    catch (err) {
        next(err)
    }
}
export const unsubscribeUserChannel = async (req, res, next) => {
    try {
        await unsubscribeChannel(req.user.id, req.params.id);
        await subscribersIncrementDecrement(req.params.id, -1);
        res.status(200).json("UnSubscription Successful!")
    }
    catch (err) {
        next(err)
    }
}
export const likedVideos = async (req, res, next) => {
    try {
        const user = await findUserById(req.params.id)
        const { likedVideos } = user
        const videos = await Promise.all(
            likedVideos.map(async (video) => {
                return await findVideoById(video);
            }));
        res.status(200).json(videos.flat())
    }
    catch (err) {
        next(err)
    }
}


