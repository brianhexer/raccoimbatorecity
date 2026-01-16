import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortalLogin from './components/PortalLogin';
import AdminLogin from './components/AdminLogin';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import MyDonations from './components/MyDonations';
import MyVolunteering from './components/MyVolunteering';
import MyRegistrations from './components/MyRegistrations';
import MemberProfile from './components/MemberProfile';
import MemberManagement from './components/MemberManagement';
import EventManagement from './components/EventManagement';
import DonationManagement from './components/DonationManagement';
import ReportsAnalytics from './components/ReportsAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/portal" replace />} />
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/admin-portal" element={<AdminLogin />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donations" element={<MyDonations />} />
        <Route path="/volunteering" element={<MyVolunteering />} />
        <Route path="/registrations" element={<MyRegistrations />} />
        <Route path="/profile" element={<MemberProfile />} />
        <Route path="/member-management" element={<MemberManagement />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/donation-management" element={<DonationManagement />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
