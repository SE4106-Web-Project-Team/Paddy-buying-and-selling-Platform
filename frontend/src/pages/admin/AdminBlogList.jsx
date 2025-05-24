import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import "../../styles/admin/adminbloglist.css";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState(""); 
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

  // Filter blogs by search query (by title)
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
    <div>
      <div style={{ display: "flex" }}>
        <AdminDashboard />
        <div>
          <button onClick={() => navigate("/admin/create-blog")}>
            Create Blog Post
          </button>
          <h2>All Blog Posts</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by blog title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset page on new search
            }}
            style={{ marginBottom: "20px", padding: "5px", width: "300px" }}
          />

          {currentBlogs.length === 0 ? (
            <p>No matching blogs found.</p>
          ) : (
            currentBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  border: "1px solid #ccc",
                  marginBottom: "1rem",
                  padding: "1rem",
                }}
              >
                <h3>{blog.title}</h3>
                <img
                  src={`http://localhost:5000/uploads/blogs/${blog.image}`}
                  alt={blog.title}
                  style={{ maxWidth: "200px", display: "block" }}
                />
                <p>
                  {blog.content.length > 300
                    ? blog.content.substring(0, 300) + "..."
                    : blog.content}
                </p>
                <button onClick={() => navigate(`/admin/edit-blog/${blog.id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            ))
          )}

          {/* Pagination Controls */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogList;
