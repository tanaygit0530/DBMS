# Train Accident Monitoring System - Schema and UI Updates

## Database Schema Changes

The database schema has been updated to match your requirements with the following tables:

1. **Train Table**
   - Train_ID (Primary Key, Auto Increment)
   - Train_Number (VARCHAR)
   - Type (VARCHAR)
   - Capacity (INT)

2. **Sensor Table**
   - Sensor_ID (Primary Key, Auto Increment)
   - Location (VARCHAR)
   - Train_ID (Foreign Key referencing Train)

3. **Accident Table**
   - Accident_ID (Primary Key, Auto Increment)
   - Date_Time (DATETIME)
   - Location (VARCHAR)
   - Train_ID (Foreign Key referencing Train)

4. **Alert Table**
   - Alert_ID (Primary Key, Auto Increment)
   - Alert_Type (VARCHAR)
   - Accident_ID (Foreign Key referencing Accident)

5. **Response_Team Table**
   - Team_ID (Primary Key, Auto Increment)
   - Team_Name (VARCHAR)
   - Contact_Number (VARCHAR)
   - Region (VARCHAR)

6. **Response_Action Table**
   - Response_ID (Primary Key, Auto Increment)
   - Accident_ID (Foreign Key referencing Accident)
   - Team_ID (Foreign Key referencing Response_Team)
   - Response_Time (DATETIME)

## UI Changes

The frontend components have been updated to match the simplified requirements:

### Response Action Management
- Only displays the following fields:
  - Response ID
  - Accident ID
  - Response Time
  - Accident information
  - Response Team information
- Form only includes:
  - Accident selection dropdown
  - Response Team selection dropdown
  - Response Time datetime picker

### Other Entities
All other entities have been simplified to match the new schema:
- Removed unnecessary fields
- Updated field names to match the database schema
- Simplified forms and tables to show only relevant information

## API Endpoints

Updated API endpoints to match the new naming convention:
- `/api/train` for Train operations
- `/api/sensor` for Sensor operations
- `/api/accident` for Accident operations
- `/api/alert` for Alert operations
- `/api/response-team` for Response Team operations
- `/api/response-action` for Response Action operations

## Backend Changes

All backend controllers have been updated to:
- Match the new database schema
- Use the correct table and column names
- Handle the simplified data structure

## Next Steps

To get the system running with the updated schema:

1. Update your `.env` file with correct MySQL credentials
2. Run `npm run setup-db` to create the new database structure
3. Start the backend with `npm run server`
4. Start the frontend with `npm run client` or `npm run dev`

The system now matches your requirements with a simplified schema and UI focused on the core functionality.