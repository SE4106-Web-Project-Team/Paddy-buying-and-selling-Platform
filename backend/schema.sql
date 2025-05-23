/* Database */
CREATE SCHEMA `paddy_platform`;

/* Users */
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  profile_type ENUM('buyer', 'seller'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* User Profile */
CREATE TABLE user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  phoneNo VARCHAR(15),
  province VARCHAR(100),
  description TEXT,
  profilePicture VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/* Gig */
CREATE TABLE gigs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image VARCHAR(255),
  paddy_type VARCHAR(100),
  price DECIMAL(10, 2),
  description TEXT,
  quantity VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/* Shop */
CREATE TABLE shops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/* Messages */
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Admin */
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

/* Blog */
CREATE TABLE blogs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  content TEXT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Paddy Prices */
CREATE TABLE paddy_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paddy_type VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
