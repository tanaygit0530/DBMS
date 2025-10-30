# Train Accident Monitoring System - Final Version

## Overview

This is a full-stack Train Accident Monitoring System built with:
- **Frontend**: React with Bootstrap styling
- **Backend**: Node.js/Express REST API
- **Database**: MySQL

## Key Updates

We've updated the system based on your requirements to simplify both the database schema and UI:

### Database Schema Changes

1. **Simplified Tables**:
   - Train: Train_ID, Train_Number, Type, Capacity
   - Sensor: Sensor_ID, Location, Train_ID
   - Accident: Accident_ID, Date_Time, Location, Train_ID
   - Alert: Alert_ID, Alert_Type, Accident_ID
   - Response_Team: Team_ID, Team_Name, Contact_Number, Region
   - Response_Action: Response_ID, Accident_ID, Team_ID, Response_Time

2. **Removed Unnecessary Fields**:
   - Removed status fields, descriptions, and other complex attributes
   - Simplified to core functionality only

### UI/UX Changes

1. **Response Action Management**:
   - Simplified to show only: Response ID, Accident ID, Response Time, Accident info, Response Team
   - Form now only includes: Accident selection, Team selection, Response Time

2. **All Other Entities**:
   - Updated forms and tables to match the simplified schema
   - Removed unnecessary input fields and table columns

## Project Structure

```
TrainMoni/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components for each entity
│   │   ├── services/       # API service layer (Axios)
│   │   ├── App.js          # Main application with navigation
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── routes/             # API endpoints
│   ├── scripts/            # Utility scripts
│   └── server.js           # Main server file
├── database/               # Database schema
├── .env                    # Environment variables
├── package.json            # Backend dependencies
└── CHANGES_SUMMARY.md      # Summary of changes
```

## API Endpoints

All endpoints are prefixed with `/api`:

| Entity | Endpoint | Methods |
|--------|----------|---------|
| Train | `/api/train` | GET, POST, PUT, DELETE |
| Sensor | `/api/sensor` | GET, POST, PUT, DELETE |
| Accident | `/api/accident` | GET, POST, PUT, DELETE |
| Alert | `/api/alert` | GET, POST, PUT, DELETE |
| Response Team | `/api/response-team` | GET, POST, PUT, DELETE |
| Response Action | `/api/response-action` | GET, POST, PUT, DELETE |

## How to Run the Application

### Prerequisites
1. Node.js (v14 or higher)
2. MySQL Server

### Setup Instructions

1. **Install MySQL Server** (if not already installed):
   ```bash
   # For macOS with Homebrew
   brew install mysql
   brew services start mysql
   
   # For Ubuntu/Debian
   sudo apt install mysql-server
   sudo systemctl start mysql
   ```

2. **Configure Database Credentials**:
   Update the `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username      # Usually 'root'
   DB_PASSWORD=your_mysql_password
   DB_NAME=train_monitoring
   PORT=5000
   ```

3. **Install Dependencies**:
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client && npm install && cd ..
   ```

4. **Set Up Database**:
   ```bash
   npm run setup-db
   ```

5. **Start the Application**:
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start separately
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## Features

### Train Management
- Add, view, edit, and delete trains
- Track train number, type, and capacity

### Sensor Management
- Monitor sensors by location
- Link sensors to specific trains

### Accident Reporting
- Record accident details with date/time and location
- Associate accidents with specific trains

### Alert System
- Create alerts with alert types
- Link alerts to specific accidents

### Response Team Management
- Maintain response team database
- Track team names, contact numbers, and regions

### Response Action Tracking
- Log actions taken by response teams
- Track response times and link to accidents and teams

## Troubleshooting

### Database Connection Issues
1. Ensure MySQL server is running
2. Verify credentials in `.env` file
3. Check that MySQL is listening on port 3306

### API Not Responding
1. Make sure backend server is running on port 5000
2. Check for any error messages in the terminal

### Frontend Issues
1. Ensure both frontend and backend are running
2. Check browser developer tools for any errors

## Customization

The system can be easily extended with additional features:
- Add authentication and user management
- Implement real-time notifications
- Add data visualization and reporting
- Include file uploads for accident images/reports

## Support

For any issues with setup or usage, refer to:
- CHANGES_SUMMARY.md for details on what was modified
- The console output for error messages
- Database/schema.sql for the complete schema