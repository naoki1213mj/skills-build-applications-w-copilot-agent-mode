import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://solid-guacamole-59766jrqr72749-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to load activities: {error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-primary mb-0">📊 Activities</h1>
        <button className="btn btn-success">
          <i className="bi bi-plus-circle"></i> Add Activity
        </button>
      </div>
      
      {activities.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="card-title text-muted">No Activities Found</h5>
            <p className="card-text">Start your fitness journey by adding your first activity!</p>
            <button className="btn btn-primary">Add Your First Activity</button>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Activity History</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-semibold">ID</th>
                  <th scope="col" className="fw-semibold">User</th>
                  <th scope="col" className="fw-semibold">Activity Type</th>
                  <th scope="col" className="fw-semibold">Duration</th>
                  <th scope="col" className="fw-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity._id}>
                    <td className="text-muted">{activity._id}</td>
                    <td>
                      <span className="badge bg-secondary">{activity.user}</span>
                    </td>
                    <td>
                      <span className="fw-semibold text-primary">{activity.activity_type}</span>
                    </td>
                    <td>
                      <span className="badge bg-info">{activity.duration}</span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-sm btn-outline-primary">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
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

export default Activities;
