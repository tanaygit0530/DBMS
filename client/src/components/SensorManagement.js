import React, { useState, useEffect } from 'react';
import { getSensors, getTrains, createSensor, updateSensor, deleteSensor } from '../services/api';
import SensorForm from './SensorForm';
import SensorTable from './SensorTable';

const SensorManagement = () => {
  const [sensors, setSensors] = useState([]);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);

  useEffect(() => {
    fetchSensorsAndTrains();
  }, []);

  const fetchSensorsAndTrains = async () => {
    try {
      setLoading(true);
      const [sensorsResponse, trainsResponse] = await Promise.all([
        getSensors(),
        getTrains()
      ]);
      setSensors(sensorsResponse.data);
      setTrains(trainsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sensors and trains');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (sensorData) => {
    try {
      await createSensor(sensorData);
      setShowForm(false);
      fetchSensorsAndTrains();
    } catch (err) {
      setError('Failed to create sensor');
      console.error(err);
    }
  };

  const handleUpdate = async (sensorData) => {
    try {
      await updateSensor(editingSensor.Sensor_ID, sensorData);
      setEditingSensor(null);
      setShowForm(false);
      fetchSensorsAndTrains();
    } catch (err) {
      setError('Failed to update sensor');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sensor?')) {
      try {
        await deleteSensor(id);
        fetchSensorsAndTrains();
      } catch (err) {
        setError('Failed to delete sensor');
        console.error(err);
      }
    }
  };

  const handleSubmit = (sensorData) => {
    if (editingSensor) {
      handleUpdate(sensorData);
    } else {
      handleCreate(sensorData);
    }
  };

  const handleEdit = (sensor) => {
    setEditingSensor(sensor);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSensor(null);
  };

  if (loading) return <div>Loading sensors and trains...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Sensor Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Sensor'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <SensorForm 
            sensor={editingSensor}
            trains={trains}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && sensors.length > 0 && (
        <SensorTable 
          sensors={sensors}
          trains={trains}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && sensors.length === 0 && (
        <div className="alert alert-info">
          No sensors found. Click "Add Sensor" to create one.
        </div>
      )}
    </div>
  );
};

export default SensorManagement;