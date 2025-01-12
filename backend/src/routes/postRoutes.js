const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, admin, createPost);  // Only admin can create posts

module.exports = router;
