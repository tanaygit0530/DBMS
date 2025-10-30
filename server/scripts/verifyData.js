const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const verifyData = async () => {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'train_monitoring',
    });

    console.log('Successfully connected to MySQL database!');
    
    // Check if Train table exists
    console.log('Checking Train table...');
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'Train'"
    );
    
    if (tables.length === 0) {
      console.log('Train table does not exist!');
      return;
    }
    
    console.log('Train table exists');
    
    // Count trains
    const [countResult] = await connection.execute('SELECT COUNT(*) as count FROM Train');
    console.log('Number of trains in database:', countResult[0].count);
    
    // Show all trains
    const [trains] = await connection.execute('SELECT * FROM Train');
    console.log('Trains in database:');
    console.table(trains);
    
    // Try inserting a test train
    console.log('Inserting test train...');
    const [insertResult] = await connection.execute(
      'INSERT INTO Train (Train_Number, Type, Capacity) VALUES (?, ?, ?)',
      ['TEST-001', 'Test Train', 100]
    );
    
    console.log('Test train inserted with ID:', insertResult.insertId);
    
    // Show all trains after insertion
    const [trainsAfter] = await connection.execute('SELECT * FROM Train');
    console.log('Trains in database after insertion:');
    console.table(trainsAfter);
    
    // Clean up test train
    await connection.execute('DELETE FROM Train WHERE Train_Number = ?', ['TEST-001']);
    console.log('Test train cleaned up');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.errno) {
      console.error('Error code:', error.errno);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
};

verifyData();