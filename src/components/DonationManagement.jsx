import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const DonationManagement = () => {
  const [admin, setAdmin] = useState(null);
  const [donations, setDonations] = useState([
    { id: 1, donor: 'John Doe', amount: 5000, program: 'Education Fund', date: '2024-01-15', status: 'Completed' },
    { id: 2, donor: 'Jane Smith', amount: 2000, program: 'Healthcare', date: '2024-01-10', status: 'Completed' },
    { id: 3, donor: 'Michael Brown', amount: 10000, program: 'Community Development', date: '2024-01-20', status: 'Completed' },
    { id: 4, donor: 'Sarah Wilson', amount: 1500, program: 'Disaster Relief', date: '2024-01-22', status: 'Pending Verification' }
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

  const approveDonation = (id) => {
    setDonations(donations.map(d => 
      d.id === id ? { ...d, status: 'Completed' } : d
    ));
  };

  const deleteDonation = (id) => {
    setDonations(donations.filter(d => d.id !== id));
  };

  if (!admin) return null;

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const completedDonations = donations.filter(d => d.status === 'Completed').reduce((sum, d) => sum + d.amount, 0);

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
                <h1>Donation Management</h1>
                <p>Track and manage all donations</p>
              </div>
              <button className="card-header-action">
                <i className="fas fa-plus"></i> Add Donation
              </button>
            </div>

            <div className="admin-stats" style={{ marginBottom: '30px' }}>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-value">₹{(totalDonations / 1000).toFixed(1)}K</div>
                <div className="stat-label">Total Donations</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-value">₹{(completedDonations / 1000).toFixed(1)}K</div>
                <div className="stat-label">Verified</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <i className="fas fa-hourglass"></i>
                </div>
                <div className="stat-value">{donations.filter(d => d.status === 'Pending Verification').length}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">
                <i className="fas fa-list"></i> Donations List
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Donor</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Amount</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Program</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#1e293b', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map(donation => (
                      <tr key={donation.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{donation.donor}</td>
                        <td style={{ padding: '12px', color: '#FF6B35', fontWeight: 600 }}>₹{donation.amount.toLocaleString()}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{donation.program}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{donation.date}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: donation.status === 'Completed' ? '#d1fae5' : '#fef3c7',
                            color: donation.status === 'Completed' ? '#065f46' : '#78350f',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600
                          }}>
                            {donation.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          {donation.status === 'Pending Verification' && (
                            <button 
                              style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', marginRight: '10px', fontWeight: 600 }}
                              onClick={() => approveDonation(donation.id)}
                            >
                              <i className="fas fa-check"></i> Verify
                            </button>
                          )}
                          <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => deleteDonation(donation.id)}>
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

export default DonationManagement;
