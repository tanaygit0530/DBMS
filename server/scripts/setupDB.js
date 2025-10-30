const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const setupDB = async () => {
  let connection;
  
  try {
    // Create connection without specifying database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'train_monitoring'}`);
    console.log(`Database '${process.env.DB_NAME || 'train_monitoring'}' ready`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'train_monitoring'}`);
    console.log(`Using database '${process.env.DB_NAME || 'train_monitoring'}'`);

    // Create Train table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Train (
        Train_ID INT PRIMARY KEY AUTO_INCREMENT,
        Train_Number VARCHAR(20),
        Type VARCHAR(50),
        Capacity INT
      )
    `);
    console.log('Train table ready');

    // Create Sensor table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Sensor (
        Sensor_ID INT PRIMARY KEY AUTO_INCREMENT,
        Location VARCHAR(100),
        Train_ID INT,
        FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
      )
    `);
    console.log('Sensor table ready');

    // Create Accident table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Accident (
        Accident_ID INT PRIMARY KEY AUTO_INCREMENT,
        Date_Time DATETIME,
        Location VARCHAR(100),
        Train_ID INT,
        FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
      )
    `);
    console.log('Accident table ready');

    // Create Alert table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Alert (
        Alert_ID INT PRIMARY KEY AUTO_INCREMENT,
        Alert_Type VARCHAR(50),
        Accident_ID INT,
        FOREIGN KEY (Accident_ID) REFERENCES Accident(Accident_ID)
      )
    `);
    console.log('Alert table ready');

    // Create Response_Team table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Response_Team (
        Team_ID INT PRIMARY KEY AUTO_INCREMENT,
        Team_Name VARCHAR(100),
        Contact_Number VARCHAR(15),
        Region VARCHAR(50)
      )
    `);
    console.log('Response_Team table ready');

    // Create Response_Action table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Response_Action (
        Response_ID INT PRIMARY KEY AUTO_INCREMENT,
        Accident_ID INT,
        Team_ID INT,
        Response_Time DATETIME,
        FOREIGN KEY (Accident_ID) REFERENCES Accident(Accident_ID),
        FOREIGN KEY (Team_ID) REFERENCES Response_Team(Team_ID)
      )
    `);
    console.log('Response_Action table ready');

    // Insert sample data for trains
    await connection.query(`
      INSERT IGNORE INTO Train (Train_ID, Train_Number, Type, Capacity) VALUES
      (1, 'TN-101', 'Express', 300),
      (2, 'TN-102', 'Mail', 250),
      (3, 'TN-103', 'Superfast', 280)
    `);
    console.log('Sample trains data inserted');

    // Insert sample data for sensors
    await connection.query(`
      INSERT IGNORE INTO Sensor (Sensor_ID, Location, Train_ID) VALUES
      (1, 'Engine Bay', 1),
      (2, 'Wheel Assembly', 1),
      (3, 'Brake System', 2),
      (4, 'Front Cabin', 3)
    `);
    console.log('Sample sensors data inserted');

    // Insert sample data for response teams
    await connection.query(`
      INSERT IGNORE INTO Response_Team (Team_ID, Team_Name, Contact_Number, Region) VALUES
      (1, 'Emergency Response Unit', '+1234567890', 'North'),
      (2, 'Medical Response Team', '+1234567891', 'South'),
      (3, 'Fire Rescue Squad', '+1234567892', 'East')
    `);
    console.log('Sample response teams data inserted');

    console.log('\nDatabase setup completed successfully!');
    console.log('You can now start the server with: npm run server');
    
  } catch (error) {
    console.error('Error setting up database:', error.message);
    if (error.errno) {
      console.error('Error code:', error.errno);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

setupDB();