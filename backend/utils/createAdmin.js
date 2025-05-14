require('dotenv').config({ path: __dirname + '/../.env' }); // 👈 force load correct .env

console.log('DB_USER:', process.env.DB_USER); // should now print: root
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // should now print: root
console.log('DB_NAME:', process.env.DB_NAME); // should now print: paddy_platform

const bcrypt = require('bcrypt');
const db = require('../config/db');

const email = 'admin@example.com';
const password = 'admin123';

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  const sql = 'INSERT INTO admins (email, password) VALUES (?, ?)';
  db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) throw err;
    console.log('Admin created successfully');
    process.exit();
  });
});
