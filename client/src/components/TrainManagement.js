import React, { useState, useEffect } from 'react';
import { getTrains, createTrain, updateTrain, deleteTrain } from '../services/api';
import TrainForm from './TrainForm';
import TrainTable from './TrainTable';

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTrain, setEditingTrain] = useState(null);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      console.log('Fetching trains...');
      setLoading(true);
      setError(null);
      const response = await getTrains();
      setTrains(response.data);
      console.log('Trains fetched successfully:', response.data.length);
    } catch (err) {
      const errorMessage = 'Failed to fetch trains: ' + (err.response?.data?.error || err.message);
      setError(errorMessage);
      console.error('Error fetching trains:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (trainData) => {
    try {
      console.log('Creating train:', trainData);
      setError(null);
      const response = await createTrain(trainData);
      console.log('Train created successfully:', response.data);
      setSuccess('Train created successfully!');
      setShowForm(false);
      setTimeout(() => setSuccess(null), 3000);
      fetchTrains();
    } catch (err) {
      const errorMessage = 'Failed to create train: ' + (err.response?.data?.error || err.message);
      setError(errorMessage);
      console.error('Error creating train:', err);
    }
  };

  const handleUpdate = async (trainData) => {
    try {
      console.log('Updating train:', editingTrain.Train_ID, trainData);
      setError(null);
      const response = await updateTrain(editingTrain.Train_ID, trainData);
      console.log('Train updated successfully:', response.data);
      setSuccess('Train updated successfully!');
      setEditingTrain(null);
      setShowForm(false);
      setTimeout(() => setSuccess(null), 3000);
      fetchTrains();
    } catch (err) {
      const errorMessage = 'Failed to update train: ' + (err.response?.data?.error || err.message);
      setError(errorMessage);
      console.error('Error updating train:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        console.log('Deleting train with ID:', id);
        setError(null);
        await deleteTrain(id);
        console.log('Train deleted successfully');
        setSuccess('Train deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
        fetchTrains();
      } catch (err) {
        const errorMessage = 'Failed to delete train: ' + (err.response?.data?.error || err.message);
        setError(errorMessage);
        console.error('Error deleting train:', err);
      }
    }
  };

  const handleSubmit = (trainData) => {
    if (editingTrain) {
      handleUpdate(trainData);
    } else {
      handleCreate(trainData);
    }
  };

  const handleEdit = (train) => {
    setEditingTrain(train);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTrain(null);
    setError(null);
  };

  if (loading) return <div className="container mt-4"><div>Loading trains...</div></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Train Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Train'}
        </button>
      </div>

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="close" onClick={() => setSuccess(null)}>
            <span>&times;</span>
          </button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" onClick={() => setError(null)}>
            <span>&times;</span>
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-4">
          <TrainForm 
            train={editingTrain} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && trains.length > 0 && (
        <TrainTable 
          trains={trains}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && trains.length === 0 && (
        <div className="alert alert-info">
          No trains found. Click "Add Train" to create one.
        </div>
      )}
    </div>
  );
};

export default TrainManagement;