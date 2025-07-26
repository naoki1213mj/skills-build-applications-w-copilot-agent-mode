import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://solid-guacamole-59766jrqr72749-8000.app.github.dev/api/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Placeholder handler functions
  const handleViewProfile = (user) => {
    alert(`Viewing profile for: ${user.username}`);
  };

  const handleSendMessage = (user) => {
    alert(`Sending message to: ${user.username}`);
  };

  const handleViewActivities = (user) => {
    alert(`Viewing activities for: ${user.username}`);
  };

  const handleEditUser = (user) => {
    alert(`Editing user: ${user.username}`);
  };

  const handleSuspendUser = (user) => {
    if (window.confirm(`Are you sure you want to suspend ${user.username}?`)) {
      alert(`User ${user.username} would be suspended`);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to load users: {error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-success mb-0">👤 Users</h1>
        <button className="btn btn-success">
          <i className="bi bi-person-plus"></i> Add User
        </button>
      </div>

      {/* Search Form */}
      <div className="card mb-4">
        <div className="card-body">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="button">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="card-title text-muted">
              {searchTerm ? 'No Users Found' : 'No Users Registered'}
            </h5>
            <p className="card-text">
              {searchTerm 
                ? `No users match "${searchTerm}". Try a different search term.`
                : 'Be the first to join the OctoFit community!'
              }
            </p>
            {!searchTerm && (
              <button className="btn btn-success">Register Now</button>
            )}
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👥 Registered Users</h5>
            <span className="badge bg-light text-success">
              {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-semibold">Avatar</th>
                  <th scope="col" className="fw-semibold">Username</th>
                  <th scope="col" className="fw-semibold">Email</th>
                  <th scope="col" className="fw-semibold">Status</th>
                  <th scope="col" className="fw-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px', fontSize: '16px'}}>
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className="fw-semibold text-dark">{user.username || 'Unknown'}</span>
                        <br />
                        <small className="text-muted">ID: {user._id}</small>
                      </div>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email || 'No email'}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button 
                          className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                          type="button" 
                          data-bs-toggle="dropdown"
                        >
                          Actions
                        </button>
                        <ul className="dropdown-menu">
                          <li><button className="dropdown-item" onClick={() => handleViewProfile(user)}>View Profile</button></li>
                          <li><button className="dropdown-item" onClick={() => handleSendMessage(user)}>Send Message</button></li>
                          <li><button className="dropdown-item" onClick={() => handleViewActivities(user)}>View Activities</button></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><button className="dropdown-item text-warning" onClick={() => handleEditUser(user)}>Edit User</button></li>
                          <li><button className="dropdown-item text-danger" onClick={() => handleSuspendUser(user)}>Suspend User</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
