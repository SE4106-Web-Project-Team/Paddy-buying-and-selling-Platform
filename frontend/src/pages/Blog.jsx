import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import "../styles/blog/blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filtered blogs based on title
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic (apply after filtering)
  const blogsPerPage = 5;
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
    <div className="blog-container">
      <NavigationBar />
      <div className="blog-cont">
        <p>
        <a href="/" className="block-back-link">Back</a>
      </p>
        <h2>Blog Posts</h2>

      <div className="search-bar" >
        <input className="search-bar-input"
          type="text"
          placeholder="Search blog by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {currentBlogs.length === 0 ? (
        <p >No matching blog posts found.</p>
      ) : (
        currentBlogs.map((blog) => (
          <div className="blog-card"
            key={blog.id}>
            <h3>{blog.title}</h3>
            <div className="blog-card-content">
              <img
                src={`http://localhost:5000/uploads/blogs/${blog.image}`}
                alt={blog.title}
              />
              <div>
                <p>
                  {blog.content.length > 300
                    ? blog.content.substring(0, 620) + "..."
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
      <div className="pagination-controls">
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
      
    </div>
  );
};

export default Blog;
