import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://solid-guacamole-59766jrqr72749-8000.app.github.dev/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Placeholder handler functions
  const handleEditTeam = (team) => {
    alert(`Editing team: ${team.name}`);
  };

  const handleManageMembers = (team) => {
    alert(`Managing members for team: ${team.name}`);
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      // API call to delete team would go here
      alert(`Team ${teamId} would be deleted`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to load teams: {error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-info mb-0">👥 Teams</h1>
        <button className="btn btn-info text-white">
          <i className="bi bi-plus-circle"></i> Create Team
        </button>
      </div>
      
      {teams.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="card-title text-muted">No Teams Found</h5>
            <p className="card-text">Create your first team to start collaborating with others!</p>
            <button className="btn btn-info text-white">Create Your First Team</button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map(team => (
            <div key={team._id} className="col-lg-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fw-bold">
                    <i className="bi bi-people-fill me-2"></i>
                    {team.name}
                  </h5>
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-outline-light" 
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => handleEditTeam(team)}>Edit Team</button></li>
                      <li><button className="dropdown-item" onClick={() => handleManageMembers(team)}>Manage Members</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item text-danger" onClick={() => handleDeleteTeam(team.id)}>Delete Team</button></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <span className="badge bg-secondary">
                      {team.members ? team.members.length : 0} members
                    </span>
                  </div>
                  
                  {team.members && team.members.length > 0 ? (
                    <div>
                      <h6 className="text-muted mb-2">Team Members:</h6>
                      <div className="member-list">
                        {team.members.map(member => (
                          <div key={member._id} className="d-flex align-items-center mb-2">
                            <div className="avatar bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{width: '28px', height: '28px', fontSize: '12px'}}>
                              {member.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <span className="text-dark">{member.username}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <i className="bi bi-person-plus text-muted fs-3"></i>
                      <p className="text-muted mt-2">No members yet</p>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-info flex-fill">
                      View Details
                    </button>
                    <button className="btn btn-sm btn-info text-white">
                      Join Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
