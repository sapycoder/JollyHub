import User from '../dbmodel/User.js';

const createUser = async (params) => {
    const user = new User(params);
    return await user.save();
}
const findUser = async (params) => {
    const user = await User.findOne(params);
    return user;
}
const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}
const updateUser = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, {
        $set: params
    },
        { new: true });
    return user;
}
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
}
const subscribeChannel = async (subscribedUserId, userId) => {
    const user = await User.findByIdAndUpdate(subscribedUserId, {
        $push : {subscribedChannels: userId}
    });
    return user;
}
const unsubscribeChannel = async (subscribedUserId, userId) => {
    const user = await User.findByIdAndUpdate(subscribedUserId, {
        $pull : {subscribedChannels: userId}
    });
    return user;
}
const subscribersIncrementDecrement = async (subscribedUserId, val) => {
    const user = await User.findByIdAndUpdate(subscribedUserId, {
        $inc: {subcribers: val}
    })
}
const videoAddedByUser = async (userId,videoId) => {
    const user = await User.findByIdAndUpdate(userId, {
        $push : {videosUploaded: videoId}
    });
    return user;
    
}
const videoDeletedByUser = async (userId,videoId) => {
    const user = await User.findByIdAndUpdate(userId, {
        $pull : {videosUploaded: videoId}
    });
    return user;
    
}
const addVideoToLikedList = async (userId,videoId) => {
    const user = await User.findByIdAndUpdate(userId, {
        $push : {likedVideos: videoId}
    });
    return user;
}
const removeVideoFromLikedList = async (userId,videoId) => {
    const user = await User.findByIdAndUpdate(userId, {
        $pull : {likedVideos: videoId}
    });
    return user;
    
}
export { createUser, findUser, findUserById, updateUser, deleteUser, subscribeChannel, unsubscribeChannel, videoAddedByUser, videoDeletedByUser, addVideoToLikedList, removeVideoFromLikedList, subscribersIncrementDecrement }; 