import React, { useState, useEffect } from 'react';

const TrainForm = ({ train, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Train_Number: '',
    Type: '',
    Capacity: ''
  });

  useEffect(() => {
    if (train) {
      setFormData(train);
    }
  }, [train]);

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
        <h3>{train ? 'Edit Train' : 'Add New Train'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Train Number:</label>
            <input
              type="text"
              name="Train_Number"
              value={formData.Train_Number}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Capacity:</label>
            <input
              type="number"
              name="Capacity"
              value={formData.Capacity}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              {train ? 'Update' : 'Create'}
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

export default TrainForm;