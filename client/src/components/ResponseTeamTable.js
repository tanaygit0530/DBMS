import React from 'react';

const ResponseTeamTable = ({ teams, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Contact</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.Team_ID}>
              <td>{team.Team_ID}</td>
              <td>{team.Team_Name}</td>
              <td>{team.Contact_Number}</td>
              <td>{team.Region}</td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-primary mr-1"
                  onClick={() => onEdit(team)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(team.Team_ID)}
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

export default ResponseTeamTable;