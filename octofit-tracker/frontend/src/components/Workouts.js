import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetch('https://solid-guacamole-59766jrqr72749-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Placeholder handler functions
  const handleStartWorkout = (workout) => {
    alert(`Starting workout: ${workout.title || 'Untitled'}`);
  };

  const handleEditWorkout = (workout) => {
    alert(`Editing workout: ${workout.title || 'Untitled'}`);
  };

  const handleDuplicateWorkout = (workout) => {
    alert(`Duplicating workout: ${workout.title || 'Untitled'}`);
  };

  const handleDeleteWorkout = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      alert(`Workout ${workoutId} would be deleted`);
    }
  };

  const handleCloseDetails = () => {
    setSelectedWorkout(null);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to load workouts: {error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-danger mb-0">💪 Workouts</h1>
        <button className="btn btn-danger">
          <i className="bi bi-plus-circle"></i> Create Workout
        </button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <i className="bi bi-dumbbell text-muted" style={{fontSize: '4rem'}}></i>
            <h5 className="card-title text-muted mt-3">No Workouts Available</h5>
            <p className="card-text">Create your first workout plan to get started!</p>
            <button className="btn btn-danger">Create Your First Workout</button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map(workout => (
            <div key={workout._id} className="col-lg-6 col-xl-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 fw-bold">
                    <i className="bi bi-dumbbell me-2"></i>
                    {workout.name}
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
                      <li><button className="dropdown-item" onClick={() => handleStartWorkout(workout)}>Start Workout</button></li>
                      <li><button className="dropdown-item" onClick={() => handleEditWorkout(workout)}>Edit Workout</button></li>
                      <li><button className="dropdown-item" onClick={() => handleDuplicateWorkout(workout)}>Duplicate</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item text-danger" onClick={() => handleDeleteWorkout(workout.id)}>Delete</button></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">
                    {workout.description || 'No description available'}
                  </p>
                  
                  {/* Workout Tags */}
                  <div className="mb-3">
                    <span className="badge bg-primary me-1">Beginner</span>
                    <span className="badge bg-success me-1">30 min</span>
                    <span className="badge bg-warning text-dark">Full Body</span>
                  </div>
                  
                  {/* Workout Stats */}
                  <div className="row text-center mb-3">
                    <div className="col-4">
                      <div className="text-muted small">Duration</div>
                      <div className="fw-bold">30 min</div>
                    </div>
                    <div className="col-4">
                      <div className="text-muted small">Difficulty</div>
                      <div className="fw-bold">⭐⭐⭐</div>
                    </div>
                    <div className="col-4">
                      <div className="text-muted small">Calories</div>
                      <div className="fw-bold">~250</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-danger flex-fill"
                      onClick={() => setSelectedWorkout(workout)}
                      data-bs-toggle="modal" 
                      data-bs-target="#workoutModal"
                    >
                      View Details
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workout Details Modal */}
      <div className="modal fade" id="workoutModal" tabIndex="-1" aria-labelledby="workoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="workoutModalLabel">
                <i className="bi bi-dumbbell me-2"></i>
                {selectedWorkout?.name}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedWorkout && (
                <div>
                  <h6 className="text-muted mb-3">Workout Description</h6>
                  <p>{selectedWorkout.description || 'No description available'}</p>
                  
                  <h6 className="text-muted mb-3 mt-4">Workout Plan</h6>
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Warm-up</h6>
                        <small>5 minutes</small>
                      </div>
                      <p className="mb-1">Light cardio and dynamic stretching</p>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Main Exercise</h6>
                        <small>20 minutes</small>
                      </div>
                      <p className="mb-1">Core workout routine with targeted exercises</p>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Cool Down</h6>
                        <small>5 minutes</small>
                      </div>
                      <p className="mb-1">Static stretching and relaxation</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseDetails}>Close</button>
              <button type="button" className="btn btn-danger">Start This Workout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
