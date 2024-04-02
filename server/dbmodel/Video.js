import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {//user who is uploading the video
        type: String,
        required: true,   
    },
    thumbnailUrl:{
        type: String,
        default: ""
    },
    videoUrl:{
        type: String,
        required: true,
    },
    views:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    },
    shrares:{
        type: Number,
        default: 0
    },
    tags:{
        type: [String],
        default: []
    }
}, {timestamps: true}) 
export default mongoose.model("Video", VideoSchema);