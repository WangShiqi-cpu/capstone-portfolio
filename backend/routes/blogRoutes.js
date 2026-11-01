// ============================================================
// routes/blogRoutes.js  —  /api/blog
// Includes nested /:postId/comments
// ============================================================
const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/blogController');
const {
    getComments,
    createComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.route('/').get(getPosts).post(protect, createPost);
router
    .route('/:id')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

// Nested comments
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;
