import Comment from "../dbmodel/Comment.js"

const createComment = async (params) => {
    const comment = new Comment(params);
    return await comment.save();
}
const findComments = async () => {
    const comments = await Comment.find();
    return comments;
}
const findCommentById = async (id) => {
    const comment = await Comment.findById(id);
    return comment;
}
const deleteComment = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);
    return comment;
}
const commentIncrementDecrementLikesCount = async (id, val) => {
    const comment = await Comment.findByIdAndUpdate(id, {
        $inc: { likes: val }
    })
    return comment;
}
export {
    createComment,
    findComments,
    findCommentById,
    deleteComment,
    commentIncrementDecrementLikesCount,
}