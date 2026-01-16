import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      type: "New Member",
      appliedDate: "2024-02-03"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      type: "Event Request",
      appliedDate: "2024-02-04"
    },
    {
      id: 3,
      name: "Arjun Patel",
      email: "arjun@example.com",
      type: "Donation Receipt",
      appliedDate: "2024-02-05"
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha@example.com",
      type: "Content Approval",
      appliedDate: "2024-02-06"
    }
  ]);

  const navigate = useNavigate();

  const adminFeatures = [
    {
      id: 1,
      title: "Member Management",
      description: "Add, edit, view and manage member details and roles",
      icon: "fas fa-users",
      count: "156 Active"
    },
    {
      id: 2,
      title: "Event Management",
      description: "Create and manage events, track registrations and attendance",
      icon: "fas fa-calendar-alt",
      count: "12 Active"
    },
    {
      id: 3,
      title: "Content Management",
      description: "Manage website content, announcements and blog posts",
      icon: "fas fa-file-alt",
      count: "24 Posts"
    },
    {
      id: 4,
      title: "Donation Tracking",
      description: "View donations, generate receipts and manage donors",
      icon: "fas fa-hand-holding-heart",
      count: "₹285K Total"
    },
    {
      id: 5,
      title: "Analytics & Reports",
      description: "View detailed analytics on members, events and donations",
      icon: "fas fa-chart-bar",
      count: "Real-time"
    },
    {
      id: 6,
      title: "System Settings",
      description: "Manage email templates, site settings and configurations",
      icon: "fas fa-cogs",
      count: "Configure"
    }
  ];

  useEffect(() => {
    const adminStr = localStorage.getItem('adminPortalUser');
    if (!adminStr) {
      navigate('/admin-portal');
      return;
    }
    try {
      setAdmin(JSON.parse(adminStr));
    } catch (e) {
      navigate('/admin-portal');
    }

    const yearElement = document.getElementById('footer-copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminPortalUser');
      navigate('/admin-portal');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const approveItem = (id) => {
    const approval = pendingApprovals.find(a => a.id === id);
    if (approval && window.confirm(`Approve ${approval.name}'s ${approval.type}?`)) {
      setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
      alert(`${approval.name}'s request has been approved!`);
    }
  };

  const rejectItem = (id) => {
    const approval = pendingApprovals.find(a => a.id === id);
    if (approval && window.confirm(`Reject ${approval.name}'s ${approval.type}?`)) {
      setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
      alert(`${approval.name}'s request has been rejected!`);
    }
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
            <div className="admin-header">
              <div className="admin-header-content">
                <h1>Admin Dashboard</h1>
                <p>Manage your organization and track key metrics</p>
              </div>
              <div className="admin-status">
                <div className="status-item">
                  {pendingApprovals.length}
                  <span>Pending Approvals</span>
                </div>
                <div className="status-item">
                  12
                  <span>Active Events</span>
                </div>
              </div>
            </div>

            <div className="admin-stats">
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">156</div>
                <div className="stat-label">Total Members</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="stat-value">12</div>
                <div className="stat-label">Active Events</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="stat-value">₹285K</div>
                <div className="stat-label">Total Donations</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <div className="stat-value">{pendingApprovals.length}</div>
                <div className="stat-label">Pending Approvals</div>
              </div>
            </div>

            <div className="admin-grid">
              <div>
                <div className="admin-card">
                  <div className="admin-card-title">
                    <div>
                      <i className="fas fa-tools"></i>
                      Management Features
                    </div>
                  </div>
                  {adminFeatures.map(feature => {
                    const handleClick = () => {
                      if (feature.id === 1) navigate('/member-management');
                      else if (feature.id === 2) navigate('/event-management');
                      else if (feature.id === 4) navigate('/donation-management');
                      else if (feature.id === 5) navigate('/reports-analytics');
                      else alert(`${feature.title} page coming soon!`);
                    };
                    return (
                      <div key={feature.id} className="admin-feature">
                        <div className="feature-info">
                          <div className="feature-icon">
                            <i className={feature.icon}></i>
                          </div>
                          <div className="feature-text">
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                          </div>
                        </div>
                        <button 
                          className="feature-action"
                          onClick={handleClick}
                        >
                          Access
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="admin-card">
                  <div className="admin-profile">
                    <div className="profile-avatar">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div className="profile-name">Admin User</div>
                    <div className="profile-role">Administrator</div>
                  </div>

                  <div className="admin-actions">
                    <button 
                      className="admin-action-btn"
                      onClick={() => alert('System Settings page coming soon!')}
                    >
                      <i className="fas fa-cogs"></i> System Settings
                    </button>
                    <button 
                      className="admin-action-btn"
                      onClick={() => alert('Analytics Dashboard coming soon!')}
                    >
                      <i className="fas fa-chart-line"></i> View Analytics
                    </button>
                    <button 
                      className="admin-action-btn"
                      onClick={() => alert('Reports Generator coming soon!')}
                    >
                      <i className="fas fa-file-pdf"></i> Generate Reports
                    </button>
                  </div>

                  <button className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>

                <div className="admin-card" style={{ marginTop: '20px' }}>
                  <div className="admin-card-title">
                    <i className="fas fa-heartbeat"></i>
                    System Status
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>
                    {['Database', 'Email Service', 'API Server', 'Cache'].map((service, index) => (
                      <div 
                        key={service}
                        style={{
                          marginBottom: index < 3 ? '15px' : 0,
                          paddingBottom: index < 3 ? '15px' : 0,
                          borderBottom: index < 3 ? '1px solid #e2e8f0' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: 600, color: '#1e293b' }}>{service}</div>
                          <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            background: '#10b981',
                            borderRadius: '50%'
                          }}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">
                <div>
                  <i className="fas fa-clock"></i>
                  Pending Approvals
                </div>
                <button 
                  className="card-header-action"
                  onClick={() => alert('All Approvals page coming soon!')}
                >
                  View All
                </button>
              </div>
              {pendingApprovals.map(approval => (
                <div key={approval.id} className="pending-item">
                  <div className="pending-title">{approval.name}</div>
                  <div className="pending-info">
                    <div><strong>Type:</strong> {approval.type}</div>
                    <div><strong>Applied:</strong> {formatDate(approval.appliedDate)}</div>
                  </div>
                  <div className="pending-actions">
                    <button 
                      className="btn-approve"
                      onClick={() => approveItem(approval.id)}
                    >
                      <i className="fas fa-check"></i> Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => rejectItem(approval.id)}
                    >
                      <i className="fas fa-times"></i> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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

export default AdminDashboard;
