import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MyDonations = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const donations = [
    {
      id: 1,
      amount: 500,
      program: "Medical Assistance Program",
      date: "2024-02-05",
      status: "Completed"
    },
    {
      id: 2,
      amount: 1000,
      program: "Education Initiative",
      date: "2024-01-25",
      status: "Completed"
    },
    {
      id: 3,
      amount: 2000,
      program: "Community Development",
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: 4,
      amount: 1500,
      program: "Environmental Project",
      date: "2024-01-05",
      status: "Completed"
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

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

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
              <div className="dashboard-title">My Donations</div>
              <p className="dashboard-subtitle">Track your charitable contributions and impact</p>
            </div>

            <div className="stats-section">
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#10b981' }}>
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="stat-value">₹{totalDonated.toLocaleString()}</div>
                <div className="stat-label">Total Donated</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#3b82f6' }}>
                  <i className="fas fa-file-invoice"></i>
                </div>
                <div className="stat-value">{donations.length}</div>
                <div className="stat-label">Total Donations</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon" style={{ color: '#f59e0b' }}>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-value">This Year</div>
                <div className="stat-label">Period</div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <i className="fas fa-history"></i> Donation History
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Program</th>
                    <th style={{ padding: '12px', textAlign: 'right', color: '#1e293b', fontWeight: 600 }}>Amount</th>
                    <th style={{ padding: '12px', textAlign: 'center', color: '#1e293b', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(donation => (
                    <tr key={donation.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px', color: '#64748b' }}>
                        {new Date(donation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{donation.program}</td>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>₹{donation.amount.toLocaleString()}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card" style={{ marginTop: '30px' }}>
              <div className="card-title">
                <i className="fas fa-file-download"></i> Download Receipts
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Download donation receipts for tax purposes or record keeping
              </p>
              <button className="action-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fas fa-download"></i> Download All Receipts (PDF)
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

export default MyDonations;
