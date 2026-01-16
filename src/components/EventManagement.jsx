import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const EventManagement = () => {
  const [admin, setAdmin] = useState(null);
  const [events, setEvents] = useState([
    { id: 1, name: 'Charity Dinner', date: '2024-02-15', location: 'City Hall', attendees: 45, status: 'Upcoming' },
    { id: 2, name: 'Blood Drive', date: '2024-02-10', location: 'Medical Center', attendees: 32, status: 'Upcoming' },
    { id: 3, name: 'Community Cleanup', date: '2024-01-20', location: 'Central Park', attendees: 28, status: 'Completed' },
    { id: 4, name: 'Youth Mentoring Session', date: '2024-02-05', location: 'School Auditorium', attendees: 18, status: 'Upcoming' }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminStr = localStorage.getItem('adminPortalUser');
    if (!adminStr) {
      navigate('/admin-portal');
      return;
    }
    setAdmin(JSON.parse(adminStr));
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminPortalUser');
      navigate('/admin-portal');
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  if (!admin) return null;

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
        <div className="admin-dashboard-container">
          <div className="container">
            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => navigate('/admin-dashboard')}
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

            <div className="admin-header">
              <div className="admin-header-content">
                <h1>Event Management</h1>
                <p>Organize and track all club events</p>
              </div>
              <button className="card-header-action">
                <i className="fas fa-plus"></i> Create Event
              </button>
            </div>

            <div className="admin-stats" style={{ marginBottom: '30px' }}>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="stat-value">{events.length}</div>
                <div className="stat-label">Total Events</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-value">{events.filter(e => e.status === 'Upcoming').length}</div>
                <div className="stat-label">Upcoming</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">{events.reduce((sum, e) => sum + e.attendees, 0)}</div>
                <div className="stat-label">Total Attendees</div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">
                <i className="fas fa-list"></i> Events List
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Event Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Location</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Attendees</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#1e293b', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{event.name}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{event.date}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{event.location}</td>
                        <td style={{ padding: '12px', color: '#64748b', fontWeight: 600 }}>{event.attendees}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: event.status === 'Upcoming' ? '#dbeafe' : '#d1d5db',
                            color: event.status === 'Upcoming' ? '#0c4a6e' : '#374151',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600
                          }}>
                            {event.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button style={{ background: 'none', border: 'none', color: '#FF6B35', cursor: 'pointer', marginRight: '10px' }}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => deleteEvent(event.id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default EventManagement;
