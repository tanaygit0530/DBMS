import React, { useState, useEffect } from 'react';

const AccidentForm = ({ accident, trains, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Train_ID: '',
    Location: '',
    Date_Time: ''
  });

  useEffect(() => {
    if (accident) {
      setFormData({
        ...accident,
        Date_Time: accident.Date_Time ? accident.Date_Time.substring(0, 16) : '' // Format for datetime-local input
      });
    }
  }, [accident]);

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
      Date_Time: formData.Date_Time
    };
    onSubmit(submitData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{accident ? 'Edit Accident' : 'Report New Accident'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
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
            <label>Accident Time:</label>
            <input
              type="datetime-local"
              name="Date_Time"
              value={formData.Date_Time}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {accident ? 'Update' : 'Report'}
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

export default AccidentForm;