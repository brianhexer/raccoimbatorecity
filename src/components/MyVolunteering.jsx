import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MyVolunteering = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const volunteeringSessions = [
    {
      id: 1,
      activity: "Community Cleanup Drive",
      hours: 4,
      date: "2024-02-02",
      location: "City Park"
    },
    {
      id: 2,
      activity: "Health Camp Assistance",
      hours: 6,
      date: "2024-01-28",
      location: "Community Center"
    },
    {
      id: 3,
      activity: "School Mentoring Program",
      hours: 3,
      date: "2024-01-20",
      location: "Government School"
    },
    {
      id: 4,
      activity: "Environmental Awareness Drive",
      hours: 5,
      date: "2024-01-10",
      location: "Urban Area"
    },
    {
      id: 5,
      activity: "Elderly Care Home Visit",
      hours: 6,
      date: "2024-01-02",
      location: "Care Home"
    }
  ];

  useEffect(() => {
    const userStr = localStorage.getItem('memberPortalUser');
    if (!userStr) {
      navigate('/portal');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('memberPortalUser');
      navigate('/portal');
    }
  };

  if (!user) return null;

  const totalHours = volunteeringSessions.reduce((sum, v) => sum + v.hours, 0);
  const avgHoursPerSession = (totalHours / volunteeringSessions.length).toFixed(1);

  return (
    <>
      <header className="ul-header">
        <div className="ul-header-bottom to-be-sticky">
          <div className="ul-header-bottom-wrapper ul-header-container">
            <div className="logo-container">
              <a href="/home.html" className="d-inline-block">
                <img src="/assets/img/logo.svg" alt="logo" className="logo" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="dashboard-container">
          <div className="container">
            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => navigate('/member-dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FF6B35',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-arrow-left"></i> Back to Dashboard
              </button>
            </div>

            <div className="dashboard-header">
              <div className="dashboard-title">My Volunteering</div>
              <p className="dashboard-subtitle">Track your volunteer hours and contribution</p>
            </div>

            <div className="stats-section">
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#FF6B35' }}>
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-value">{totalHours}</div>
                <div className="stat-label">Total Hours</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#3b82f6' }}>
                  <i className="fas fa-list"></i>
                </div>
                <div className="stat-value">{volunteeringSessions.length}</div>
                <div className="stat-label">Sessions</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#10b981' }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-value">{avgHoursPerSession}</div>
                <div className="stat-label">Avg Hours/Session</div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <i className="fas fa-history"></i> Volunteering History
              </div>
              {volunteeringSessions.map(session => (
                <div key={session.id} className="upcoming-event">
                  <div className="event-date">
                    <i className="fas fa-clock"></i> {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {session.hours} hours
                  </div>
                  <div className="event-title">{session.activity}</div>
                  <div className="event-location">
                    <i className="fas fa-map-marker-alt"></i> {session.location}
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
              <div className="card-title">
                <i className="fas fa-plus-circle"></i> Log New Volunteering Hours
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Add a new volunteering session to your record
              </p>
              <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fas fa-plus"></i> Log Hours
              </button>
            </div>

            <button 
              className="logout-btn" 
              onClick={handleLogout}
              style={{ marginTop: '30px' }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyVolunteering;
