import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, { title, content });
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <h3>Existing Posts</h3>
      {posts.map(post => (
        <div key={post._id}>
          <h4>{post.title}</h4>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

