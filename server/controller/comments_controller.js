import mongoose from "mongoose";
import {createComment, findComments, findCommentById, deleteComment, commentIncrementDecrementLikesCount} from '../repository/comment_repository.js'
import { findVideo, findVideoById } from '../repository/video_repository.js'


export const addComment = async (req, res, next) => {
    try {
        const newComment = await createComment({ userId: req.user.id, ...req.body })
        res.status(200).json(newComment)
    }
    catch (err) {
        return next(err)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await findComments({videoId: req.params.videoId})
        res
            .status(200)
            .json(comments)
    }
    catch (err) {
        return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
    }
}

export const deleteCommentData = async (req, res, next) => {
    //Comment is allowed to do this operation ony if he is logged in / access token matches
    try {
        const comment = await findCommentById(req.params.id);
        const video = await findVideoById(comment.videoId);
        if (!comment) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
        }
        //Either it can be deleted by the person who posted the comment or video owner
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await deleteComment(req.params.id)
            res.status(200).json("Comment Deleted Successfully!")
        } else {
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message))
        }
    }
    catch (err) {
        next(err)
    }
}
export const likeComment = async (req, res, next) => {
    try {
        await commentIncrementDecrementLikesCount(req.params.id, 1);
        res.status(200).json("You have liked this comment.")
    }
    catch (err) {
        next(err)
    }
}
export const dislikeComment = async (req, res, next) => {
    try {
        await commentIncrementDecrementLikesCount(req.params.id, -1);
        res.status(200).json("You have disliked this comment.")
    }
    catch (err) {
        next(err)
    }
}