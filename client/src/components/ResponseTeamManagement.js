import React, { useState, useEffect } from 'react';
import { getResponseTeams, createResponseTeam, updateResponseTeam, deleteResponseTeam } from '../services/api';
import ResponseTeamForm from './ResponseTeamForm';
import ResponseTeamTable from './ResponseTeamTable';

const ResponseTeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    fetchResponseTeams();
  }, []);

  const fetchResponseTeams = async () => {
    try {
      setLoading(true);
      const response = await getResponseTeams();
      setTeams(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch response teams');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (teamData) => {
    try {
      await createResponseTeam(teamData);
      setShowForm(false);
      fetchResponseTeams();
    } catch (err) {
      setError('Failed to create response team');
      console.error(err);
    }
  };

  const handleUpdate = async (teamData) => {
    try {
      await updateResponseTeam(editingTeam.Team_ID, teamData);
      setEditingTeam(null);
      setShowForm(false);
      fetchResponseTeams();
    } catch (err) {
      setError('Failed to update response team');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this response team?')) {
      try {
        await deleteResponseTeam(id);
        fetchResponseTeams();
      } catch (err) {
        setError('Failed to delete response team');
        console.error(err);
      }
    }
  };

  const handleSubmit = (teamData) => {
    if (editingTeam) {
      handleUpdate(teamData);
    } else {
      handleCreate(teamData);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTeam(null);
  };

  if (loading) return <div>Loading response teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Response Team Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Team'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <ResponseTeamForm 
            team={editingTeam} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && teams.length > 0 && (
        <ResponseTeamTable 
          teams={teams}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!showForm && teams.length === 0 && (
        <div className="alert alert-info">
          No response teams found. Click "Add Team" to create one.
        </div>
      )}
    </div>
  );
};

export default ResponseTeamManagement;