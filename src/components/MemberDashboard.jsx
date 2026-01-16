import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MemberDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Cleanup Drive",
      date: "2024-02-10",
      location: "City Park",
      time: "09:00 AM"
    },
    {
      id: 2,
      title: "Health Camp",
      date: "2024-02-15",
      location: "Community Center",
      time: "02:00 PM"
    },
    {
      id: 3,
      title: "Educational Workshop",
      date: "2024-02-20",
      location: "School Auditorium",
      time: "04:00 PM"
    }
  ];

  const recentActivities = [
    {
      type: "donation",
      description: "Donated ₹500 for Medical Assistance Program",
      date: "2024-02-05"
    },
    {
      type: "volunteer",
      description: "Volunteered 4 hours at Community Health Camp",
      date: "2024-02-02"
    },
    {
      type: "event",
      description: "Attended Environmental Awareness Seminar",
      date: "2024-01-28"
    },
    {
      type: "donation",
      description: "Donated ₹1000 for Education Initiative",
      date: "2024-01-25"
    }
  ];

  useEffect(() => {
    const userStr = localStorage.getItem('memberPortalUser');
    if (!userStr) {
      navigate('/portal');
      return;
    }
    try {
      setUser(JSON.parse(userStr));
    } catch (e) {
      navigate('/portal');
    }

    const yearElement = document.getElementById('footer-copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('memberPortalUser');
      navigate('/portal');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation':
        return <i className="fas fa-heart" style={{ color: '#ef4444', fontSize: '16px', marginTop: '2px' }}></i>;
      case 'volunteer':
        return <i className="fas fa-hand-fist" style={{ color: '#FF6B35', fontSize: '16px', marginTop: '2px' }}></i>;
      default:
        return <i className="fas fa-calendar-check" style={{ color: '#3b82f6', fontSize: '16px', marginTop: '2px' }}></i>;
    }
  };

  if (!user) return null;

  const userFirstName = user.name.split(' ')[0];

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
            <div className="dashboard-header">
              <div className="dashboard-title">Welcome back, {userFirstName}! 👋</div>
              <p className="dashboard-subtitle">Here's your activity overview and upcoming opportunities</p>
            </div>

            <div className="stats-section">
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#FF6B35' }}>
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="stat-value">{user.stats.volunteering}</div>
                <div className="stat-label">Hours Volunteered</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#3b82f6' }}>
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="stat-value">₹{user.stats.donations.toLocaleString()}</div>
                <div className="stat-label">Total Donated</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#10b981' }}>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-value">{user.stats.eventsAttended}</div>
                <div className="stat-label">Events Attended</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#f59e0b' }}>
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="stat-value">Active</div>
                <div className="stat-label">Member Status</div>
              </div>
            </div>

            <div className="content-grid">
              <div>
                <div className="card">
                  <div className="card-title">
                    <i className="fas fa-calendar-alt"></i>
                    Upcoming Events
                  </div>
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="upcoming-event">
                      <div className="event-date">
                        <i className="fas fa-clock"></i> {formatDate(event.date)} • {event.time}
                      </div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-location">
                        <i className="fas fa-map-marker-alt"></i> {event.location}
                      </div>
                    </div>
                  ))}
                  <button className="action-btn" style={{ width: '100%', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                    <i className="fas fa-arrow-right"></i> View All Events
                  </button>
                </div>
              </div>

              <div>
                <div className="card">
                  <div className="profile-card">
                    <div className="profile-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-role">{user.email}</div>
                  </div>

                  <div className="action-buttons">
                    <button className="action-btn" onClick={() => navigate('/profile')}>
                      <i className="fas fa-user-edit"></i> Edit Profile
                    </button>
                    <button className="action-btn" onClick={() => navigate('/donations')}>
                      <i className="fas fa-hands-holding-circle"></i> My Donations
                    </button>
                    <button className="action-btn" onClick={() => navigate('/volunteering')}>
                      <i className="fas fa-hand-fist"></i> Volunteering
                    </button>
                    <button className="action-btn" onClick={() => navigate('/registrations')}>
                      <i className="fas fa-clipboard-list"></i> Registrations
                    </button>
                  </div>

                  <button className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>

                <div className="card" style={{ marginTop: '20px' }}>
                  <div className="card-title">
                    <i className="fas fa-chart-pie"></i> Impact Summary
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>
                    <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>Member Since</div>
                      <div>January 2023</div>
                    </div>
                    <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>Rank</div>
                      <div>Active Member</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '5px' }}>Badges Earned</div>
                      <div>
                        <span style={{ display: 'inline-block', marginRight: '8px' }}>
                          <i className="fas fa-medal" style={{ color: '#FF6B35' }}></i>
                        </span>
                        <span style={{ display: 'inline-block', marginRight: '8px' }}>
                          <i className="fas fa-heart" style={{ color: '#ef4444' }}></i>
                        </span>
                        <span style={{ display: 'inline-block' }}>
                          <i className="fas fa-leaf" style={{ color: '#10b981' }}></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <i className="fas fa-history"></i> Recent Activities
              </div>
              {recentActivities.map((activity, index) => (
                <div key={index} className="recent-activity">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flexShrink: 0 }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ color: '#1e293b', marginBottom: '5px' }}>{activity.description}</div>
                      <div className="activity-date">{formatDate(activity.date)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PortalFooter />

      <footer className="ul-footer">
        <div className="ul-footer-bottom">
          <div className="ul-footer-container">
            <div className="ul-footer-bottom-wrapper">
              <p className="copyright-txt">
                &copy; <span id="footer-copyright-year"></span> Rotaract Club of Coimbatore City. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MemberDashboard;
