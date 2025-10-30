import React, { useState, useEffect } from 'react';

const ResponseActionForm = ({ action, accidents, teams, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Accident_ID: '',
    Team_ID: '',
    Response_Time: ''
  });

  useEffect(() => {
    if (action) {
      setFormData({
        ...action,
        Response_Time: action.Response_Time ? action.Response_Time.substring(0, 16) : '' // Format for datetime-local input
      });
    }
  }, [action]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      Response_Time: formData.Response_Time
    };
    onSubmit(submitData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{action ? 'Edit Response Action' : 'Add New Response Action'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Accident:</label>
            <select
              name="Accident_ID"
              value={formData.Accident_ID}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select an accident</option>
              {accidents.map(accident => (
                <option key={accident.Accident_ID} value={accident.Accident_ID}>
                  Accident #{accident.Accident_ID} - {accident.Location}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Response Team:</label>
            <select
              name="Team_ID"
              value={formData.Team_ID}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select a team</option>
              {teams.map(team => (
                <option key={team.Team_ID} value={team.Team_ID}>
                  {team.Team_Name} - {team.Region}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Response Time:</label>
            <input
              type="datetime-local"
              name="Response_Time"
              value={formData.Response_Time}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {action ? 'Update' : 'Create'}
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

export default ResponseActionForm;