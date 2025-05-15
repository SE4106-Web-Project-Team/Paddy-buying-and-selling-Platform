// src/pages//Blog.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/blogs"); // adjust if not proxied
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load blogs");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{blog.title}</h3>
          <div style={{ display: "flex" }}>
            <img
              src={`http://localhost:5000/uploads/blogs/${blog.image}`}
              alt={blog.title}
              style={{ maxWidth: "20%", height: "auto" }}
            />
            <p style={{ margin: "auto 20px", textAlign: "justify" }}>{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
