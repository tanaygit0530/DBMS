const mysql = require('mysql2');

// Load environment variables
require('dotenv').config();

// Log environment variables for debugging
console.log('DB Config - Host:', process.env.DB_HOST);
console.log('DB Config - User:', process.env.DB_USER);
console.log('DB Config - Password:', process.env.DB_PASSWORD ? '****' : 'NOT SET');
console.log('DB Config - Database:', process.env.DB_NAME);

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'train_monitoring',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise-based connection
const db = pool.promise();

// Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err.message);
  });

// Add query logging
const originalExecute = db.execute;
db.execute = async function(query, params) {
  console.log('Executing query:', query);
  if (params) {
    console.log('With parameters:', params);
  }
  try {
    const result = await originalExecute.call(this, query, params);
    console.log('Query executed successfully');
    return result;
  } catch (error) {
    console.error('Query execution failed:', error.message);
    throw error;
  }
};

module.exports = db;