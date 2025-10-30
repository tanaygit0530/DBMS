const db = require('../config/db');

// Get all response teams
const getAllResponseTeams = async (req, res) => {
  try {
    const [responseTeams] = await db.execute('SELECT * FROM Response_Team');
    res.status(200).json(responseTeams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get response team by ID
const getResponseTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const [responseTeam] = await db.execute('SELECT * FROM Response_Team WHERE Team_ID = ?', [id]);
    
    if (responseTeam.length === 0) {
      return res.status(404).json({ message: 'Response team not found' });
    }
    
    res.status(200).json(responseTeam[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create response team
const createResponseTeam = async (req, res) => {
  try {
    const { Team_Name, Contact_Number, Region } = req.body;
    const [result] = await db.execute(
      'INSERT INTO Response_Team (Team_Name, Contact_Number, Region) VALUES (?, ?, ?)',
      [Team_Name, Contact_Number, Region]
    );
    
    res.status(201).json({
      Team_ID: result.insertId,
      Team_Name,
      Contact_Number,
      Region
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update response team
const updateResponseTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { Team_Name, Contact_Number, Region } = req.body;
    
    const [result] = await db.execute(
      'UPDATE Response_Team SET Team_Name = ?, Contact_Number = ?, Region = ? WHERE Team_ID = ?',
      [Team_Name, Contact_Number, Region, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Response team not found' });
    }
    
    res.status(200).json({
      Team_ID: id,
      Team_Name,
      Contact_Number,
      Region
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete response team
const deleteResponseTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM Response_Team WHERE Team_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Response team not found' });
    }
    
    res.status(200).json({ message: 'Response team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllResponseTeams,
  getResponseTeamById,
  createResponseTeam,
  updateResponseTeam,
  deleteResponseTeam
};