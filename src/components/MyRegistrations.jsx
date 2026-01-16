import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MyRegistrations = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const registrations = [
    {
      id: 1,
      event: "Community Cleanup Drive",
      date: "2024-02-10",
      location: "City Park",
      status: "Registered",
      time: "09:00 AM"
    },
    {
      id: 2,
      event: "Health Camp",
      date: "2024-02-15",
      location: "Community Center",
      status: "Registered",
      time: "02:00 PM"
    },
    {
      id: 3,
      event: "Educational Workshop",
      date: "2024-02-20",
      location: "School Auditorium",
      status: "Registered",
      time: "04:00 PM"
    },
    {
      id: 4,
      event: "Environmental Seminar",
      date: "2024-01-28",
      location: "Conference Hall",
      status: "Attended",
      time: "03:00 PM"
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

  const upcomingCount = registrations.filter(r => new Date(r.date) > new Date()).length;
  const attendedCount = registrations.filter(r => r.status === 'Attended').length;

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
              <div className="dashboard-title">My Event Registrations</div>
              <p className="dashboard-subtitle">View your registered and attended events</p>
            </div>

            <div className="stats-section">
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#3b82f6' }}>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-value">{upcomingCount}</div>
                <div className="stat-label">Upcoming Events</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#10b981' }}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-value">{attendedCount}</div>
                <div className="stat-label">Events Attended</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#f59e0b' }}>
                  <i className="fas fa-list"></i>
                </div>
                <div className="stat-value">{registrations.length}</div>
                <div className="stat-label">Total Registrations</div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <i className="fas fa-calendar-alt"></i> All Registrations
              </div>
              {registrations.map(reg => (
                <div key={reg.id} style={{
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  borderLeft: `3px solid ${reg.status === 'Attended' ? '#10b981' : '#3b82f6'}`
                }}>
                  <div style={{ fontSize: '12px', color: reg.status === 'Attended' ? '#10b981' : '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                    <i className="fas fa-clock"></i> {new Date(reg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {reg.time}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>{reg.event}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
                    <i className="fas fa-map-marker-alt"></i> {reg.location}
                  </div>
                  <span style={{
                    background: reg.status === 'Attended' ? '#d1fae5' : '#dbeafe',
                    color: reg.status === 'Attended' ? '#065f46' : '#0c4a6e',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
              <div className="card-title">
                <i className="fas fa-plus-circle"></i> Register for New Events
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Browse and register for upcoming club events
              </p>
              <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fas fa-arrow-right"></i> View All Events
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

export default MyRegistrations;
