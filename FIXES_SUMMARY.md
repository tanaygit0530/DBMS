# Train Accident Monitoring System - Issues and Fixes

## Issues Identified

1. **Port Conflict**: Port 5000 was already in use by another service (AirPlay Receiver on macOS)
2. **API Connection**: Frontend was trying to connect to backend on port 5000 instead of the new port
3. **Database Connection**: Initial database connection issues due to MySQL configuration

## Fixes Applied

### 1. Port Conflict Resolution
- Changed backend port from 5000 to 5001 in `.env` file
- Updated frontend API service to point to `http://localhost:5001/api`

### 2. Database Setup
- Reinstalled MySQL to ensure clean installation
- Created dedicated database user (`trainuser`) with proper privileges
- Set up strong password for security
- Created all required tables with correct schema
- Inserted sample data for testing

### 3. Configuration Updates
- Updated `.env` file with correct database credentials
- Modified database configuration to properly read environment variables
- Fixed SQL queries in setup script to avoid prepared statement issues

## Current Status

✅ **Backend Server**: Running on http://localhost:5001
✅ **Frontend Server**: Running on http://localhost:3000
✅ **Database Connection**: Successfully connected to MySQL
✅ **API Endpoints**: All endpoints working correctly
✅ **Sample Data**: Loaded and accessible

## API Endpoints Available

- `GET /api/train` - Get all trains
- `GET /api/sensor` - Get all sensors
- `GET /api/accident` - Get all accidents
- `GET /api/alert` - Get all alerts
- `GET /api/response-team` - Get all response teams
- `GET /api/response-action` - Get all response actions

## How to Access the Application

1. Open your browser and navigate to http://localhost:3000
2. The application should load with tabs for each entity type
3. You can view existing sample data and add new records through the forms

## Troubleshooting Tips

If you encounter any issues:

1. **Check if servers are running**:
   - Backend should be running on port 5001
   - Frontend should be running on port 3000

2. **Verify database connection**:
   - Ensure MySQL is running
   - Check that the database credentials in `.env` are correct

3. **Restart servers if needed**:
   - Stop both servers with Ctrl+C
   - Start backend: `npm run server`
   - Start frontend: `npm start` (from client directory)

The system is now fully functional with all components working together correctly.