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
    commnet: {
        type: String,
        required: true,
    },
    likes:{ //stores user ids who have liked commnet
        type: [String],
        default: []
    }
}, {timestamps: true}) 
export default mongoose.model("Comment", VideoSchema);