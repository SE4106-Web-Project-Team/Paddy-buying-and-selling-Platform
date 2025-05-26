require('dotenv').config({ path: __dirname + '/../.env' });
console.log('DB_USER:', process.env.DB_USER); 
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); 
console.log('DB_NAME:', process.env.DB_NAME);

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
