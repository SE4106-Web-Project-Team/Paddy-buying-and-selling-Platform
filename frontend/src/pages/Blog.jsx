import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/blog/blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 New: search state
  const blogsPerPage = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load blogs");
      }
    };

    fetchBlogs();
  }, []);

  // 🔍 Filtered blogs based on title
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
      <NavigationBar />
      <p>
        <a href="/">Back</a>
      </p>
      <h2>Blog Posts</h2>

      {/* 🔍 Search input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search blog by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to page 1 when searching
          }}
          style={{ padding: "5px", width: "300px" }}
        />
      </div>

      {currentBlogs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No matching blog posts found.</p>
      ) : (
        currentBlogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              width: "80%",
              margin: "auto",
            }}
          >
            <h3>{blog.title}</h3>
            <div style={{ display: "flex" }}>
              <img
                src={`http://localhost:5000/uploads/blogs/${blog.image}`}
                alt={blog.title}
                style={{ maxWidth: "20%", height: "auto" }}
              />
              <div style={{ marginLeft: "20px" }}>
                <p style={{ textAlign: "justify" }}>
                  {blog.content.length > 300
                    ? blog.content.substring(0, 300) + "..."
                    : blog.content}
                </p>
                <Link to={`/blog/${blog.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
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
  );
};

export default Blog;
