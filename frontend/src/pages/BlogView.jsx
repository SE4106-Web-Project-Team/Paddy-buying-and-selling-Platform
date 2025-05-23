// src/pages/BlogView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/blog/blogview.css";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/blogs/${id}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-view-wrapper">
      <div className="blog-view-background"></div>
      <NavigationBar />
      <div className="blog-view-container">
        <a href="/blog" className="blogview-back-link">Back</a>
      
      <h2 className="blog-title">
        {blog.title}
      </h2>
      <img
        src={`http://localhost:5000/uploads/blogs/${blog.image}`}
        alt={blog.title}
        className="blog-image"
      />
      <div className="blog-content">
        {blog.content
          .split(/\r?\n\r?\n/) // handles \n\n or \r\n\r\n
          .map((para, i) => (
            <p key={i}>
              {para}
            </p>
          ))}
      </div>
      </div>
      
    </div>
  );
};

export default BlogView;
