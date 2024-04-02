import express from 'express';
import { getUser, updateUserData, deleteUserData, subscribeUserChannel, unsubscribeUserChannel, likedVideos} from '../controller/users_controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/getUser/:id',getUser)
router.put('/:id',verifyToken,updateUserData)
router.delete('/:id',verifyToken,deleteUserData)
router.put('/sub/:id',verifyToken,subscribeUserChannel)
router.put('/unsub/:id',verifyToken,unsubscribeUserChannel)
router.get('/likedVideos/:id',verifyToken,likedVideos)

export default router;