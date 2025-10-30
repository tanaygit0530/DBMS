const db = require('../config/db');

// Get all sensors
const getAllSensors = async (req, res) => {
  try {
    const [sensors] = await db.execute('SELECT * FROM Sensor');
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sensor by ID
const getSensorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [sensor] = await db.execute('SELECT * FROM Sensor WHERE Sensor_ID = ?', [id]);
    
    if (sensor.length === 0) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    
    res.status(200).json(sensor[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create sensor
const createSensor = async (req, res) => {
  try {
    const { Location, Train_ID } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Sensor (Location, Train_ID) VALUES (?, ?)',
      [Location, Train_ID]
    );
    
    res.status(201).json({
      Sensor_ID: result.insertId,
      Location,
      Train_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update sensor
const updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { Location, Train_ID } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Sensor SET Location = ?, Train_ID = ? WHERE Sensor_ID = ?',
      [Location, Train_ID, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    
    res.status(200).json({
      Sensor_ID: id,
      Location,
      Train_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete sensor
const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM Sensor WHERE Sensor_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    
    res.status(200).json({ message: 'Sensor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor
};