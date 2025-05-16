// src/pages/BlogView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/nav/NavigationBar";

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
    <div>
      <NavigationBar />
      <p>
        <a href="/blog">Back</a>
      </p>
      <h2 style={{width: "80%", margin: "auto", display: "block"}}>{blog.title}</h2>
      <img
        src={`http://localhost:5000/uploads/blogs/${blog.image}`}
        alt={blog.title}
        style={{ maxWidth: "50%", height: "auto", margin: "auto", display: "block" }}
      />
      <p style={{ textAlign: "justify", marginTop: "20px", width: "80%", margin: "auto", display: "block" }}>{blog.content}</p>
    </div>
  );
};

export default BlogView;
