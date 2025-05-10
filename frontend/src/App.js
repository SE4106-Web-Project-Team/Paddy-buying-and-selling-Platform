import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import Chat from './pages/features/Chat';
import Chatbot from './pages/features/Chatbot';
import Weather from './pages/features/Weather';

import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import ProtectedRoute from './components/ProtectedRoute';

import Gig from './pages/gig/Gig';
import GigCreate from './pages/gig/GigCreate';
import GigEdit from './pages/gig/GigEdit';

import Shop from './pages/shop/Shop';
import ShopCreate from './pages/shop/ShopCreate';
import ShopEdit from './pages/shop/ShopEdit';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        
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
        <Route path="/gig/create" element={<GigCreate />} />
        <Route path="/gig/edit/:id" element={<GigEdit />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/create" element={<ShopCreate />} />
        <Route path="/shop/edit" element={<ShopEdit />} />


      </Routes>
    </Router>
  );
}

export default App;
