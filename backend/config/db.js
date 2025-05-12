// backend/config/db.js
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Promise-style pool
const dbPromise = require('mysql2/promise').createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});


module.exports = db;
module.exports.db = db;
module.exports.dbPromise = dbPromise;
