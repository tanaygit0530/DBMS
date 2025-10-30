const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const testDB = async () => {
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'train_monitoring',
    });

    console.log('Successfully connected to MySQL database!');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    console.log('Test query result:', rows[0].solution);
    
    await connection.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
};

testDB();