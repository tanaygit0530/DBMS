import React, { useState, useEffect } from 'react';
import { getAlerts, getAccidents, createAlert, updateAlert, deleteAlert } from '../services/api';
import AlertForm from './AlertForm';
import AlertTable from './AlertTable';

const AlertManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  useEffect(() => {
    fetchAlertsAndAccidents();
  }, []);

  const fetchAlertsAndAccidents = async () => {
    try {
      setLoading(true);
      const [alertsResponse, accidentsResponse] = await Promise.all([
        getAlerts(),
        getAccidents()
      ]);
      setAlerts(alertsResponse.data);
      setAccidents(accidentsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch alerts and accidents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (alertData) => {
    try {
      await createAlert(alertData);
      setShowForm(false);
      fetchAlertsAndAccidents();
    } catch (err) {
      setError('Failed to create alert');
      console.error(err);
    }
  };

  const handleUpdate = async (alertData) => {
    try {
      await updateAlert(editingAlert.Alert_ID, alertData);
      setEditingAlert(null);
      setShowForm(false);
      fetchAlertsAndAccidents();
    } catch (err) {
      setError('Failed to update alert');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        await deleteAlert(id);
        fetchAlertsAndAccidents();
      } catch (err) {
        setError('Failed to delete alert');
        console.error(err);
      }
    }
  };

  const handleSubmit = (alertData) => {
    if (editingAlert) {
      handleUpdate(alertData);
    } else {
      handleCreate(alertData);
    }
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAlert(null);
  };

  if (loading) return <div>Loading alerts and accidents...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Alert Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Alert'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <AlertForm 
            alert={editingAlert}
            accidents={accidents}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && alerts.length > 0 && (
        <AlertTable 
          alerts={alerts}
          accidents={accidents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && alerts.length === 0 && (
        <div className="alert alert-info">
          No alerts found. Click "Create Alert" to create one.
        </div>
      )}
    </div>
  );
};

export default AlertManagement;