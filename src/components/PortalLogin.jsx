import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';
import '../styles/Portal.css';

const PortalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('memberPortalUser');
    if (savedUser) {
      navigate('/member-dashboard');
    }

    // Set copyright year
    const yearElement = document.getElementById('footer-copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }, [navigate]);

  const loadUsers = () => {
    const saved = localStorage.getItem('portalUsers');
    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo@rotaract.com',
        password: 'demo123',
        stats: {
          volunteering: 24,
          donations: 5000,
          eventsAttended: 8
        }
      }
    ];
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('memberPortalUser', JSON.stringify(user));
      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        navigate('/member-dashboard');
      }, 1500);
    } else {
      showAlert('Invalid email or password', 'error');
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
              <h1>Member Portal</h1>
              <p>Access your dashboard, track your contributions, and stay connected with the club</p>
            </div>
          </div>
        </section>

        <section className="portal-login-section">
          <div className="container">
            <div className="portal-login-card">
              <div className="portal-login-header">
                <div className="portal-icon">
                  <i className="fas fa-user"></i>
                </div>
                <h2>Member Login</h2>
                <p>Access your member dashboard and track your activities</p>
              </div>

              {alert.show && (
                <div className={`alert ${alert.type}`}>
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="loginEmail">
                    <i className="fas fa-envelope"></i> Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginPassword">
                    <i className="fas fa-lock"></i> Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-sign-in-alt"></i> Login to Dashboard
                </button>
              </form>
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

export default PortalLogin;
