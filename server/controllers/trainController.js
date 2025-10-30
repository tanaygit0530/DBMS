const db = require('../config/db');

// Get all trains
const getAllTrains = async (req, res) => {
  try {
    console.log('Fetching all trains from database...');
    const [trains] = await db.execute('SELECT * FROM Train');
    console.log('Successfully fetched trains:', trains.length);
    res.status(200).json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get train by ID
const getTrainById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching train with ID:', id);
    const [train] = await db.execute('SELECT * FROM Train WHERE Train_ID = ?', [id]);
    
    if (train.length === 0) {
      console.log('Train not found with ID:', id);
      return res.status(404).json({ message: 'Train not found' });
    }
    
    console.log('Successfully fetched train:', train[0]);
    res.status(200).json(train[0]);
  } catch (error) {
    console.error('Error fetching train:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create train
const createTrain = async (req, res) => {
  try {
    const { Train_Number, Type, Capacity } = req.body;
    console.log('Creating train with data:', { Train_Number, Type, Capacity });
    
    // Validate required fields
    if (!Train_Number || !Type || Capacity === undefined) {
      console.log('Validation failed for train creation');
      return res.status(400).json({ error: 'Train_Number, Type, and Capacity are required' });
    }
    
    const [result] = await db.execute(
      'INSERT INTO Train (Train_Number, Type, Capacity) VALUES (?, ?, ?)',
      [Train_Number, Type, Capacity]
    );
    
    console.log('Train created successfully with ID:', result.insertId);
    
    // Return the created train with its ID
    res.status(201).json({
      Train_ID: result.insertId,
      Train_Number,
      Type,
      Capacity
    });
  } catch (error) {
    console.error('Error creating train:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update train
const updateTrain = async (req, res) => {
  try {
    const { id } = req.params;
    const { Train_Number, Type, Capacity } = req.body;
    
    console.log('Updating train ID:', id, 'with data:', { Train_Number, Type, Capacity });
    
    // Validate required fields
    if (!Train_Number || !Type || Capacity === undefined) {
      console.log('Validation failed for train update');
      return res.status(400).json({ error: 'Train_Number, Type, and Capacity are required' });
    }
    
    const [result] = await db.execute(
      'UPDATE Train SET Train_Number = ?, Type = ?, Capacity = ? WHERE Train_ID = ?',
      [Train_Number, Type, Capacity, id]
    );
    
    if (result.affectedRows === 0) {
      console.log('Train not found for update with ID:', id);
      return res.status(404).json({ message: 'Train not found' });
    }
    
    console.log('Train updated successfully, affected rows:', result.affectedRows);
    
    res.status(200).json({
      Train_ID: id,
      Train_Number,
      Type,
      Capacity
    });
  } catch (error) {
    console.error('Error updating train:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete train
const deleteTrain = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting train with ID:', id);
    
    // First, delete all alerts associated with accidents of this train
    console.log('Deleting alerts associated with accidents of train ID:', id);
    await db.execute(`
      DELETE al FROM Alert al
      INNER JOIN Accident a ON al.Accident_ID = a.Accident_ID
      WHERE a.Train_ID = ?
    `, [id]);
    
    // Then, delete all accidents associated with this train
    console.log('Deleting accidents associated with train ID:', id);
    await db.execute('DELETE FROM Accident WHERE Train_ID = ?', [id]);
    
    // Then, delete all sensors associated with this train
    console.log('Deleting sensors associated with train ID:', id);
    await db.execute('DELETE FROM Sensor WHERE Train_ID = ?', [id]);
    
    // Finally, delete the train itself
    const [result] = await db.execute('DELETE FROM Train WHERE Train_ID = ?', [id]);
    
    if (result.affectedRows === 0) {
      console.log('Train not found for deletion with ID:', id);
      return res.status(404).json({ message: 'Train not found' });
    }
    
    console.log('Train and all associated data deleted successfully, affected rows:', result.affectedRows);
    
    res.status(200).json({ message: 'Train and all associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting train:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain
};