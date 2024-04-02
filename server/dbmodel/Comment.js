import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {//user who is commenting
        type: String,
        required: true,    
    },
    videoId: { //video on which we are commenting
        type: String,
        required: true,    
    },
    description: {
        type: String,
        required: true,
    },
    likes:{ //stores user ids who have liked commnet
        type: Number,
        default: 0
    }
}, {timestamps: true}) 
export default mongoose.model("Comment", VideoSchema);