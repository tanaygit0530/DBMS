import React, { useState, useEffect } from 'react';

const ResponseTeamForm = ({ team, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Team_Name: '',
    Contact_Number: '',
    Region: ''
  });

  useEffect(() => {
    if (team) {
      setFormData(team);
    }
  }, [team]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{team ? 'Edit Response Team' : 'Add New Response Team'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Team Name:</label>
            <input
              type="text"
              name="Team_Name"
              value={formData.Team_Name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="text"
              name="Contact_Number"
              value={formData.Contact_Number}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Region:</label>
            <input
              type="text"
              name="Region"
              value={formData.Region}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {team ? 'Update' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponseTeamForm;