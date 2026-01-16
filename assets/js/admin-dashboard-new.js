class AdminDashboard {
    constructor() {
        this.user = null;
        this.currentView = 'overview';
        this.members = [];
        this.events = [];
        
        this.adminStats = {
            totalMembers: 156,
            activeEvents: 12,
            totalDonations: 285000,
            pendingApprovals: 8
        };

        this.pendingApprovals = [
            {
                id: 1,
                type: 'Member Registration',
                name: 'John Smith',
                email: 'john@example.com',
                date: '2024-02-08'
            },
            {
                id: 2,
                type: 'Event Request',
                name: 'Community Health Camp',
                requestedBy: 'Jane Doe',
                date: '2024-02-07'
            },
            {
                id: 3,
                type: 'Donation Receipt',
                name: 'Anonymous Donor',
                amount: '₹5000',
                date: '2024-02-06'
            },
            {
                id: 4,
                type: 'Content Submission',
                name: 'Blog Post: Environmental Impact',
                submittedBy: 'Alex Johnson',
                date: '2024-02-05'
            }
        ];

        this.adminFeatures = [
            { id: '1', title: 'Member Management', desc: 'View, add, and manage members', icon: 'fa-users' },
            { id: '2', title: 'Event Management', desc: 'Create and manage events', icon: 'fa-calendar' },
            { id: '3', title: 'Content Management', desc: 'Manage website content', icon: 'fa-file-alt' },
            { id: '4', title: 'Donation Tracking', desc: 'Track and manage donations', icon: 'fa-donate' },
            { id: '5', title: 'Analytics & Reports', desc: 'View reports and analytics', icon: 'fa-chart-bar' },
            { id: '6', title: 'System Settings', desc: 'Configure system settings', icon: 'fa-cog' }
        ];

        this.init();
    }

    init() {
        // Check if user is logged in
        const loggedIn = this.checkAdminLogin();
        if (!loggedIn) {
            window.location.href = '/portal/admin.html';
            return;
        }

        this.setupHeader();
        this.renderDashboard();
    }

    setupHeader() {
        const header = document.querySelector('.ul-header');
        const savedUser = localStorage.getItem('adminPortalUser');
        
        if (savedUser && header) {
            // Hide full header and show simple header
            header.style.display = 'none';
            this.createSimpleHeader();
        }
    }

    createSimpleHeader() {
        const body = document.body;
        const simpleHeader = document.createElement('div');
        simpleHeader.id = 'simpleHeader';
        simpleHeader.style.cssText = `
            background: #1e293b;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
        `;
        
        simpleHeader.innerHTML = `
            <div style="display: flex; align-items: center; padding: 0 20px;">
                <a href="/raccoimbatorecity/home.html" style="display: inline-block;">
                    <img src="/assets/img/logo.svg" alt="logo" style="height: 40px; width: auto;">
                </a>
            </div>
            <div style="display: flex; align-items: center; gap: 15px; padding: 0 20px;">
                <span style="color: white; font-weight: 600;">Admin Panel</span>
                <a href="/raccoimbatorecity/home.html" style="
                    padding: 10px 20px;
                    background: linear-gradient(135deg, #FF6B35, #F44708);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-arrow-left" style="margin-right: 8px;"></i> Back to Home
                </a>
            </div>
        `;
        
        body.insertBefore(simpleHeader, body.firstChild);
    }

    checkAdminLogin() {
        const userStr = localStorage.getItem('adminPortalUser');
        if (!userStr) {
            return false;
        }
        try {
            this.user = JSON.parse(userStr);
            return true;
        } catch (e) {
            return false;
        }
    }

    renderDashboard() {
        const container = document.getElementById('adminDashboardContent');
        
        if (this.currentView === 'overview') {
            this.renderOverview(container);
        } else if (this.currentView === 'members') {
            this.renderMembers(container);
        } else if (this.currentView === 'events') {
            this.renderEvents(container);
        } else if (this.currentView === 'content') {
            this.renderContent(container);
        } else if (this.currentView === 'donations') {
            this.renderDonations(container);
        } else if (this.currentView === 'analytics') {
            this.renderAnalytics(container);
        } else if (this.currentView === 'settings') {
            this.renderSettings(container);
        }
    }

    renderOverview(container) {
        let html = `
            <div class="container">
                <!-- Dashboard Header -->
                <div class="dashboard-header">
                    <div class="dashboard-title"><i class="fas fa-sliders-h"></i> Admin Dashboard</div>
                    <p class="dashboard-subtitle">Manage your organization's content, members, and operations</p>
                </div>

                <!-- Admin Stats Section -->
                <div class="stats-section">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-users"></i></div>
                        <div class="stat-value">${this.adminStats.totalMembers}</div>
                        <div class="stat-label">Total Members</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-calendar"></i></div>
                        <div class="stat-value">${this.adminStats.activeEvents}</div>
                        <div class="stat-label">Active Events</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #f59e0b;"><i class="fas fa-money-bill-wave"></i></div>
                        <div class="stat-value">₹${(this.adminStats.totalDonations / 1000).toFixed(0)}K</div>
                        <div class="stat-label">Total Donations</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #ef4444;"><i class="fas fa-hourglass-end"></i></div>
                        <div class="stat-value">${this.adminStats.pendingApprovals}</div>
                        <div class="stat-label">Pending Approvals</div>
                    </div>
                </div>

                <!-- Content Grid -->
                <div class="content-grid">
                    <!-- Main Content -->
                    <div>
                        <!-- Management Features -->
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-tasks"></i> Management Features
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                                ${this.adminFeatures.map(feature => `
                                    <div style="
                                        padding: 20px;
                                        border: 2px solid #e2e8f0;
                                        border-radius: 12px;
                                        cursor: pointer;
                                        transition: all 0.3s ease;
                                        text-align: center;
                                    " onmouseover="this.style.borderColor='#FF6B35'; this.style.backgroundColor='#fef3f2';" 
                                       onmouseout="this.style.borderColor='#e2e8f0'; this.style.backgroundColor='white';"
                                       onclick="adminDashboard.switchView('${feature.id === '1' ? 'members' : feature.id === '2' ? 'events' : feature.id === '3' ? 'content' : feature.id === '4' ? 'donations' : feature.id === '5' ? 'analytics' : 'settings'}')">
                                        <div style="font-size: 32px; margin-bottom: 10px; color: #FF6B35;">
                                            <i class="fas ${feature.icon}"></i>
                                        </div>
                                        <div style="font-weight: 600; color: #1e293b; margin-bottom: 5px;">${feature.title}</div>
                                        <div style="font-size: 13px; color: #64748b;">${feature.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Pending Approvals -->
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-check-circle"></i> Pending Approvals
                            </div>
                            ${this.pendingApprovals.map(approval => `
                                <div class="upcoming-event">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="flex-grow: 1;">
                                            <div style="display: inline-block; background: #fef3f2; color: #FF6B35; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 8px;">
                                                ${approval.type}
                                            </div>
                                            <div class="event-title">${approval.name}</div>
                                            <div class="event-location" style="margin-top: 5px;">
                                                ${approval.email ? `📧 ${approval.email}` : approval.requestedBy ? `👤 ${approval.requestedBy}` : approval.submittedBy ? `👤 ${approval.submittedBy}` : approval.amount ? `💰 ${approval.amount}` : ''}
                                            </div>
                                            <div class="event-date">${new Date(approval.date).toLocaleDateString()}</div>
                                        </div>
                                        <div style="display: flex; gap: 8px;">
                                            <button class="action-btn" style="padding: 8px 12px; font-size: 12px;" onclick="adminDashboard.approveItem(${approval.id})">
                                                <i class="fas fa-check"></i> Approve
                                            </button>
                                            <button class="action-btn" style="padding: 8px 12px; font-size: 12px; background: #ef4444;" onclick="adminDashboard.rejectItem(${approval.id})">
                                                <i class="fas fa-times"></i> Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div>
                        <!-- Admin Info Card -->
                        <div class="card">
                            <div class="profile-card">
                                <div class="profile-avatar" style="background: linear-gradient(135deg, #FF6B35, #F44708);">
                                    <i class="fas fa-user-shield"></i>
                                </div>
                                <div class="profile-name">${this.user.name}</div>
                                <div class="profile-role">Administrator</div>
                                <div style="font-size: 12px; color: #64748b; margin-top: 8px;">${this.user.email}</div>
                            </div>

                            <div class="action-buttons">
                                <button class="action-btn" onclick="adminDashboard.switchView('settings')">
                                    <i class="fas fa-cog"></i> System Settings
                                </button>
                                <button class="action-btn" onclick="adminDashboard.switchView('analytics')">
                                    <i class="fas fa-chart-bar"></i> Analytics & Reports
                                </button>
                            </div>

                            <button class="logout-btn" onclick="adminDashboard.handleLogout()">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>

                        <!-- Quick Actions -->
                        <div class="card" style="margin-top: 20px;">
                            <div class="card-title">
                                <i class="fas fa-bolt"></i> Quick Actions
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <button class="action-btn" style="font-size: 13px; padding: 10px;" onclick="adminDashboard.switchView('members')">
                                    <i class="fas fa-plus"></i> Add New Member
                                </button>
                                <button class="action-btn" style="font-size: 13px; padding: 10px;" onclick="adminDashboard.switchView('events')">
                                    <i class="fas fa-plus"></i> Create Event
                                </button>
                                <button class="action-btn" style="font-size: 13px; padding: 10px;" onclick="adminDashboard.switchView('content')">
                                    <i class="fas fa-plus"></i> Add Content
                                </button>
                            </div>
                        </div>

                        <!-- System Status -->
                        <div class="card" style="margin-top: 20px;">
                            <div class="card-title">
                                <i class="fas fa-heartbeat"></i> System Status
                            </div>
                            <div style="font-size: 14px; color: #64748b;">
                                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <span>Server Status</span>
                                    <span style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></span>
                                </div>
                                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <span>Database</span>
                                    <span style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; animation-delay: 0.5s;"></span>
                                </div>
                                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <span>API Services</span>
                                    <span style="display: inline-block; width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; animation-delay: 1s;"></span>
                                </div>
                            </div>
                            <style>
                                @keyframes pulse {
                                    0%, 100% { opacity: 1; }
                                    50% { opacity: 0.5; }
                                }
                            </style>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderMembers(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Member Management</div>
                </div>

                <div class="card" style="margin-bottom: 30px;">
                    <div class="card-title">
                        <i class="fas fa-users"></i> Manage Members
                    </div>
                    <form style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <input type="text" placeholder="Member Name" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            <input type="email" placeholder="Email Address" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            <input type="tel" placeholder="Phone Number" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            <select style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                                <option>Select Role</option>
                                <option>Member</option>
                                <option>Volunteer</option>
                                <option>Moderator</option>
                            </select>
                        </div>
                        <button type="submit" class="action-btn" style="width: 100%;">
                            <i class="fas fa-plus"></i> Add Member
                        </button>
                    </form>

                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Name</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Email</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Role</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Joined</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px;">John Smith</td>
                                <td style="padding: 12px;">john@example.com</td>
                                <td style="padding: 12px;"><span style="background: #fef3f2; color: #FF6B35; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Member</span></td>
                                <td style="padding: 12px;">Jan 15, 2023</td>
                                <td style="padding: 12px;"><button class="action-btn" style="font-size: 12px; padding: 6px 12px;"><i class="fas fa-edit"></i> Edit</button></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px;">Jane Doe</td>
                                <td style="padding: 12px;">jane@example.com</td>
                                <td style="padding: 12px;"><span style="background: #dbeafe; color: #3b82f6; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Volunteer</span></td>
                                <td style="padding: 12px;">Feb 01, 2023</td>
                                <td style="padding: 12px;"><button class="action-btn" style="font-size: 12px; padding: 6px 12px;"><i class="fas fa-edit"></i> Edit</button></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px;">Alex Johnson</td>
                                <td style="padding: 12px;">alex@example.com</td>
                                <td style="padding: 12px;"><span style="background: #dcfce7; color: #10b981; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Moderator</span></td>
                                <td style="padding: 12px;">Mar 10, 2023</td>
                                <td style="padding: 12px;"><button class="action-btn" style="font-size: 12px; padding: 6px 12px;"><i class="fas fa-edit"></i> Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderEvents(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Event Management</div>
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-calendar"></i> Create New Event
                    </div>
                    <form style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0;">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Event Title</label>
                            <input type="text" placeholder="Enter event title" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Date</label>
                                <input type="date" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Time</label>
                                <input type="time" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                            </div>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Location</label>
                            <input type="text" placeholder="Event location" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Description</label>
                            <textarea style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; resize: vertical; min-height: 120px;" placeholder="Event description..."></textarea>
                        </div>

                        <button type="submit" class="action-btn" style="width: 100%;">
                            <i class="fas fa-calendar-plus"></i> Create Event
                        </button>
                    </form>

                    <div class="card-title">
                        <i class="fas fa-list-check"></i> Recent Events
                    </div>
                    <div class="upcoming-event">
                        <div class="event-title">Community Cleanup Drive</div>
                        <div class="event-location"><i class="fas fa-calendar"></i> Feb 10, 2024 at 09:00 AM</div>
                        <div style="margin-top: 10px;">
                            <button class="action-btn" style="margin-right: 10px; font-size: 12px; padding: 8px 12px;"><i class="fas fa-edit"></i> Edit</button>
                            <button class="action-btn" style="margin-right: 10px; font-size: 12px; padding: 8px 12px; background: #3b82f6;"><i class="fas fa-users"></i> View Registrations</button>
                            <button class="action-btn" style="font-size: 12px; padding: 8px 12px; background: #ef4444;"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderContent(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Content Management</div>
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-file-alt"></i> Publish New Content
                    </div>
                    <form style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0;">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Title</label>
                            <input type="text" placeholder="Content title" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Content Type</label>
                            <select style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                                <option>Blog Post</option>
                                <option>Announcement</option>
                                <option>News</option>
                                <option>Update</option>
                            </select>
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Content</label>
                            <textarea style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; resize: vertical; min-height: 200px;" placeholder="Write your content here..."></textarea>
                        </div>

                        <button type="submit" class="action-btn" style="width: 100%;">
                            <i class="fas fa-plus"></i> Publish Content
                        </button>
                    </form>

                    <div class="card-title">
                        <i class="fas fa-list-check"></i> Published Content
                    </div>
                    <div class="upcoming-event">
                        <div class="event-title">Environmental Awareness Seminar</div>
                        <div class="event-location">Posted on Feb 05, 2024</div>
                        <div style="margin-top: 10px;">
                            <button class="action-btn" style="margin-right: 10px; font-size: 12px; padding: 8px 12px;"><i class="fas fa-edit"></i> Edit</button>
                            <button class="action-btn" style="font-size: 12px; padding: 8px 12px; background: #ef4444;"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderDonations(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Donation Tracking</div>
                </div>

                <div class="stats-section">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-money-bill-wave"></i></div>
                        <div class="stat-value">₹285K</div>
                        <div class="stat-label">Total Donated</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-users"></i></div>
                        <div class="stat-value">124</div>
                        <div class="stat-label">Total Donors</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #f59e0b;"><i class="fas fa-calendar"></i></div>
                        <div class="stat-value">18</div>
                        <div class="stat-label">This Month</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-list-check"></i> Recent Donations
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Donor Name</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Amount</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Purpose</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Date</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px;">Anonymous</td>
                                <td style="padding: 12px;">₹5,000</td>
                                <td style="padding: 12px;">Medical Assistance</td>
                                <td style="padding: 12px;">Feb 06, 2024</td>
                                <td style="padding: 12px;"><button class="action-btn" style="font-size: 11px; padding: 5px 10px;"><i class="fas fa-file-pdf"></i></button></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px;">Rajesh Kumar</td>
                                <td style="padding: 12px;">₹10,000</td>
                                <td style="padding: 12px;">Education Initiative</td>
                                <td style="padding: 12px;">Feb 05, 2024</td>
                                <td style="padding: 12px;"><button class="action-btn" style="font-size: 11px; padding: 5px 10px;"><i class="fas fa-file-pdf"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderAnalytics(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Analytics & Reports</div>
                </div>

                <div class="stats-section">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-arrow-up"></i></div>
                        <div class="stat-value">+24%</div>
                        <div class="stat-label">Member Growth (30 days)</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-arrow-up"></i></div>
                        <div class="stat-value">+18%</div>
                        <div class="stat-label">Event Registrations (30 days)</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #f59e0b;"><i class="fas fa-arrow-up"></i></div>
                        <div class="stat-value">+35%</div>
                        <div class="stat-label">Donations (30 days)</div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-chart-bar"></i> Available Reports
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <button class="action-btn" style="padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                            <i class="fas fa-users" style="font-size: 24px;"></i>
                            <span>Member Report</span>
                        </button>
                        <button class="action-btn" style="padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                            <i class="fas fa-calendar" style="font-size: 24px;"></i>
                            <span>Event Report</span>
                        </button>
                        <button class="action-btn" style="padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                            <i class="fas fa-money-bill-wave" style="font-size: 24px;"></i>
                            <span>Donation Report</span>
                        </button>
                        <button class="action-btn" style="padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                            <i class="fas fa-hand-fist" style="font-size: 24px;"></i>
                            <span>Volunteer Report</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderSettings(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="adminDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">System Settings</div>
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-cog"></i> Configuration
                    </div>
                    
                    <div style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0;">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Organization Name</label>
                            <input type="text" value="Rotaract Club" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Organization Email</label>
                            <input type="email" value="contact@rotaract.com" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Support Email</label>
                            <input type="email" value="support@rotaract.com" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;">
                        </div>

                        <button class="action-btn" style="width: 100%;">
                            <i class="fas fa-save"></i> Save Settings
                        </button>
                    </div>

                    <div style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 2px solid #e2e8f0;">
                        <div class="card-title">
                            <i class="fas fa-envelope"></i> Email Templates
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <button class="action-btn" style="font-size: 13px; padding: 10px;">
                                <i class="fas fa-edit"></i> Welcome Email Template
                            </button>
                            <button class="action-btn" style="font-size: 13px; padding: 10px;">
                                <i class="fas fa-edit"></i> Notification Email Template
                            </button>
                            <button class="action-btn" style="font-size: 13px; padding: 10px;">
                                <i class="fas fa-edit"></i> Receipt Email Template
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class="card-title">
                            <i class="fas fa-sliders-h"></i> Advanced Settings
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #1e293b;">Enable member registration</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #1e293b;">Enable online donations</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #1e293b;">Send notification emails</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    switchView(view) {
        this.currentView = view;
        this.renderDashboard();
        window.scrollTo(0, 0);
    }

    approveItem(id) {
        this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
        alert('Item approved successfully!');
        this.renderDashboard();
    }

    rejectItem(id) {
        this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
        alert('Item rejected successfully!');
        this.renderDashboard();
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminPortalUser');
            window.location.href = '/portal/admin.html';
        }
    }
}

// Initialize dashboard when DOM is ready
let adminDashboard;
document.addEventListener('DOMContentLoaded', function() {
    adminDashboard = new AdminDashboard();
});

