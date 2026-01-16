import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import '../styles/Portal.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const adminUsers = [
    {
      email: 'admin@rotaract.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'Administrator',
      stats: {
        totalMembers: 156,
        activeEvents: 12,
        totalDonations: 285000,
        pendingApprovals: 8
      }
    }
  ];

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminPortalUser');
    if (savedAdmin) {
      navigate('/admin-dashboard');
    }

    const yearElement = document.getElementById('footer-copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, [navigate]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert('Please enter both email and password', 'error');
      return;
    }

    const admin = adminUsers.find(a => a.email === email && a.password === password);

    if (admin) {
      localStorage.setItem('adminPortalUser', JSON.stringify({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        stats: admin.stats,
        loginTime: new Date().toISOString()
      }));

      showAlert('Login successful! Redirecting...', 'success');

      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
    } else {
      showAlert('Invalid email or password. Please try again.', 'error');
    }
  };

  return (
    <>
      <div className="preloader" id="preloader">
        <div className="loader"></div>
      </div>

      <header className="ul-header">
        <div className="ul-header-bottom to-be-sticky">
          <div className="ul-header-bottom-wrapper ul-header-container">
            <div className="logo-container">
              <a href="/home.html" className="d-inline-block">
                <img src="/assets/img/logo.svg" alt="logo" className="logo" />
              </a>
            </div>

            <div className="ul-header-nav-wrapper">
              <div className="to-go-to-sidebar-in-mobile">
                <nav className="ul-header-nav">
                  <a href="/home.html">Home</a>
                  <a href="/about-us.html">About</a>
                  <div className="has-sub-menu">
                    <a role="button">Portal</a>
                    <div className="ul-header-submenu">
                      <ul>
                        <li><a href="/admin-portal.html"><i className="flaticon-settings"></i> Admin Portal</a></li>
                        <li><a href="/portal.html"><i className="flaticon-user"></i> Member Portal</a></li>
                      </ul>
                    </div>
                  </div>
                  <a href="/contact-us.html">Contact</a>
                </nav>
              </div>
            </div>

            <div className="ul-header-actions">
              <button className="ul-header-search-opener"><i className="flaticon-search"></i></button>
              <a href="/contact-us.html" className="ul-btn d-sm-inline-flex d-none">
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Join With us
              </a>
              <button className="ul-header-sidebar-opener d-lg-none d-inline-flex">
                <i className="flaticon-menu"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="portal-hero">
          <div className="container">
            <div className="portal-hero-content">
              <h1>Admin Portal</h1>
              <p>Manage your organization, track metrics, and oversee operations</p>
            </div>
          </div>
        </section>

        <section className="portal-login-section">
          <div className="container">
            <div className="portal-login-card">
              <div className="portal-login-header">
                <div className="portal-icon">
                  <i className="fas fa-user-shield"></i>
                </div>
                <h2>Admin Login</h2>
                <p>Access the administrative dashboard</p>
              </div>

              {alert.show && (
                <div className={`alert ${alert.type}`}>
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="adminEmail">
                    <i className="fas fa-envelope"></i> Email Address
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    className="form-control"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="adminPassword">
                    <i className="fas fa-lock"></i> Password
                  </label>
                  <input
                    type="password"
                    id="adminPassword"
                    className="form-control"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-sign-in-alt"></i> Login to Admin Dashboard
                </button>
              </form>

              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#fef3c7',
                borderRadius: '12px',
                border: '2px solid #fde68a'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <i className="fas fa-shield-alt" style={{ color: '#d97706', fontSize: '24px' }}></i>
                </div>
                <p style={{
                  textAlign: 'center',
                  color: '#78350f',
                  fontSize: '13px',
                  fontWeight: 600,
                  margin: 0
                }}>
                  Admin Demo Credentials:<br />
                  <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>admin@rotaract.com</span> /{' '}
                  <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>admin123</span>
                </p>
              </div>
            </div>
          </div>
        </section>
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

export default AdminLogin;
