import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://solid-guacamole-59766jrqr72749-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Unable to load leaderboard: {error}</p>
        <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    switch(rank) {
      case 1: return <span className="badge bg-warning text-dark fs-6">🥇 1st</span>;
      case 2: return <span className="badge bg-secondary fs-6">🥈 2nd</span>;
      case 3: return <span className="badge bg-warning text-dark fs-6">🥉 3rd</span>;
      default: return <span className="badge bg-primary fs-6">#{rank}</span>;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 text-warning mb-0">🏆 Leaderboard</h1>
        <button className="btn btn-outline-warning">
          <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <h5 className="card-title text-muted">No Leaderboard Data</h5>
            <p className="card-text">Complete some activities to see the leaderboard!</p>
            <button className="btn btn-warning">View Activities</button>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">🏆 Top Performers</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-semibold">Rank</th>
                  <th scope="col" className="fw-semibold">Username</th>
                  <th scope="col" className="fw-semibold">Score</th>
                  <th scope="col" className="fw-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard
                  .sort((a, b) => b.score - a.score)
                  .map((entry, index) => {
                    const rank = index + 1;
                    const maxScore = Math.max(...leaderboard.map(e => e.score));
                    const progressPercentage = (entry.score / maxScore) * 100;
                    
                    return (
                      <tr key={entry._id} className={rank <= 3 ? 'table-warning' : ''}>
                        <td>{getRankBadge(rank)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                              {entry.user ? entry.user.username?.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="fw-semibold">
                              {entry.user ? entry.user.username : 'Unknown User'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success fs-6">{entry.score} pts</span>
                        </td>
                        <td>
                          <div className="progress" style={{height: '20px'}}>
                            <div 
                              className="progress-bar bg-success" 
                              role="progressbar" 
                              style={{width: `${progressPercentage}%`}}
                              aria-valuenow={entry.score} 
                              aria-valuemin="0" 
                              aria-valuemax={maxScore}
                            >
                              {Math.round(progressPercentage)}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
