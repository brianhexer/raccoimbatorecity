import React from 'react';

const PortalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portal-footer">
      <div className="container">
        <div className="portal-footer-content">
          <div className="portal-footer-section">
            <h3>Quick Links</h3>
            <a href="/home.html">Home</a>
            <a href="/about-us.html">About Us</a>
            <a href="/our-services.html">Services</a>
            <a href="/our-projects.html">Projects</a>
            <a href="/contact-us.html">Contact Us</a>
          </div>

          <div className="portal-footer-section">
            <h3>Portal Access</h3>
            <a href="/portal.html">Member Portal</a>
            <a href="/admin-portal.html">Admin Portal</a>
            <a href="/donations.html">Donations</a>
            <a href="/upcoming-events.html">Events</a>
          </div>

          <div className="portal-footer-section">
            <h3>Connect With Us</h3>
            <a href="https://www.facebook.com/share/gh8cNttSyKGxhVuC/" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://x.com/raccbecity" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.instagram.com/raccoimbatorecity" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.linkedin.com/company/raccoimbatorecity" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>

          <div className="portal-footer-section">
            <h3>Legal</h3>
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-and-conditions.html">Terms & Conditions</a>
            <a href="/frequently-asked-questions.html">FAQs</a>
          </div>
        </div>

        <div className="portal-footer-bottom">
          <p>&copy; {currentYear} Rotaract Club of Coimbatore City. All rights reserved.</p>
          <p>Empowering communities through service and fellowship.</p>
        </div>
      </div>
    </footer>
  );
};

export default PortalFooter;
