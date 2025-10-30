import React from 'react';

const SensorTable = ({ sensors, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Reading</th>
            <th>Train ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.Sensor_ID} className={sensor.Status === 'Active' ? 'table-success' : 'table-warning'}>
              <td>{sensor.Sensor_ID}</td>
              <td>{sensor.Sensor_Type}</td>
              <td>{sensor.Location}</td>
              <td>
                <span className={`badge bg-${sensor.Status === 'Active' ? 'success' : 'warning'}`}>
                  {sensor.Status}
                </span>
              </td>
              <td>{sensor.Last_Reading}</td>
              <td>{sensor.Train_ID}</td>
              <td>
                {onEdit && (
                  <button 
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => onEdit(sensor)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
                {onDelete && (
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(sensor.Sensor_ID)}
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

export default SensorTable;