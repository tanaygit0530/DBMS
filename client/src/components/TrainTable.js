import React from 'react';

const TrainTable = ({ trains, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Train Number</th>
            <th>Capacity</th>
            <th>Current Load</th>
            <th>Status</th>
            <th>Current Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.Train_ID} className={train.Status === 'Active' ? 'table-success' : train.Status === 'Maintenance' ? 'table-warning' : 'table-secondary'}>
              <td>{train.Train_ID}</td>
              <td>{train.Train_Number}</td>
              <td>{train.Capacity}</td>
              <td>{train.Current_Load}</td>
              <td>
                <span className={`badge bg-${train.Status === 'Active' ? 'success' : train.Status === 'Maintenance' ? 'warning' : 'secondary'}`}>
                  {train.Status}
                </span>
              </td>
              <td>{train.Current_Location}</td>
              <td>
                {onEdit && (
                  <button 
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => onEdit(train)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
                {onDelete && (
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(train.Train_ID)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTable;