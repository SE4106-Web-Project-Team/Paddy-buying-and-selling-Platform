import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Blogview from "./pages/BlogView";

import PaddyPrice from "./pages/PaddyPrice";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Chat from "./pages/features/Chat";
import Chatbot from "./pages/features/Chatbot";
import Weather from "./pages/features/Weather";

import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import ProtectedRoute from "./components/ProtectedRoute";

import Gig from "./pages/gig/Gig";
import GigView from "./pages/gig/GigView";
import GigCreate from "./pages/gig/GigCreate";
import GigEdit from "./pages/gig/GigEdit";

import Shop from "./pages/shop/Shop";
import ShopView from "./pages/shop/ShopView";
import ShopCreate from "./pages/shop/ShopCreate";
import ShopEdit from "./pages/shop/ShopEdit";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminEditBlog from "./pages/admin/AdminEditBlog";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminGigs from "./pages/admin/AdminGigs";
import AdminShop from "./pages/admin/AdminShop";
import AdminPrice from "./pages/admin/AdminPrice";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blogview />} />

        <Route path="/paddyprice" element={<PaddyPrice />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/features/chat" element={<Chat />} />
        <Route path="/features/chatbot" element={<Chatbot />} />
        <Route path="/features/weather" element={<Weather />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />

        <Route path="/gigs" element={<Gig />} />
        <Route path="/gig/:id" element={<GigView />} />
        <Route path="/gig/create" element={<GigCreate />} />
        <Route path="/gig/edit/:id" element={<GigEdit />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopView />} />
        <Route path="/shop/create" element={<ShopCreate />} />
        <Route path="/shop/edit/:id" element={<ShopEdit />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/create-blog"
          element={
            <AdminPrivateRoute>
              <AdminCreateBlog />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminPrivateRoute>
              <AdminBlogList />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/price"
          element={
            <AdminPrivateRoute>
              <AdminPrice />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/admin/edit-blog/:id"
          element={
            <AdminPrivateRoute>
              <AdminEditBlog />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <AdminUsers />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/gigs"
          element={
            <AdminPrivateRoute>
              <AdminGigs />
            </AdminPrivateRoute>
          }
        />
      <Route
          path="/admin/shop"
          element={
            <AdminPrivateRoute>
              <AdminShop />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
