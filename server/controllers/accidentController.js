const db = require('../config/db');

// Get all accidents
const getAllAccidents = async (req, res) => {
  try {
    const [accidents] = await db.execute('SELECT * FROM Accident');
    res.status(200).json(accidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get accident by ID
const getAccidentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [accident] = await db.execute('SELECT * FROM Accident WHERE Accident_ID = ?', [id]);
    
    if (accident.length === 0) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    
    res.status(200).json(accident[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create accident
const createAccident = async (req, res) => {
  try {
    const { Date_Time, Location, Train_ID } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Accident (Date_Time, Location, Train_ID) VALUES (?, ?, ?)',
      [Date_Time, Location, Train_ID]
    );
    
    res.status(201).json({
      Accident_ID: result.insertId,
      Date_Time,
      Location,
      Train_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update accident
const updateAccident = async (req, res) => {
  try {
    const { id } = req.params;
    const { Date_Time, Location, Train_ID } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Accident SET Date_Time = ?, Location = ?, Train_ID = ? WHERE Accident_ID = ?',
      [Date_Time, Location, Train_ID, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    
    res.status(200).json({
      Accident_ID: id,
      Date_Time,
      Location,
      Train_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete accident
const deleteAccident = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM Accident WHERE Accident_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Accident not found' });
    }
    
    res.status(200).json({ message: 'Accident deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccidents,
  getAccidentById,
  createAccident,
  updateAccident,
  deleteAccident
};