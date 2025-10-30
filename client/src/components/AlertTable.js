import React from 'react';

const AlertTable = ({ alerts, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.Alert_ID} className={
              alert.Priority === 'High' ? 'table-danger' : 
              alert.Priority === 'Medium' ? 'table-warning' : 'table-info'
            }>
              <td>{alert.Alert_ID}</td>
              <td>{alert.Alert_Type}</td>
              <td>{alert.Description}</td>
              <td>{new Date(alert.Timestamp).toLocaleString()}</td>
              <td>
                <span className={`badge bg-${
                  alert.Status === 'Active' ? 'danger' : 
                  alert.Status === 'Acknowledged' ? 'warning' : 'secondary'
                }`}>
                  {alert.Status}
                </span>
              </td>
              <td>
                <span className={`badge bg-${
                  alert.Priority === 'High' ? 'danger' : 
                  alert.Priority === 'Medium' ? 'warning' : 'info'
                }`}>
                  {alert.Priority}
                </span>
              </td>
              <td>
                {onEdit && (
                  <button 
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => onEdit(alert)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
                {onDelete && (
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(alert.Alert_ID)}
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

export default AlertTable;