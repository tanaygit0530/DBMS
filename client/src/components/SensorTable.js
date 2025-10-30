import React from 'react';

const SensorTable = ({ sensors, trains, onEdit, onDelete }) => {
  const getTrainInfo = (trainId) => {
    const train = trains.find(t => t.Train_ID === trainId);
    return train ? `${train.Train_Number} - ${train.Type}` : 'N/A';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Location</th>
            <th>Train</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.Sensor_ID}>
              <td>{sensor.Sensor_ID}</td>
              <td>{sensor.Location}</td>
              <td>{getTrainInfo(sensor.Train_ID)}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(sensor)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(sensor.Sensor_ID)}
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

export default SensorTable;