import React, { useState, useEffect } from 'react';

const SensorForm = ({ sensor, trains, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Location: '',
    Train_ID: ''
  });

  useEffect(() => {
    if (sensor) {
      setFormData(sensor);
    }
  }, [sensor]);

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
        <h3>{sensor ? 'Edit Sensor' : 'Add New Sensor'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Train:</label>
            <select
              name="Train_ID"
              value={formData.Train_ID}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select a train</option>
              {trains.map(train => (
                <option key={train.Train_ID} value={train.Train_ID}>
                  {train.Train_Number} - {train.Type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {sensor ? 'Update' : 'Create'}
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

export default SensorForm;