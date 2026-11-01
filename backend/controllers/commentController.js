// ============================================================
// controllers/commentController.js  —  Blog comments
// ============================================================
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const ErrorHandler = require('../utils/ErrorHandler');

// GET /api/blog/:postId/comments — public
exports.getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('author', 'username')
            .sort('createdAt');
        res.status(200).json({ success: true, count: comments.length, data: comments });
    } catch (error) {
        next(error);
    }
};

// POST /api/blog/:postId/comments — protected
exports.createComment = async (req, res, next) => {
    try {
        const post = await BlogPost.findById(req.params.postId);
        if (!post) return next(new ErrorHandler('Blog post not found', 404));

        const comment = await Comment.create({
            body: req.body.body,
            author: req.user._id,
            post: req.params.postId
        });

        const populated = await comment.populate('author', 'username');
        res.status(201).json({ success: true, data: populated });
    } catch (error) {
        next(error);
    }
};
