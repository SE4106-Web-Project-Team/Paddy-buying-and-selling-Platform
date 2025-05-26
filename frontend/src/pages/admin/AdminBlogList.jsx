import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/adminbloglist.css";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 New: search state
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`);
        fetchBlogs(); // refresh
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog.");
      }
    }
  };

  // 🔍 Filter blogs by search query (by title)
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic (apply after filtering)
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-bloglist-page">
      <AdminDashboard>
      <div className="content-panel">
        <div className="header-bar">
          <h2>All Blog Posts</h2>
          <button
            onClick={() => navigate("/admin/create-blog")}
            className="create-btn"
          >
            Create Blog Post
          </button>
          <input
            type="text"
            placeholder="Search by blog title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        {currentBlogs.length === 0 ? (
          <p>No matching blogs found.</p>
        ) : (
          currentBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <div style={{ display: "flex"}}>
                <img
                src={`http://localhost:5000/uploads/blogs/${blog.image}`}
                alt={blog.title}
              />
              <p>
                {blog.content.length > 300
                  ? blog.content.substring(0, 310) + "..."
                  : blog.content}
              </p>
              </div>
              <div className="actions">
                <button onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      </AdminDashboard>
    </div>
  );
};

export default AdminBlogList;
