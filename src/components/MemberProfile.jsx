import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalFooter from './PortalFooter';
import '../styles/Dashboard.css';

const MemberProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('memberPortalUser');
    if (!userStr) {
      navigate('/portal');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: '+91 9876543210',
      joinDate: '2023-01-15',
      designation: 'Active Member',
      interests: ['Community Service', 'Education', 'Environment']
    });
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('memberPortalUser');
      navigate('/portal');
    }
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setEditing(false);
  };

  if (!user) return null;

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
              <div className="dashboard-title">My Profile</div>
              <p className="dashboard-subtitle">View and manage your profile information</p>
            </div>

            <div className="content-grid">
              <div>
                <div className="card">
                  <div className="card-title">
                    <i className="fas fa-user-circle"></i> Profile Information
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: 600, fontSize: '14px' }}>
                        Full Name
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', color: '#1e293b' }}>
                          {formData.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: 600, fontSize: '14px' }}>
                        Email Address
                      </label>
                      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', color: '#1e293b' }}>
                        {formData.email}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: 600, fontSize: '14px' }}>
                        Phone Number
                      </label>
                      {editing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', color: '#1e293b' }}>
                          {formData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: 600, fontSize: '14px' }}>
                        Designation
                      </label>
                      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', color: '#1e293b' }}>
                        {formData.designation}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#1e293b', fontWeight: 600, fontSize: '14px' }}>
                        Member Since
                      </label>
                      <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', color: '#1e293b' }}>
                        {new Date(formData.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {editing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="action-btn"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          <i className="fas fa-save"></i> Save Changes
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: '#94a3b8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <i className="fas fa-times"></i> Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="action-btn"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <i className="fas fa-edit"></i> Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="card">
                  <div className="card-title">
                    <i className="fas fa-star"></i> Interests & Preferences
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    {formData.interests && formData.interests.map((interest, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #FF6B35, #F44708)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          marginBottom: '8px',
                          marginRight: '8px',
                          fontSize: '13px',
                          fontWeight: 600
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="card-title" style={{ marginTop: '20px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
                    <i className="fas fa-bell"></i> Notifications
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                      <span style={{ color: '#1e293b', fontSize: '14px' }}>Email notifications for events</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                      <span style={{ color: '#1e293b', fontSize: '14px' }}>Updates on club activities</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                      <span style={{ color: '#1e293b', fontSize: '14px' }}>Monthly newsletter</span>
                    </label>
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

export default MemberProfile;
