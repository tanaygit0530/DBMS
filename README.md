# Train Accident Monitoring System

A full-stack application for monitoring train accidents with React frontend, Node.js/Express backend, and MySQL database.

## Features

- Train management (CRUD operations)
- Sensor management (CRUD operations)
- Accident reporting (CRUD operations)
- Alert system (CRUD operations)
- Response team management (CRUD operations)
- Response action tracking (CRUD operations)

## Tech Stack

- **Frontend**: React, Axios, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MySQL
- **API**: RESTful APIs

## Setup Instructions

### Prerequisites

1. Node.js (v14 or higher)
2. MySQL Server (Make sure it's installed and running)
3. MySQL Workbench

### MySQL Server Setup

1. **Install MySQL Server**:
   - For Windows: Download MySQL Community Server from the official website
   - For macOS: Use Homebrew (`brew install mysql`) or download from the official website
   - For Linux: Use your package manager (e.g., `sudo apt install mysql-server`)

2. **Start MySQL Server**:
   - Windows: Start the MySQL service from Services
   - macOS: Run `brew services start mysql` or `sudo mysql.server start`
   - Linux: Run `sudo systemctl start mysql`

3. **Set up MySQL root password** (if not already done):
   - Run `mysql_secure_installation` and follow the prompts
   - Or connect to MySQL with `mysql -u root -p` and set the password with:
     ```sql
     ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
     ```

### Database Setup with MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Create a new schema named `train_monitoring`:
   ```sql
   CREATE DATABASE train_monitoring;
   ```
4. Update your `.env` file with the correct database credentials
5. Run the database setup script:
   ```bash
   npm run setup-db
   ```
   
   Or alternatively, you can manually execute the schema.sql file located in the `database` folder:
   - Open the schema.sql file in MySQL Workbench
   - Execute the entire script

### Environment Configuration

1. Create a `.env` file in the root directory with the following content:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=train_monitoring
   PORT=5000
   ```
2. Replace `your_mysql_username` and `your_mysql_password` with your actual MySQL credentials
3. If you're using default MySQL settings, the username is typically `root` and you may have set a password during installation

### Installation

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

3. Set up the database:
   ```bash
   npm run setup-db
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   npm run client
   ```

3. Or start both simultaneously:
   ```bash
   npm run dev
   ```

## API Endpoints

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/:id` - Get a specific train
- `POST /api/trains` - Create a new train
- `PUT /api/trains/:id` - Update a train
- `DELETE /api/trains/:id` - Delete a train

### Sensors
- `GET /api/sensors` - Get all sensors
- `GET /api/sensors/:id` - Get a specific sensor
- `POST /api/sensors` - Create a new sensor
- `PUT /api/sensors/:id` - Update a sensor
- `DELETE /api/sensors/:id` - Delete a sensor

### Accidents
- `GET /api/accidents` - Get all accidents
- `GET /api/accidents/:id` - Get a specific accident
- `POST /api/accidents` - Report a new accident
- `PUT /api/accidents/:id` - Update an accident
- `DELETE /api/accidents/:id` - Delete an accident

### Alerts
- `GET /api/alerts` - Get all alerts
- `GET /api/alerts/:id` - Get a specific alert
- `POST /api/alerts` - Create a new alert
- `PUT /api/alerts/:id` - Update an alert
- `DELETE /api/alerts/:id` - Delete an alert

### Response Teams
- `GET /api/response-teams` - Get all response teams
- `GET /api/response-teams/:id` - Get a specific response team
- `POST /api/response-teams` - Create a new response team
- `PUT /api/response-teams/:id` - Update a response team
- `DELETE /api/response-teams/:id` - Delete a response team

### Response Actions
- `GET /api/response-actions` - Get all response actions
- `GET /api/response-actions/:id` - Get a specific response action
- `POST /api/response-actions` - Create a new response action
- `PUT /api/response-actions/:id` - Update a response action
- `DELETE /api/response-actions/:id` - Delete a response action

## Troubleshooting

### Database Connection Issues

1. **Error: ECONNREFUSED**
   - Make sure MySQL server is running
   - Check that the credentials in `.env` are correct
   - Verify that MySQL is listening on the default port (3306)

2. **Access Denied**
   - Verify the username and password in `.env`
   - Make sure the user has privileges to create databases and tables

3. **Database Doesn't Exist**
   - Run `npm run setup-db` to create the database and tables

### Frontend Issues

1. **CORS Errors**
   - The backend should already have CORS enabled
   - Make sure both frontend and backend are running

2. **API Calls Not Working**
   - Check that the backend server is running on port 5000
   - Verify the API endpoints in the browser's developer tools

## Project Structure

```
TrainMoni/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── services/       # API services
│       ├── App.js
│       └── index.js
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── server.js           # Entry point
├── database/               # Database schema
├── .env                    # Environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```# DBMS
