import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { addVideo, getAllVideos, getVideo, getVideoByTags, updateVideoData, deleteVideoData, likeVideo, dislikeVideo,videoViews, trendingVideos, randomVideos } from '../controller/video_controller.js';

const router = express.Router();

//As each are different method so we can remove the /--/:id extra thing 
router.post('/',verifyToken,addVideo)
router.get('/all',getAllVideos)
router.get('/',getVideo)
router.get('/tags',getVideoByTags)
router.put('/:id',verifyToken,updateVideoData)
router.delete('/:id',verifyToken,deleteVideoData)
router.put('/like/:id',verifyToken,likeVideo)
router.put('/dislike/:id',verifyToken, dislikeVideo)
router.put('/views/:id',verifyToken, videoViews)
router.get('/trending',trendingVideos)
router.get('/random',randomVideos)
export default router;