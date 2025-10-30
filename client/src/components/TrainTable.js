import React from 'react';

const TrainTable = ({ trains, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Train ID</th>
            <th>Train Number</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.Train_ID}>
              <td>{train.Train_ID}</td>
              <td>{train.Train_Number}</td>
              <td>{train.Type}</td>
              <td>{train.Capacity}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(train)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(train.Train_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTable;