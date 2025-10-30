# Train Accident Monitoring System - Setup Instructions

## System Overview

You have successfully created a full-stack Train Accident Monitoring System with:

- **Frontend**: React application with Bootstrap styling
- **Backend**: Node.js/Express REST API
- **Database**: MySQL with 6 tables (trains, sensors, accidents, alerts, response_teams, response_actions)

## Current Status

The application structure is complete, but the database connection needs to be configured.

## Next Steps to Get the System Running

### 1. Install and Start MySQL Server

**For macOS:**
```bash
# Install MySQL (if not already installed)
brew install mysql

# Start MySQL service
brew services start mysql

# Secure MySQL installation (set root password)
mysql_secure_installation
```

**For Windows:**
1. Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/
2. Install MySQL Server
3. Start MySQL service from Windows Services
4. Run MySQL Shell and set root password

**For Linux (Ubuntu/Debian):**
```bash
# Install MySQL
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Secure MySQL installation
sudo mysql_secure_installation
```

### 2. Update Database Credentials

Edit the `.env` file in the project root directory:

```
DB_HOST=localhost
DB_USER=your_mysql_username      # Usually 'root'
DB_PASSWORD=your_mysql_password  # The password you set during installation
DB_NAME=train_monitoring
PORT=5000
```

### 3. Create Database and Tables

You have two options:

**Option A: Use the automated setup script (recommended)**
```bash
npm run setup-db
```

**Option B: Manual setup with MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Create the database:
   ```sql
   CREATE DATABASE train_monitoring;
   ```
4. Execute the schema from `/database/schema.sql`

### 4. Start the Application

**Start backend server:**
```bash
npm run server
```

**In a new terminal, start frontend:**
```bash
npm run client
```

**Or start both simultaneously:**
```bash
npm run dev
```

## Testing Database Connection

You can check if your MySQL server is properly configured:

```bash
npm run check-mysql
```

This script will verify:
- MySQL server connectivity
- Database existence
- Common connection issues

## Testing the Application

1. Visit http://localhost:3000 for the React frontend
2. The backend API runs on http://localhost:5000
3. Health check endpoint: http://localhost:5000/health

## API Endpoints

All endpoints are prefixed with `/api`:

- **Trains**: `/api/trains`
- **Sensors**: `/api/sensors`
- **Accidents**: `/api/accidents`
- **Alerts**: `/api/alerts`
- **Response Teams**: `/api/response-teams`
- **Response Actions**: `/api/response-actions`

Each endpoint supports full CRUD operations (GET, POST, PUT, DELETE).

## Troubleshooting

If you encounter issues:

1. **Database Connection Refused**:
   - Ensure MySQL server is running
   - Verify credentials in `.env` file
   - Check that MySQL is listening on port 3306

2. **Access Denied**:
   - Verify username and password
   - Ensure the user has proper privileges

3. **CORS Errors**:
   - Both frontend and backend should be running
   - CORS is already enabled in the backend

4. **API Calls Not Working**:
   - Check that backend is running on port 5000
   - Verify endpoints in browser developer tools

## Project Structure

```
TrainMoni/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components for each entity
│       ├── services/       # API service (Axios)
│       ├── App.js          # Main app with navigation
│       └── index.js        # Entry point
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── server.js           # Entry point
├── database/               # Database schema
├── .env                    # Environment variables
├── package.json            # Project dependencies
└── README.md               # Documentation
```

## Features Implemented

1. **Train Management**:
   - Add, view, edit, and delete trains
   - Track train number, name, capacity, and status

2. **Sensor Management**:
   - Monitor sensors on trains
   - Track sensor type, location, and status

3. **Accident Reporting**:
   - Report train accidents with details
   - Track location, time, severity, and description

4. **Alert System**:
   - Create alerts for accidents
   - Manage alert levels and recipients

5. **Response Team Management**:
   - Maintain response team database
   - Track team leaders and specializations

6. **Response Action Tracking**:
   - Log actions taken by response teams
   - Track action status and descriptions

The system is ready for deployment once the database is properly configured!