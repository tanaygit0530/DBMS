import React from 'react';

const ResponseActionTable = ({ actions, accidents, teams, onEdit, onDelete }) => {
  const getAccidentInfo = (accidentId) => {
    const accident = accidents.find(a => a.Accident_ID === accidentId);
    return accident ? `#${accident.Accident_ID} - ${accident.Location}` : 'N/A';
  };

  const getTeamInfo = (teamId) => {
    const team = teams.find(t => t.Team_ID === teamId);
    return team ? `${team.Team_Name} (${team.Region})` : 'N/A';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Response ID</th>
            <th>Accident</th>
            <th>Response Team</th>
            <th>Response Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action) => (
            <tr key={action.Response_ID}>
              <td>{action.Response_ID}</td>
              <td>{getAccidentInfo(action.Accident_ID)}</td>
              <td>{getTeamInfo(action.Team_ID)}</td>
              <td>{action.Response_Time ? new Date(action.Response_Time).toLocaleString() : 'N/A'}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(action)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(action.Response_ID)}
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

export default ResponseActionTable;