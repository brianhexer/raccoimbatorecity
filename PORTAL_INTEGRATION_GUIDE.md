# 🔗 Portal Integration Guide

## Overview
All portal pages are now fully connected with the main website. The portal system includes:
- **Member Portal** - Login, Dashboard, Profile, Donations, Volunteering, Registrations
- **Admin Portal** - Login, Dashboard, Members, Events, Donations, Reports
- **Full Navigation** - Links between main site and portal

## Navigation Architecture

### Main Website Access Points
The main website (HTML pages) has portal links in the header navigation:

```html
<div class="has-sub-menu">
  <a role="button">Portal</a>
  <div class="ul-header-submenu">
    <ul>
      <li><a href="admin-portal.html">Admin Portal</a></li>
      <li><a href="portal.html">Member Portal</a></li>
    </ul>
  </div>
</div>
```

### Portal Entry Points

#### From Main Website
1. Click **Portal** menu in main website header
2. Choose **Member Portal** or **Admin Portal**
3. Redirects to React app at `http://localhost:3000/portal` or `/admin-portal`

#### Direct Access
- Member Portal: `http://localhost:3000/portal`
- Admin Portal: `http://localhost:3000/admin-portal`

## Portal Routes & Components

### Member Portal Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/portal` | PortalLogin | Member login page |
| `/member-dashboard` | MemberDashboard | Dashboard after login |
| `/profile` | MemberProfile | Edit profile & preferences |
| `/donations` | MyDonations | Donation history & receipts |
| `/volunteering` | MyVolunteering | Volunteer hours tracking |
| `/registrations` | MyRegistrations | Event registration tracking |

### Admin Portal Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/admin-portal` | AdminLogin | Admin login page |
| `/admin-dashboard` | AdminDashboard | Main admin dashboard |
| `/member-management` | MemberManagement | Manage members |
| `/event-management` | EventManagement | Manage events |
| `/donation-management` | DonationManagement | Manage donations |
| `/reports-analytics` | ReportsAnalytics | View analytics & reports |

## Component Architecture

### Shared Components
1. **PortalHeader** - Navigation header with links to main site
2. **PortalFooter** - Footer with links to all sections
3. **Dashboard.css** - Shared dashboard styling
4. **Portal.css** - Portal-specific styling

### Navigation Flow

```
Main Website Home
        ↓
   Portal Menu
    ↙     ↘
Member Portal    Admin Portal
    ↓             ↓
PortalLogin    AdminLogin
    ↓             ↓
Member Dashboard  Admin Dashboard
    ↙ ↓ ↓ ↘      ↙  ↓  ↓  ↓  ↘
Profile, Donations,     Members, Events,
Volunteering, Events    Donations, Reports
```

## File Structure

```
src/
├── components/
│   ├── PortalHeader.jsx          # Shared navigation
│   ├── PortalFooter.jsx          # Shared footer
│   ├── PortalLogin.jsx           # Member login
│   ├── AdminLogin.jsx            # Admin login
│   ├── MemberDashboard.jsx       # Member main dashboard
│   ├── AdminDashboard.jsx        # Admin main dashboard
│   ├── MemberProfile.jsx         # Profile management
│   ├── MyDonations.jsx           # Donation tracking
│   ├── MyVolunteering.jsx        # Volunteer hours
│   ├── MyRegistrations.jsx       # Event registrations
│   ├── MemberManagement.jsx      # Admin: manage members
│   ├── EventManagement.jsx       # Admin: manage events
│   ├── DonationManagement.jsx    # Admin: manage donations
│   └── ReportsAnalytics.jsx      # Admin: view reports
├── styles/
│   ├── Portal.css                # Portal styling + integration
│   ├── Dashboard.css             # Dashboard styling
│   └── index.css                 # Global styles
└── App.jsx                       # Main routing

portal.html                        # Bridge to React portal
admin-portal.html                 # Bridge to React admin portal
home.html                         # Main website with portal links
```

## Styling Integration

### Portal.css Additions
- `.portal-footer` - Footer styling with links
- `.portal-nav-link` - Navigation link styling
- `.back-to-main-btn` - Button to return to main site
- Responsive design for mobile

### Dashboard.css
- Consistent styling across all dashboard pages
- Stat boxes, cards, tables
- Admin-specific styling for management pages

## Demo Credentials

### Member Portal
- **Email:** demo@rotaract.com
- **Password:** demo123
- **Credentials Display:** Not shown on login page

### Admin Portal
- **Email:** admin@rotaract.com
- **Password:** admin123
- **Credentials Display:** Yellow info box on login page

## Testing Integration

### Start Development Servers

#### Terminal 1: Python HTTP Server (for main website)
```bash
cd d:\raccoimbatorecity
python -m http.server 8000
# Main website available at: http://localhost:8000
```

#### Terminal 2: React Vite Dev Server (for portal)
```bash
cd d:\raccoimbatorecity
npm run dev
# Portal available at: http://localhost:3000
```

### Test All Routes
```bash
python test_portal_integration.py
```

This will test:
- Member Portal: Login, Dashboard, Profile, Donations, Volunteering, Registrations
- Admin Portal: Login, Dashboard, Management pages, Reports

## Key Features

### Member Portal Features
✓ Login with credentials  
✓ Dashboard with stats  
✓ Profile editing  
✓ Donation history  
✓ Volunteer hours tracking  
✓ Event registration tracking  
✓ Logout functionality  

### Admin Portal Features
✓ Secure admin login  
✓ Dashboard with key metrics  
✓ Member management (add, edit, delete)  
✓ Event management  
✓ Donation tracking & verification  
✓ Analytics & reports  
✓ System status monitoring  

### Integration Features
✓ Navigation between main site and portal  
✓ Shared header and footer  
✓ Responsive design  
✓ Session persistence (localStorage)  
✓ Auto-redirect on login/logout  
✓ Consistent styling  

## Troubleshooting

### Portal Routes Not Loading
1. Ensure Vite dev server is running: `npm run dev`
2. Check browser console for errors
3. Verify port 3000 is available

### Links to Main Site Not Working
1. Portal HTML files (portal.html, admin-portal.html) redirect to React app
2. From React app, links use absolute paths: `/home.html`, `/about-us.html`, etc.
3. Make sure main website is served on port 8000

### Styling Issues
1. Check if Dashboard.css is properly imported
2. Verify Portal.css is loading
3. Check browser DevTools for CSS conflicts

## Future Enhancements

1. **Backend Integration**
   - Connect to real database
   - Persist member/donation data
   - Real authentication system

2. **Additional Features**
   - Email notifications
   - PDF receipt generation
   - Export functionality
   - Advanced search/filtering

3. **Mobile App**
   - React Native version
   - Push notifications
   - Offline support

## Contact & Support

For issues or improvements, contact:
- Portal Admin: admin@rotaract.com
- Main Website: contact@rotaract.com
