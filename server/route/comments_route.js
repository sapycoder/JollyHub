import express from 'express';
import { addComment, getComment, deleteCommentData, likeComment, dislikeComment} from '../controller/comments_controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/',verifyToken, addComment);
router.get('/:videoId',verifyToken, getComment);
router.delete('/:id',verifyToken, deleteCommentData);
router.put('/likeComment/:id',verifyToken, likeComment)
router.put('/dislikeComment/:id',verifyToken, dislikeComment)
export default router;