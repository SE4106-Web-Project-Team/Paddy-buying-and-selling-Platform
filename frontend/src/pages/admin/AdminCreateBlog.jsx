import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/admincreateblog.css";

const AdminCreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      return alert("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/create-blog",
        formData
      );
      alert(res.data.message);
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="admin-createblog-page">
      <AdminDashboard>
        <div className="content-panel">
          <h2>Create Blog Post</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <button type="submit">Submit</button>

            <p>
              <a href="/admin/blogs">Cancel</a>
            </p>
          </form>
        </div>
      </AdminDashboard>
    </div>
  );
};

export default AdminCreateBlog;
