import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                height="40" 
                className="me-3"
                style={{filter: 'brightness(0) invert(1)'}}
              />
              OctoFit Tracker
              <span className="ms-2 badge fs-6" style={{
                background: 'rgba(248, 250, 252, 0.9)', 
                color: '#1e40af',
                textShadow: 'none',
                fontWeight: '700'
              }}>Mergington High</span>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/activities">
                    📊 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/users">
                    👤 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="container mt-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="text-center py-5">
                <div className="mb-4">
                  <img 
                    src="/octofitapp-small.png" 
                    alt="OctoFit Logo" 
                    height="120" 
                    className="mb-4"
                  />
                </div>
                <h1 className="display-3 mb-4" style={{
                  background: 'linear-gradient(45deg, #1e40af, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Welcome to OctoFit Tracker
                </h1>
                <p className="lead mb-4" style={{color: '#4b5563', fontSize: '1.3rem'}}>
                  🏫 <strong>Mergington High School's</strong> premier fitness platform<br/>
                  🏃‍♂️ Track activities • 🏆 Compete with teams • 💪 Achieve your goals
                </p>
                
                <div className="row justify-content-center mt-5">
                  <div className="col-lg-8">
                    <div className="row g-4">
                      <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body text-center">
                            <i className="bi bi-activity display-4 text-primary mb-3"></i>
                            <h5>Track Activities</h5>
                            <p className="text-muted small">Log your workouts and monitor progress</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body text-center">
                            <i className="bi bi-trophy display-4 text-warning mb-3"></i>
                            <h5>Leaderboard</h5>
                            <p className="text-muted small">Compete with classmates</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body text-center">
                            <i className="bi bi-people display-4 text-success mb-3"></i>
                            <h5>Join Teams</h5>
                            <p className="text-muted small">Work together toward goals</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body text-center">
                            <i className="bi bi-lightning display-4 text-danger mb-3"></i>
                            <h5>Get Fit</h5>
                            <p className="text-muted small">Personalized workout plans</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <Link to="/activities" className="btn btn-primary btn-lg me-3 px-5 py-3">
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    Get Started
                  </Link>
                  <Link to="/leaderboard" className="btn btn-outline-primary btn-lg px-5 py-3">
                    <i className="bi bi-trophy me-2"></i>
                    View Leaderboard
                  </Link>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
