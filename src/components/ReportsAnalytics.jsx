import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const ReportsAnalytics = () => {
  const [admin, setAdmin] = useState(null);
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

  if (!admin) return null;

  const analyticsData = [
    { month: 'January', donations: 45000, volunteers: 28, events: 3 },
    { month: 'February', donations: 38000, volunteers: 35, events: 4 },
    { month: 'March', donations: 52000, volunteers: 42, events: 5 },
    { month: 'April', donations: 41000, volunteers: 31, events: 3 }
  ];

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
                <h1>Reports & Analytics</h1>
                <p>View detailed insights and performance metrics</p>
              </div>
              <select style={{
                padding: '10px 15px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: 'white',
                cursor: 'pointer'
              }}>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>

            <div className="admin-stats" style={{ marginBottom: '30px' }}>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-value">₹176K</div>
                <div className="stat-label">Total Revenue</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">136</div>
                <div className="stat-label">Total Volunteers</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="stat-value">15</div>
                <div className="stat-label">Events Held</div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">
                <i className="fas fa-chart-bar"></i> Monthly Performance
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Month</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Donations</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Volunteers</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.map((data, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{data.month}</td>
                        <td style={{ padding: '12px', color: '#FF6B35', fontWeight: 600 }}>₹{(data.donations / 1000).toFixed(0)}K</td>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{data.volunteers}</td>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{data.events}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div className="admin-card">
                <div className="admin-card-title">
                  <i className="fas fa-chart-pie"></i> Donation Sources
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#FF6B35', borderRadius: '2px' }}></div>
                      <span style={{ color: '#64748b' }}>Individual Donors</span>
                    </div>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>60%</span>
                  </div>
                  <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }}></div>
                      <span style={{ color: '#64748b' }}>Corporate Partners</span>
                    </div>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>30%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }}></div>
                      <span style={{ color: '#64748b' }}>Grants</span>
                    </div>
                    <span style={{ color: '#1e293b', fontWeight: 600 }}>10%</span>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-title">
                  <i className="fas fa-star"></i> Top Programs
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#1e293b', fontWeight: 600, marginBottom: '5px' }}>Education Fund</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>₹45,000 raised</div>
                  </div>
                  <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#1e293b', fontWeight: 600, marginBottom: '5px' }}>Healthcare Initiative</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>₹38,000 raised</div>
                  </div>
                  <div>
                    <div style={{ color: '#1e293b', fontWeight: 600, marginBottom: '5px' }}>Community Development</div>
                    <div style={{ color: '#64748b', fontSize: '14px' }}>₹35,000 raised</div>
                  </div>
                </div>
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

export default ReportsAnalytics;
