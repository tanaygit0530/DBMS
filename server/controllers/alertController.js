const db = require('../config/db');

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const [alerts] = await db.execute('SELECT * FROM Alert');
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get alert by ID
const getAlertById = async (req, res) => {
  try {
    const { id } = req.params;
    const [alert] = await db.execute('SELECT * FROM Alert WHERE Alert_ID = ?', [id]);
    
    if (alert.length === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.status(200).json(alert[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create alert
const createAlert = async (req, res) => {
  try {
    const { Alert_Type, Accident_ID } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Alert (Alert_Type, Accident_ID) VALUES (?, ?)',
      [Alert_Type, Accident_ID]
    );
    
    res.status(201).json({
      Alert_ID: result.insertId,
      Alert_Type,
      Accident_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update alert
const updateAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const { Alert_Type, Accident_ID } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Alert SET Alert_Type = ?, Accident_ID = ? WHERE Alert_ID = ?',
      [Alert_Type, Accident_ID, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.status(200).json({
      Alert_ID: id,
      Alert_Type,
      Accident_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete alert
const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM Alert WHERE Alert_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert
};