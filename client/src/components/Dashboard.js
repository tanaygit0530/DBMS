import React, { useState, useEffect } from 'react';
import { getTrains, getSensors, getAlerts, deleteTrain, deleteSensor, deleteAlert } from '../services/api';
import TrainTable from './TrainTable';
import SensorTable from './SensorTable';
import AlertTable from './AlertTable';

const Dashboard = () => {
  const [trains, setTrains] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data in parallel
      const [trainsResponse, sensorsResponse, alertsResponse] = await Promise.all([
        getTrains(),
        getSensors(),
        getAlerts()
      ]);
      
      setTrains(trainsResponse.data);
      setSensors(sensorsResponse.data);
      setAlerts(alertsResponse.data);
    } catch (err) {
      setError('Failed to fetch data: ' + (err.response?.data?.error || err.message));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrain = async (id) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        await deleteTrain(id);
        fetchData(); // Refresh data after deletion
      } catch (err) {
        setError('Failed to delete train: ' + (err.response?.data?.error || err.message));
        console.error('Error deleting train:', err);
      }
    }
  };

  const handleDeleteSensor = async (id) => {
    if (window.confirm('Are you sure you want to delete this sensor?')) {
      try {
        await deleteSensor(id);
        fetchData(); // Refresh data after deletion
      } catch (err) {
        setError('Failed to delete sensor: ' + (err.response?.data?.error || err.message));
        console.error('Error deleting sensor:', err);
      }
    }
  };

  const handleDeleteAlert = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await deleteAlert(id);
        fetchData(); // Refresh data after deletion
      } catch (err) {
        setError('Failed to delete alert: ' + (err.response?.data?.error || err.message));
        console.error('Error deleting alert:', err);
      }
    }
  };

  const refreshData = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" onClick={() => setError(null)}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="dashboard-title">Train Monitoring Dashboard</h1>
          <button className="btn btn-primary" onClick={refreshData}>
            <i className="fas fa-sync-alt"></i> Refresh Data
          </button>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Total Trains</h5>
                <h2 className="card-text">{trains.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Active Sensors</h5>
                <h2 className="card-text">{sensors.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <h5 className="card-title">Active Alerts</h5>
                <h2 className="card-text">{alerts.length}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Trains</h3>
              </div>
              <div className="card-body">
                {trains.length > 0 ? (
                  <TrainTable 
                    trains={trains} 
                    onDelete={handleDeleteTrain}
                  />
                ) : (
                  <p className="text-muted">No trains found.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Sensors</h3>
              </div>
              <div className="card-body">
                {sensors.length > 0 ? (
                  <SensorTable 
                    sensors={sensors} 
                    onDelete={handleDeleteSensor}
                  />
                ) : (
                  <p className="text-muted">No sensors found.</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Alerts</h3>
              </div>
              <div className="card-body">
                {alerts.length > 0 ? (
                  <AlertTable 
                    alerts={alerts} 
                    onDelete={handleDeleteAlert}
                  />
                ) : (
                  <p className="text-muted">No alerts found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;