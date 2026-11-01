// ============================================================
// controllers/blogController.js  —  Blog post CRUD
// Public list/detail populated with author username.
// Update/delete restricted to the original author.
// ============================================================
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const ErrorHandler = require('../utils/ErrorHandler');

// GET /api/blog — public, all posts with author username
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await BlogPost.find()
            .populate('author', 'username email')
            .sort('-createdAt');
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        next(error);
    }
};

// GET /api/blog/:id — public, single post + comments
exports.getPost = async (req, res, next) => {
    try {
        const post = await BlogPost.findById(req.params.id).populate(
            'author',
            'username email'
        );
        if (!post) return next(new ErrorHandler('Blog post not found', 404));

        const comments = await Comment.find({ post: req.params.id })
            .populate('author', 'username')
            .sort('createdAt');

        res.status(200).json({ success: true, data: { ...post.toObject(), comments } });
    } catch (error) {
        next(error);
    }
};

// POST /api/blog — protected, author = logged-in user
exports.createPost = async (req, res, next) => {
    try {
        req.body.author = req.user._id;
        const post = await BlogPost.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

// PUT /api/blog/:id — protected & author-only
exports.updatePost = async (req, res, next) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return next(new ErrorHandler('Blog post not found', 404));

        if (post.author.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler('Not authorized: you are not the author', 403));
        }

        const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/blog/:id — protected & author-only
exports.deletePost = async (req, res, next) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return next(new ErrorHandler('Blog post not found', 404));

        if (post.author.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler('Not authorized: you are not the author', 403));
        }

        await Comment.deleteMany({ post: req.params.id });
        await post.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
