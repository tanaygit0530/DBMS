import React from 'react';

const AlertTable = ({ alerts, accidents, onEdit, onDelete }) => {
  const getAccidentInfo = (accidentId) => {
    const accident = accidents.find(a => a.Accident_ID === accidentId);
    return accident ? `#${accident.Accident_ID} - ${accident.Location}` : 'N/A';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Accident</th>
            <th>Alert Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.Alert_ID}>
              <td>{alert.Alert_ID}</td>
              <td>{getAccidentInfo(alert.Accident_ID)}</td>
              <td>{alert.Alert_Type}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(alert)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(alert.Alert_ID)}
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

export default AlertTable;