const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Log environment variables for debugging
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
const testDBConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
    return true;
  } catch (err) {
    console.error('Database connection failed: ' + err.message);
    console.log('Server will continue running without database connection for testing purposes');
    return false;
  }
};

// Routes
app.use('/api/train', require('./routes/trains'));
app.use('/api/sensor', require('./routes/sensors'));
app.use('/api/accident', require('./routes/accidents'));
app.use('/api/alert', require('./routes/alerts'));
app.use('/api/response-team', require('./routes/responseTeams'));
app.use('/api/response-action', require('./routes/responseActions'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Train Accident Monitoring System API' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Test database connection and show status
  const isConnected = await testDBConnection();
  if (isConnected) {
    console.log('✓ MySQL database connection established successfully');
  } else {
    console.log('✗ MySQL database connection failed');
  }
  
  console.log(`Train Accident Monitoring System is now running!`);
});