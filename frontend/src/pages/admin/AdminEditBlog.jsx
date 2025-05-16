import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../../styles/admin/admin.css";

const AdminEditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/blogs').then(res => {
      const blog = res.data.find(b => b.id === parseInt(id));
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    axios.put(`http://localhost:5000/api/admin/blogs/${id}`, formData);
    navigate('/admin/blogs');
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          required
        /><br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        /><br /><br />
        <button type="submit">Update</button>
        <p>
          <a href="/admin/blogs">Cancel</a>
        </p>
      </form>
    </div>
  );
};

export default AdminEditBlog;
