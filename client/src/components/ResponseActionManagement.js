import React, { useState, useEffect } from 'react';
import { getResponseActions, getAccidents, getResponseTeams, createResponseAction, updateResponseAction, deleteResponseAction } from '../services/api';
import ResponseActionForm from './ResponseActionForm';
import ResponseActionTable from './ResponseActionTable';

const ResponseActionManagement = () => {
  const [actions, setActions] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);

  useEffect(() => {
    fetchResponseActionsAccidentsAndTeams();
  }, []);

  const fetchResponseActionsAccidentsAndTeams = async () => {
    try {
      setLoading(true);
      const [actionsResponse, accidentsResponse, teamsResponse] = await Promise.all([
        getResponseActions(),
        getAccidents(),
        getResponseTeams()
      ]);
      setActions(actionsResponse.data);
      setAccidents(accidentsResponse.data);
      setTeams(teamsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch response actions, accidents, and teams');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (actionData) => {
    try {
      await createResponseAction(actionData);
      setShowForm(false);
      fetchResponseActionsAccidentsAndTeams();
    } catch (err) {
      setError('Failed to create response action');
      console.error(err);
    }
  };

  const handleUpdate = async (actionData) => {
    try {
      await updateResponseAction(editingAction.Response_ID, actionData);
      setEditingAction(null);
      setShowForm(false);
      fetchResponseActionsAccidentsAndTeams();
    } catch (err) {
      setError('Failed to update response action');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this response action?')) {
      try {
        await deleteResponseAction(id);
        fetchResponseActionsAccidentsAndTeams();
      } catch (err) {
        setError('Failed to delete response action');
        console.error(err);
      }
    }
  };

  const handleSubmit = (actionData) => {
    if (editingAction) {
      handleUpdate(actionData);
    } else {
      handleCreate(actionData);
    }
  };

  const handleEdit = (action) => {
    setEditingAction(action);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAction(null);
  };

  if (loading) return <div>Loading response actions, accidents, and teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Response Action Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Action'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <ResponseActionForm 
            action={editingAction}
            accidents={accidents}
            teams={teams}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && actions.length > 0 && (
        <ResponseActionTable 
          actions={actions}
          accidents={accidents}
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && actions.length === 0 && (
        <div className="alert alert-info">
          No response actions found. Click "Add Action" to create one.
        </div>
      )}
    </div>
  );
};

export default ResponseActionManagement;