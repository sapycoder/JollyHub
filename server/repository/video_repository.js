import Video from '../dbmodel/Video.js';

const createVideo = async (params) => {
    const video = new Video(params);
    return await video.save();
}
const findAllVideos = async () => {
    const videos = await Video.find().sort({createdAt: -1});
    return videos;
}
const findVideo = async (params) => {
    const video = await Video.find(params);
    return video;
}
const findVideoById = async (id) => {
    const video = await Video.findById(id);
    return video;
}
const updateVideo = async (id, params) => {
    const video = await Video.findByIdAndUpdate(id, {
        $set: params
    },
        { new: true });
    return video;
}
const deleteVideo = async (id) => {
    const video = await Video.findByIdAndDelete(id);
    return video;
}
const incrementLikesCount = async (id) => {
    const video = await Video.findByIdAndUpdate(id, {
        $inc: { likes: 1 }
    });
    return video;
}
const decrementLikesCount = async (id) => {
    const video = await Video.findByIdAndUpdate(id, {
        $inc: { likes: -1 }
    });
    return video;
}
const incrementViewsCount = async (id) => {
    const video = await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 }
    })
    return video;
}
const trendingVideosData = async () => {
    const videos = await Video.find().sort({views: -1});
    return videos;
}
const randomVideosData = async () => {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return videos;
}

export { createVideo, findAllVideos, findVideo, findVideoById, updateVideo, deleteVideo, incrementLikesCount, decrementLikesCount, incrementViewsCount, trendingVideosData, randomVideosData }; 