# React Portal System Setup Guide

## Overview
The portal system has been converted from HTML to React with JSX components.

## Project Structure
```
src/
├── components/
│   ├── PortalLogin.jsx       # Member login page
│   ├── AdminLogin.jsx         # Admin login page
│   ├── MemberDashboard.jsx    # Member dashboard
│   └── AdminDashboard.jsx     # Admin dashboard
├── styles/
│   ├── Portal.css             # Login page styles
│   └── Dashboard.css          # Dashboard styles
├── App.jsx                    # Main app with routing
├── main.jsx                   # React entry point
└── index.css                  # Global styles
```

## Installation

### 1. Install Dependencies
```powershell
npm install
```

This installs:
- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.21.0
- Vite 5.0.8

### 2. Run Development Server
```powershell
npm run dev
```

Server starts at: `http://localhost:3000`

### 3. Build for Production
```powershell
npm run build
```

Output directory: `dist/`

## Routes

- `/portal` - Member login page
- `/admin-portal` - Admin login page
- `/member-dashboard` - Member dashboard (protected)
- `/admin-dashboard` - Admin dashboard (protected)

## Features

### PortalLogin Component
- React hooks (useState, useEffect)
- Form state management
- LocalStorage authentication
- React Router navigation
- Auto-redirect if logged in

### AdminLogin Component
- Admin authentication
- Alert system
- Protected routing
- Session management

### MemberDashboard Component
- Stats display (volunteering, donations, events)
- Upcoming events list
- Recent activities feed
- Profile management
- Logout functionality

### AdminDashboard Component
- Admin statistics
- Management features grid
- Pending approvals with approve/reject
- System status monitoring
- Profile and logout

## Demo Credentials

**Member Portal:**
- Email: `demo@rotaract.com`
- Password: `demo123`

**Admin Portal:**
- Email: `admin@rotaract.com`
- Password: `admin123`

## Key Changes from HTML

1. **Component-based**: Modular JSX components instead of HTML files
2. **State Management**: React useState for form inputs and alerts
3. **Routing**: React Router for navigation
4. **Event Handling**: onClick handlers instead of inline scripts
5. **Conditional Rendering**: JSX conditionals for alerts and dynamic content
6. **Props & Data**: Component state instead of localStorage queries in HTML

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant updates during development. Changes reflect immediately.

### Component Props
Pass data between components:
```jsx
<Component data={someData} onAction={handleAction} />
```

### Protected Routes
Components check localStorage and redirect if not authenticated.

### Styling
- Existing Bootstrap and custom CSS preserved
- Additional CSS in `src/styles/` for components
- Font Awesome icons work as-is

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Access at: `http://localhost:3000/portal`
4. Test both member and admin portals

The React app integrates with existing assets (images, CSS, fonts) in the `assets/` folder.
