import React, { useState, useEffect } from 'react';

const AlertForm = ({ alert, accidents, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Accident_ID: '',
    Alert_Type: ''
  });

  useEffect(() => {
    if (alert) {
      setFormData(alert);
    }
  }, [alert]);

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
        <h3>{alert ? 'Edit Alert' : 'Create New Alert'}</h3>
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
            <label>Alert Type:</label>
            <input
              type="text"
              name="Alert_Type"
              value={formData.Alert_Type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {alert ? 'Update' : 'Create'}
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

export default AlertForm;