import React from 'react';

const PortalHeader = () => {
  return (
    <header className="ul-header">
      <div className="ul-header-bottom to-be-sticky">
        <div className="ul-header-bottom-wrapper ul-header-container">
          <div className="logo-container">
            <a href="/home.html" className="d-inline-block">
              <img src="/assets/img/logo.svg" alt="logo" className="logo" />
            </a>
          </div>

          {/* header nav */}
          <div className="ul-header-nav-wrapper">
            <div className="to-go-to-sidebar-in-mobile">
              <nav className="ul-header-nav">
                <a href="/home.html">Home</a>
                <a href="/about-us.html">About</a>
                <a href="/our-services.html">Services</a>
                <a href="/donations.html">Donations</a>
                <a href="/upcoming-events.html">Events</a>
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

          {/* actions */}
          <div className="ul-header-actions">
            <a href="/contact-us.html" className="ul-btn d-sm-inline-flex d-none">
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Join With us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
