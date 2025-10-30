const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const initDB = async () => {
  try {
    // Create connection without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Create database if it doesn't exist
    await connection.execute('CREATE DATABASE IF NOT EXISTS train_monitoring');
    await connection.execute('USE train_monitoring');

    // Create trains table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS trains (
        id INT AUTO_INCREMENT PRIMARY KEY,
        train_number VARCHAR(50) NOT NULL UNIQUE,
        train_name VARCHAR(100) NOT NULL,
        capacity INT NOT NULL,
        current_status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create sensors table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sensors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sensor_type VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL,
        status ENUM('active', 'inactive', 'faulty') DEFAULT 'active',
        train_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE SET NULL
      )
    `);

    // Create accidents table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS accidents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        train_id INT,
        location VARCHAR(100) NOT NULL,
        accident_time DATETIME NOT NULL,
        severity ENUM('minor', 'moderate', 'severe', 'critical') NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE SET NULL
      )
    `);

    // Create alerts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        accident_id INT,
        alert_time DATETIME NOT NULL,
        alert_level ENUM('low', 'medium', 'high', 'critical') NOT NULL,
        message TEXT NOT NULL,
        sent_to VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (accident_id) REFERENCES accidents(id) ON DELETE CASCADE
      )
    `);

    // Create response_teams table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS response_teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_name VARCHAR(100) NOT NULL,
        team_leader VARCHAR(100) NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        specialization VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create response_actions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS response_actions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        accident_id INT,
        team_id INT,
        action_time DATETIME NOT NULL,
        action_description TEXT NOT NULL,
        status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (accident_id) REFERENCES accidents(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES response_teams(id) ON DELETE SET NULL
      )
    `);

    console.log('Database and tables created successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDB();