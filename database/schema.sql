-- Train Table
CREATE TABLE Train (
    Train_ID INT PRIMARY KEY AUTO_INCREMENT,
    Train_Number VARCHAR(20),
    Type VARCHAR(50),
    Capacity INT
);

-- Sensor Table
CREATE TABLE Sensor (
    Sensor_ID INT PRIMARY KEY AUTO_INCREMENT,
    Location VARCHAR(100),
    Train_ID INT,
    FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
);

-- Accident Table
CREATE TABLE Accident (
    Accident_ID INT PRIMARY KEY AUTO_INCREMENT,
    Date_Time DATETIME,
    Location VARCHAR(100),
    Train_ID INT,
    FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
);

-- Alert Table
CREATE TABLE Alert (
    Alert_ID INT PRIMARY KEY AUTO_INCREMENT,
    Alert_Type VARCHAR(50),
    Accident_ID INT,
    FOREIGN KEY (Accident_ID) REFERENCES Accident(Accident_ID)
);

-- Response_Team Table
CREATE TABLE Response_Team (
    Team_ID INT PRIMARY KEY AUTO_INCREMENT,
    Team_Name VARCHAR(100),
    Contact_Number VARCHAR(15),
    Region VARCHAR(50)
);

-- Response_Action Table
CREATE TABLE Response_Action (
    Response_ID INT PRIMARY KEY AUTO_INCREMENT,
    Accident_ID INT,
    Team_ID INT,
    Response_Time DATETIME,
    FOREIGN KEY (Accident_ID) REFERENCES Accident(Accident_ID),
    FOREIGN KEY (Team_ID) REFERENCES Response_Team(Team_ID)
);