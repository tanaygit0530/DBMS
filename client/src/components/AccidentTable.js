import React from 'react';

const AccidentTable = ({ accidents, trains, onEdit, onDelete }) => {
  const getTrainInfo = (trainId) => {
    const train = trains.find(t => t.Train_ID === trainId);
    return train ? `${train.Train_Number} - ${train.Type}` : 'N/A';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Accident ID</th>
            <th>Train</th>
            <th>Location</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accidents.map((accident) => (
            <tr key={accident.Accident_ID}>
              <td>{accident.Accident_ID}</td>
              <td>{getTrainInfo(accident.Train_ID)}</td>
              <td>{accident.Location}</td>
              <td>{accident.Date_Time ? new Date(accident.Date_Time).toLocaleString() : 'N/A'}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(accident)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(accident.Accident_ID)}
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

export default AccidentTable;