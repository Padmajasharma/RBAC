const Post = require('../models/Post');

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name');
  res.json(posts);
};

// Create a post (only accessible to admin)
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user._id });
  await post.save();
  res.status(201).json(post);
};

module.exports = { getPosts, createPost };
