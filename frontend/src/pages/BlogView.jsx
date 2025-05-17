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
    <div>
      <NavigationBar />
      <p>
        <a href="/blog">Back</a>
      </p>
      <h2 style={{ width: "80%", margin: "auto", display: "block" }}>
        {blog.title}
      </h2>
      <img
        src={`http://localhost:5000/uploads/blogs/${blog.image}`}
        alt={blog.title}
        style={{
          maxWidth: "50%",
          height: "auto",
          margin: "auto",
          display: "block",
        }}
      />
      <div style={{ width: "80%", margin: "20px auto", textAlign: "justify" }}>
        {blog.content
          .split(/\r?\n\r?\n/) // handles \n\n or \r\n\r\n
          .map((para, i) => (
            <p key={i} style={{ marginBottom: "1em" }}>
              {para}
            </p>
          ))}
      </div>
    </div>
  );
};

export default BlogView;
