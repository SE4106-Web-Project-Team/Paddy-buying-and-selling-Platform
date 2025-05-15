import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/admin/admin.css";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/blogs');
    setBlogs(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this blog?')) {
      axios.delete(`http://localhost:5000/api/admin/blogs/${id}`);
      navigate('/admin/blogs');
      fetchBlogs(); // refresh
    }
  };

  return (
    <div>
      <h2>All Blog Posts</h2>
      {blogs.map(blog => (
        <div key={blog.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{blog.title}</h3>
          <img
            src={`http://localhost:5000/uploads/blogs/${blog.image}`}
            alt={blog.title}
            style={{ maxWidth: '200px', display: 'block' }}
          />
          <p>{blog.content}</p>
          <button onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}>Edit</button>
          <button onClick={() => handleDelete(blog.id)} style={{ marginLeft: '10px' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogList;
