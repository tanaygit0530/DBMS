const db = require('../config/db');

// Get all response actions
const getAllResponseActions = async (req, res) => {
  try {
    const [responseActions] = await db.execute('SELECT * FROM Response_Action');
    res.status(200).json(responseActions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get response action by ID
const getResponseActionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [responseAction] = await db.execute('SELECT * FROM Response_Action WHERE Response_ID = ?', [id]);
    
    if (responseAction.length === 0) {
      return res.status(404).json({ message: 'Response action not found' });
    }
    
    res.status(200).json(responseAction[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create response action
const createResponseAction = async (req, res) => {
  try {
    const { Accident_ID, Team_ID, Response_Time } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Response_Action (Accident_ID, Team_ID, Response_Time) VALUES (?, ?, ?)',
      [Accident_ID, Team_ID, Response_Time]
    );
    
    res.status(201).json({
      Response_ID: result.insertId,
      Accident_ID,
      Team_ID,
      Response_Time
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update response action
const updateResponseAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { Accident_ID, Team_ID, Response_Time } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Response_Action SET Accident_ID = ?, Team_ID = ?, Response_Time = ? WHERE Response_ID = ?',
      [Accident_ID, Team_ID, Response_Time, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Response action not found' });
    }
    
    res.status(200).json({
      Response_ID: id,
      Accident_ID,
      Team_ID,
      Response_Time
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete response action
const deleteResponseAction = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM Response_Action WHERE Response_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Response action not found' });
    }
    
    res.status(200).json({ message: 'Response action deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllResponseActions,
  getResponseActionById,
  createResponseAction,
  updateResponseAction,
  deleteResponseAction
};