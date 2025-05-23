# 🌾 Paddy Buying and Selling Platform

A full-stack web application that allows farmers and buyers to connect, chat, and trade agricultural products like paddy and related goods. The platform supports user authentication, real-time chat, gig/shop listings, blog posts, and an AI-powered agricultural chatbot.

## 🧱 Tech Stack

- **Frontend**: React, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Chat**: Socket.IO
- **AI Chatbot**: OpenRouter.ai (Mistral-7B)
- **Image Uploads**: Multer

---

## 🚀 Features

- User Registration & Login
- Profile with details & profile picture
- Create and manage Gigs (services) & Shop items (products)
- Admin dashboard for managing users, blogs, and prices
- Real-time Chat with Socket.IO
- Chatbot for paddy-related help
- Public Blog and Paddy Price pages

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── styles/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Prerequisites

- Node.js & npm
- MySQL server
- Git

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/paddy-platform.git
cd paddy-platform
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 🔐 Create `.env` file

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=paddy_platform
OPENROUTER_API_KEY=your_openrouter_api_key
```

#### ✅ Run Backend

```bash
node server.js
```

> Backend will start on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### ✅ Run Frontend

```bash
npm start
```

> Frontend will start on `http://localhost:3000`

---

## 🗄️ MySQL Database Setup

1. Create a database named `paddy_platform`.
2. Import the required SQL schema and seed data from `backend/schema.sql` (if available).
3. Tables include: `users`, `user_profiles`, `gigs`, `shops`, `messages`, `blog_posts`, `prices`, etc.

---

## 🔌 API Endpoints (Examples)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get profile
- `POST /api/gigs` - Create gig
- `POST /api/chatbot` - Ask chatbot
- `GET /api/shop` - Fetch shop items
- `GET /api/blogs` - Public blog posts

---

## 🧠 AI Chatbot Setup

Uses OpenRouter.ai with [Mistral 7B model](https://openrouter.ai/docs#models). Make sure your `.env` includes:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## 👨‍💼 Admin Login

There is no signup for the admin. Use predefined credentials (hardcoded or created manually in DB).

---

## 📸 Image Uploads

Images are stored in `backend/uploads/` and served statically through Express. Users can upload:

- Profile pictures
- Shop and Gig images
- Blog post images

---

## 🔐 Authentication

JWT is used to secure all protected routes. Tokens are stored in `localStorage` and attached in the frontend via `Authorization: Bearer` headers.

---

## 📦 Dependencies (Key)

### Backend

- `express`, `mysql2`, `jsonwebtoken`, `bcryptjs`, `multer`, `dotenv`, `socket.io`, `axios`

### Frontend

- `react-router-dom`, `axios`, `socket.io-client`

---

## ✍️ License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

For questions or contributions, contact the developer via [your-email@example.com].