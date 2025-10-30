const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const checkMySQL = async () => {
  console.log('Checking MySQL connection...');
  console.log('Host:', process.env.DB_HOST || 'localhost');
  console.log('User:', process.env.DB_USER || 'root');
  console.log('Database:', process.env.DB_NAME || 'train_monitoring');
  console.log('Port:', process.env.DB_PORT || 3306);
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
    });
    
    console.log('✅ Successfully connected to MySQL server!');
    
    // Check if database exists
    try {
      await connection.execute('USE ??', [process.env.DB_NAME || 'train_monitoring']);
      console.log('✅ Database exists and is accessible');
    } catch (dbErr) {
      console.log('⚠️ Database does not exist yet. Run "npm run setup-db" to create it.');
    }
    
    await connection.end();
    console.log('✅ MySQL check completed successfully');
  } catch (error) {
    console.log('❌ Failed to connect to MySQL server');
    console.log('Error message:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\nTroubleshooting tips:');
      console.log('1. Make sure MySQL server is running');
      console.log('2. Check if the host and port are correct');
      console.log('3. Verify MySQL is listening on the specified port');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\nTroubleshooting tips:');
      console.log('1. Check if the username and password are correct');
      console.log('2. Verify the user has permission to connect from this host');
    }
  }
};

checkMySQL();