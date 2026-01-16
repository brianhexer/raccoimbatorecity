import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MemberManagement = () => {
  const [admin, setAdmin] = useState(null);
  const [members, setMembers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'Active', status: 'Approved', joinDate: '2023-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'Volunteer', status: 'Approved', joinDate: '2023-06-20' },
    { id: 3, name: 'Arjun Patel', email: 'arjun@example.com', role: 'Donor', status: 'Approved', joinDate: '2023-09-10' },
    { id: 4, name: 'Neha Singh', email: 'neha@example.com', role: 'Active', status: 'Pending', joinDate: '2024-01-01' }
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

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
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
                <h1>Member Management</h1>
                <p>Manage club members and their roles</p>
              </div>
              <button className="card-header-action">
                <i className="fas fa-plus"></i> Add Member
              </button>
            </div>

            <div className="admin-stats" style={{ marginBottom: '30px' }}>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35' }}>
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">{members.length}</div>
                <div className="stat-label">Total Members</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-value">{members.filter(m => m.status === 'Approved').length}</div>
                <div className="stat-label">Approved</div>
              </div>
              <div className="admin-stat-box">
                <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-value">{members.filter(m => m.status === 'Pending').length}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title">
                <i className="fas fa-list"></i> Member List
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Role</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#1e293b', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'center', color: '#1e293b', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <tr key={member.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', color: '#1e293b', fontWeight: 500 }}>{member.name}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{member.email}</td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{member.role}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: member.status === 'Approved' ? '#d1fae5' : '#fef3c7',
                            color: member.status === 'Approved' ? '#065f46' : '#78350f',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 600
                          }}>
                            {member.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button style={{ background: 'none', border: 'none', color: '#FF6B35', cursor: 'pointer', marginRight: '10px' }}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => removeMember(member.id)}>
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

export default MemberManagement;
