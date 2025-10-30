import React, { useState, useEffect } from 'react';
import { getAccidents, getTrains, createAccident, updateAccident, deleteAccident } from '../services/api';
import AccidentForm from './AccidentForm';
import AccidentTable from './AccidentTable';

const AccidentManagement = () => {
  const [accidents, setAccidents] = useState([]);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAccident, setEditingAccident] = useState(null);

  useEffect(() => {
    fetchAccidentsAndTrains();
  }, []);

  const fetchAccidentsAndTrains = async () => {
    try {
      setLoading(true);
      const [accidentsResponse, trainsResponse] = await Promise.all([
        getAccidents(),
        getTrains()
      ]);
      setAccidents(accidentsResponse.data);
      setTrains(trainsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch accidents and trains');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (accidentData) => {
    try {
      await createAccident(accidentData);
      setShowForm(false);
      fetchAccidentsAndTrains();
    } catch (err) {
      setError('Failed to report accident');
      console.error(err);
    }
  };

  const handleUpdate = async (accidentData) => {
    try {
      await updateAccident(editingAccident.Accident_ID, accidentData);
      setEditingAccident(null);
      setShowForm(false);
      fetchAccidentsAndTrains();
    } catch (err) {
      setError('Failed to update accident');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this accident report?')) {
      try {
        await deleteAccident(id);
        fetchAccidentsAndTrains();
      } catch (err) {
        setError('Failed to delete accident');
        console.error(err);
      }
    }
  };

  const handleSubmit = (accidentData) => {
    if (editingAccident) {
      handleUpdate(accidentData);
    } else {
      handleCreate(accidentData);
    }
  };

  const handleEdit = (accident) => {
    setEditingAccident(accident);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAccident(null);
  };

  if (loading) return <div>Loading accidents and trains...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Accident Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Report Accident'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <AccidentForm 
            accident={editingAccident}
            trains={trains}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && accidents.length > 0 && (
        <AccidentTable 
          accidents={accidents}
          trains={trains}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && accidents.length === 0 && (
        <div className="alert alert-info">
          No accidents reported. Click "Report Accident" to create one.
        </div>
      )}
    </div>
  );
};

export default AccidentManagement;