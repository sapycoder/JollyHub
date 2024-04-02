import mongoose from "mongoose";
import { createVideo, findAllVideos, findVideo, updateVideo, deleteVideo, incrementLikesCount, decrementLikesCount, incrementViewsCount, findVideoById, trendingVideosData, randomVideosData } from '../repository/video_repository.js'
import { videoAddedByUser, videoDeletedByUser, addVideoToLikedList, removeVideoFromLikedList } from '../repository/user_repository.js'
import { exceptionCode } from '../constants/error_status.js'
import { CustomError } from '../utils/errorHandler.js'

export const addVideo = async (req, res, next) => {
    try {
        const newVideo = await createVideo({ userId: req.user.id, ...req.body })
        await videoAddedByUser(req.user.id, newVideo._id)
        res.status(200).json(newVideo)
    }
    catch (err) {
        return next(err)
    }
}

export const getAllVideos = async (req, res, next) => {
    try {
        const videos = await findAllVideos();
        if (!videos) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, "No Videos Available!"))
        }
        res
            .status(200)
            .json(videos)
    }
    catch (err) {
        return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, "Aww Snap! Something went Wrong."))
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const videos = await findVideo(req.body)
        if (!videos) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
        }
        res
            .status(200)
            .json(videos)
    }
    catch (err) {
        return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
    }
}

export const updateVideoData = async (req, res, next) => {
    //Video is allowed to do this operation ony if he is logged in / access token matches
    try {
        const video = await findVideoById(req.params.id);
        if (!video) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
        }
        if (req.user.id === video.userId) {
            const updateVideoFields = await updateVideo(req.params.id, req.body)
            res.status(200).json(updateVideoFields)
        } else {
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message))
        }
    }
    catch (err) {
        next(err)
    }
}
export const deleteVideoData = async (req, res, next) => {
    //Video is allowed to do this operation ony if he is logged in / access token matches
    try {
        const video = await findVideoById(req.params.id);
        if (!video) {
            return next(CustomError(exceptionCode.NOT_FOUND.status, exceptionCode.NOT_FOUND.code, exceptionCode.NOT_FOUND.message))
        }
        if (req.user.id === video.userId) {
            await videoDeletedByUser(req.user.id, req.params.id)
            await deleteVideo(req.params.id)
            res.status(200).json("Video Deleted Successfully!")
        } else {
            return next(CustomError(exceptionCode.FORBIDDEN.status, exceptionCode.FORBIDDEN.code, exceptionCode.FORBIDDEN.message))
        }
    }
    catch (err) {
        next(err)
    }
}
export const likeVideo = async (req, res, next) => {
    try {
        await incrementLikesCount(req.params.id);
        await addVideoToLikedList(req.user.id, req.params.id)
        res.status(200).json("You have liked this video.")
    }
    catch (err) {
        next(err)
    }
}
export const dislikeVideo = async (req, res, next) => {
    try {
        await decrementLikesCount(req.params.id);
        await removeVideoFromLikedList(req.user.id, req.params.id)
        res.status(200).json("You have disliked this video.")
    }
    catch (err) {
        next(err)
    }
}
export const videoViews = async (req, res, next) => {
    try {
        await incrementViewsCount(req.params.id);
        res.status(200).json("View Count is Updated!")
    }
    catch (err) {
        next(err)
    }
}
export const trendingVideos = async (req, res, next) => {
    try {
        const videos = await trendingVideosData();
        res
        .status(200)
        .json(videos)
    }
    catch (err) {
        next(err)
    }
}
export const randomVideos = async (req, res, next) => {
    try {
        const videos = await randomVideosData();
        res
        .status(200)
        .json(videos)
    }
    catch (err) {
        next(err)
    }
}



