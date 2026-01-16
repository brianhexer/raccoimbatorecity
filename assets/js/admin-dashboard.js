class AdminDashboard {
    constructor() {
        try { console.log('AdminDashboard build v20260116 loaded'); } catch (e) {}
        this.admin = null;
        // Default seed data (used only when no saved data exists)
        this.pendingApprovals = [
            {
                id: 1,
                name: "Rajesh Kumar",
                email: "rajesh@example.com",
                type: "New Member",
                appliedDate: "2024-02-03"
            },
            {
                id: 2,
                name: "Priya Sharma",
                email: "priya@example.com",
                type: "Event Request",
                appliedDate: "2024-02-04"
            },
            {
                id: 3,
                name: "Arjun Patel",
                email: "arjun@example.com",
                type: "Donation Receipt",
                appliedDate: "2024-02-05"
            },
            {
                id: 4,
                name: "Neha Singh",
                email: "neha@example.com",
                type: "Content Approval",
                appliedDate: "2024-02-06"
            }
        ];

        // Load saved approvals if present
        const saved = this.loadPendingApprovals();
        if (saved) {
            this.pendingApprovals = saved;
        }

        this.adminFeatures = [
            {
                id: 1,
                title: "Member Management",
                description: "Add, edit, view and manage member details and roles",
                icon: "fas fa-users",
                count: "156 Active"
            },
            {
                id: 2,
                title: "Event Management",
                description: "Create and manage events, track registrations and attendance",
                icon: "fas fa-calendar-alt",
                count: "12 Active"
            },
            {
                id: 3,
                title: "Content Management",
                description: "Manage website content, announcements and blog posts",
                icon: "fas fa-file-alt",
                count: "24 Posts"
            },
            {
                id: 4,
                title: "Donation Tracking",
                description: "View donations, generate receipts and manage donors",
                icon: "fas fa-hand-holding-heart",
                count: "₹285K Total"
            },
            {
                id: 5,
                title: "Analytics & Reports",
                description: "View detailed analytics on members, events and donations",
                icon: "fas fa-chart-bar",
                count: "Real-time"
            },
            {
                id: 6,
                title: "System Settings",
                description: "Manage email templates, site settings and configurations",
                icon: "fas fa-cogs",
                count: "Configure"
            }
        ];

        this.init();
    }

    // Persist/Load helpers for approvals
    savePendingApprovals() {
        try {
            localStorage.setItem('adminPendingApprovals', JSON.stringify(this.pendingApprovals));
        } catch (e) {
            console.warn('Failed to save approvals', e);
        }
    }

    loadPendingApprovals() {
        try {
            const raw = localStorage.getItem('adminPendingApprovals');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    init() {
        // Check if admin is logged in
        const loggedIn = this.checkAdminLogin();
        if (!loggedIn) {
            window.location.href = "/raccoimbatorecity/portal/admin.html";
            return;
        }

        this.renderDashboard();
    }

    checkAdminLogin() {
        const adminStr = localStorage.getItem('adminPortalUser');
        if (!adminStr) {
            return false;
        }
        try {
            this.admin = JSON.parse(adminStr);
            return true;
        } catch (e) {
            return false;
        }
    }

    renderDashboard() {
        const container = document.getElementById('adminDashboardContent');

        let html = `
            <div class="container">
                <!-- Admin Header -->
                <div class="admin-header">
                    <div class="admin-header-content">
                        <h1>Admin Dashboard <span style="display:inline-block; margin-left:8px; font-size:12px; font-weight:700; color:#FF6B35; background:rgba(255,107,53,0.1); padding:3px 8px; border-radius:12px; vertical-align:middle;">v20260116</span></h1>
                        <p>Manage your organization and track key metrics</p>
                    </div>
                    <div class="admin-status">
                        <div class="status-item">
                            ${this.pendingApprovals.length}
                            <span>Pending Approvals</span>
                        </div>
                        <div class="status-item">
                            12
                            <span>Active Events</span>
                        </div>
                    </div>
                </div>

                <!-- Admin Stats Grid -->
                <div class="admin-stats">
                    <div class="admin-stat-box">
                        <div class="stat-icon-wrapper" style="background: rgba(255, 107, 53, 0.1); color: #FF6B35;">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-value">156</div>
                        <div class="stat-label">Total Members</div>
                    </div>
                    <div class="admin-stat-box">
                        <div class="stat-icon-wrapper" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="stat-value">12</div>
                        <div class="stat-label">Active Events</div>
                    </div>
                    <div class="admin-stat-box">
                        <div class="stat-icon-wrapper" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                            <i class="fas fa-hand-holding-heart"></i>
                        </div>
                        <div class="stat-value">₹285K</div>
                        <div class="stat-label">Total Donations</div>
                    </div>
                    <div class="admin-stat-box">
                        <div class="stat-icon-wrapper" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="stat-value">${this.pendingApprovals.length}</div>
                        <div class="stat-label">Pending Approvals</div>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="admin-grid">
                    <!-- Features -->
                    <div>
                        <div class="admin-card">
                            <div class="admin-card-title">
                                <div>
                                    <i class="fas fa-tools"></i>
                                    Management Features
                                </div>
                            </div>
                            ${this.adminFeatures.map(feature => `
                                <div class="admin-feature">
                                    <div class="feature-info">
                                        <div class="feature-icon">
                                            <i class="${feature.icon}"></i>
                                        </div>
                                        <div class="feature-text">
                                            <h4>${feature.title}</h4>
                                            <p>${feature.description}</p>
                                        </div>
                                    </div>
                                    <button class="feature-action" onclick="adminDashboard.openFeature('${feature.id}')">
                                        Access
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div>
                        <!-- Admin Profile -->
                        <div class="admin-card">
                            <div class="admin-profile">
                                <div class="profile-avatar">
                                    <i class="fas fa-user-shield"></i>
                                </div>
                                <div class="profile-name">Admin User</div>
                                <div class="profile-role">Administrator</div>
                            </div>

                            <div class="admin-actions">
                                <button class="admin-action-btn" onclick="adminDashboard.openSettings()">
                                    <i class="fas fa-cogs"></i> System Settings
                                </button>
                                <button class="admin-action-btn" onclick="adminDashboard.viewAnalytics()">
                                    <i class="fas fa-chart-line"></i> View Analytics
                                </button>
                                <button class="admin-action-btn" onclick="adminDashboard.viewReports()">
                                    <i class="fas fa-file-pdf"></i> Generate Reports
                                </button>
                            </div>

                            <button class="logout-btn" onclick="adminDashboard.handleLogout()">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>

                        <!-- System Status -->
                        <div class="admin-card" style="margin-top: 20px;">
                            <div class="admin-card-title">
                                <i class="fas fa-heartbeat"></i>
                                System Status
                            </div>
                            <div style="font-size: 14px; color: #64748b; line-height: 1.8;">
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div style="font-weight: 600; color: #1e293b;">Database</div>
                                        <span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span>
                                    </div>
                                </div>
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div style="font-weight: 600; color: #1e293b;">Email Service</div>
                                        <span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span>
                                    </div>
                                </div>
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div style="font-weight: 600; color: #1e293b;">API Server</div>
                                        <span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span>
                                    </div>
                                </div>
                                <div>
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div style="font-weight: 600; color: #1e293b;">Cache</div>
                                        <span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pending Approvals -->
                <div class="admin-card">
                    <div class="admin-card-title">
                        <div>
                            <i class="fas fa-clock"></i>
                            Pending Approvals
                        </div>
                        <button class="card-header-action" onclick="adminDashboard.viewAllApprovals()">
                            View All
                        </button>
                    </div>
                    ${this.pendingApprovals.map((approval, index) => `
                        <div class="pending-item">
                            <div class="pending-title">${approval.name}</div>
                            <div class="pending-info">
                                <div><strong>Type:</strong> ${approval.type}</div>
                                <div><strong>Applied:</strong> ${new Date(approval.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            </div>
                            <div class="pending-actions">
                                <button class="btn-approve" onclick="adminDashboard.approveItem(${approval.id})">
                                    <i class="fas fa-check"></i> Approve
                                </button>
                                <button class="btn-reject" onclick="adminDashboard.rejectItem(${approval.id})">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Update footer year
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    openFeature(featureId) {
        // Route feature access to implemented pages where available
        switch (String(featureId)) {
            case '5':
                return this.renderAnalyticsPage();
            case '6':
                return this.renderSettingsPage();
            case '1':
            case '2':
            case '3':
            case '4':
                // Future: implement dedicated pages
                return alert('This management section will be available soon.');
            default:
                return alert('Feature not recognized.');
        }
    }

    openSettings() {
        this.renderSettingsPage();
    }

    viewAnalytics() {
        this.renderAnalyticsPage();
    }

    viewReports() {
        this.renderReportsPage();
    }

    renderSettingsPage() {
        const container = document.getElementById('adminDashboardContent');
        
        // Get saved settings or use defaults
        const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
        const orgSettings = settings.organization || {
            name: 'Rotaract City',
            address: '123 Main Street, City',
            email: 'contact@rotaract.com',
            phone: '+91 9876543210',
            website: 'https://rotaract.com'
        };
        const emailSettings = settings.email || {
            welcomeEnabled: true,
            donationEnabled: true,
            eventEnabled: true
        };
        const systemSettings = settings.system || {
            timezone: 'Asia/Kolkata',
            dateFormat: 'DD/MM/YYYY',
            language: 'en'
        };

        container.innerHTML = `
            <div class="container">
                <div class="admin-header">
                    <button class="back-btn" onclick="adminDashboard.renderDashboard()">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <h1>System Settings</h1>
                    <p>Configure organization details, email templates, and system preferences</p>
                </div>

                <div class="settings-container">
                    <!-- Organization Settings -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-building"></i> Organization Information
                        </div>
                        <form id="orgSettingsForm" class="settings-form">
                            <div class="form-group">
                                <label>Organization Name</label>
                                <input type="text" name="name" value="${orgSettings.name}" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea name="address" rows="3" required>${orgSettings.address}</textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value="${orgSettings.email}" required>
                                </div>
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="tel" name="phone" value="${orgSettings.phone}" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Website</label>
                                <input type="url" name="website" value="${orgSettings.website}" required>
                            </div>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> Save Organization Settings
                            </button>
                        </form>
                    </div>

                    <!-- Email Settings -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-envelope"></i> Email Notifications
                        </div>
                        <form id="emailSettingsForm" class="settings-form">
                            <div class="form-checkbox">
                                <label>
                                    <input type="checkbox" name="welcomeEnabled" ${emailSettings.welcomeEnabled ? 'checked' : ''}>
                                    <span>Send welcome emails to new members</span>
                                </label>
                            </div>
                            <div class="form-checkbox">
                                <label>
                                    <input type="checkbox" name="donationEnabled" ${emailSettings.donationEnabled ? 'checked' : ''}>
                                    <span>Send donation receipt emails</span>
                                </label>
                            </div>
                            <div class="form-checkbox">
                                <label>
                                    <input type="checkbox" name="eventEnabled" ${emailSettings.eventEnabled ? 'checked' : ''}>
                                    <span>Send event confirmation emails</span>
                                </label>
                            </div>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> Save Email Settings
                            </button>
                        </form>
                    </div>

                    <!-- System Settings -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-cog"></i> System Configuration
                        </div>
                        <form id="systemSettingsForm" class="settings-form">
                            <div class="form-group">
                                <label>Timezone</label>
                                <select name="timezone">
                                    <option value="Asia/Kolkata" ${systemSettings.timezone === 'Asia/Kolkata' ? 'selected' : ''}>India (IST)</option>
                                    <option value="America/New_York" ${systemSettings.timezone === 'America/New_York' ? 'selected' : ''}>New York (EST)</option>
                                    <option value="Europe/London" ${systemSettings.timezone === 'Europe/London' ? 'selected' : ''}>London (GMT)</option>
                                    <option value="Asia/Tokyo" ${systemSettings.timezone === 'Asia/Tokyo' ? 'selected' : ''}>Tokyo (JST)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date Format</label>
                                <select name="dateFormat">
                                    <option value="DD/MM/YYYY" ${systemSettings.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY" ${systemSettings.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD" ${systemSettings.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Language</label>
                                <select name="language">
                                    <option value="en" ${systemSettings.language === 'en' ? 'selected' : ''}>English</option>
                                    <option value="hi" ${systemSettings.language === 'hi' ? 'selected' : ''}>Hindi</option>
                                    <option value="mr" ${systemSettings.language === 'mr' ? 'selected' : ''}>Marathi</option>
                                </select>
                            </div>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> Save System Settings
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Add form handlers
        document.getElementById('orgSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
            settings.organization = data;
            localStorage.setItem('adminSettings', JSON.stringify(settings));
            alert('Organization settings saved successfully!');
        });

        document.getElementById('emailSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                welcomeEnabled: formData.get('welcomeEnabled') === 'on',
                donationEnabled: formData.get('donationEnabled') === 'on',
                eventEnabled: formData.get('eventEnabled') === 'on'
            };
            const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
            settings.email = data;
            localStorage.setItem('adminSettings', JSON.stringify(settings));
            alert('Email settings saved successfully!');
        });

        document.getElementById('systemSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
            settings.system = data;
            localStorage.setItem('adminSettings', JSON.stringify(settings));
            alert('System settings saved successfully!');
        });
    }

    renderAnalyticsPage() {
        const container = document.getElementById('adminDashboardContent');
        
        // Generate sample analytics data
        const monthlyData = [
            { month: 'Jan', members: 120, donations: 45000, events: 8, volunteers: 85 },
            { month: 'Feb', members: 132, donations: 52000, events: 10, volunteers: 92 },
            { month: 'Mar', members: 145, donations: 48000, events: 9, volunteers: 98 },
            { month: 'Apr', members: 156, donations: 65000, events: 12, volunteers: 105 }
        ];

        const maxMembers = Math.max(...monthlyData.map(d => d.members));
        const maxDonations = Math.max(...monthlyData.map(d => d.donations));
        const maxEvents = Math.max(...monthlyData.map(d => d.events));
        const maxVolunteers = Math.max(...monthlyData.map(d => d.volunteers));

        container.innerHTML = `
            <div class="container">
                <div class="admin-header">
                    <button class="back-btn" onclick="adminDashboard.renderDashboard()">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <h1>Analytics Dashboard</h1>
                    <p>View detailed insights and growth metrics</p>
                </div>

                <!-- Key Metrics -->
                <div class="analytics-metrics">
                    <div class="metric-card">
                        <div class="metric-icon" style="background: rgba(255, 107, 53, 0.1); color: #FF6B35;">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">156</div>
                            <div class="metric-label">Total Members</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +12% from last month
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                            <i class="fas fa-hand-holding-heart"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">₹2.1L</div>
                            <div class="metric-label">This Month Donations</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +25% from last month
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">12</div>
                            <div class="metric-label">Events This Month</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +3 from last month
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                            <i class="fas fa-hands-helping"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">105</div>
                            <div class="metric-label">Active Volunteers</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +13 from last month
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="charts-grid">
                    <!-- Member Growth -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-chart-line"></i> Member Growth
                        </div>
                        <div class="chart-container">
                            ${monthlyData.map(data => `
                                <div class="chart-bar-group">
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar" style="height: ${(data.members / maxMembers) * 200}px; background: linear-gradient(180deg, #FF6B35, #F44708);">
                                            <span class="chart-value">${data.members}</span>
                                        </div>
                                    </div>
                                    <div class="chart-label">${data.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Donation Trends -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-chart-bar"></i> Donation Trends
                        </div>
                        <div class="chart-container">
                            ${monthlyData.map(data => `
                                <div class="chart-bar-group">
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar" style="height: ${(data.donations / maxDonations) * 200}px; background: linear-gradient(180deg, #10b981, #059669);">
                                            <span class="chart-value">₹${(data.donations / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                    <div class="chart-label">${data.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Event Participation -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-calendar-check"></i> Event Participation
                        </div>
                        <div class="chart-container">
                            ${monthlyData.map(data => `
                                <div class="chart-bar-group">
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar" style="height: ${(data.events / maxEvents) * 200}px; background: linear-gradient(180deg, #3b82f6, #2563eb);">
                                            <span class="chart-value">${data.events}</span>
                                        </div>
                                    </div>
                                    <div class="chart-label">${data.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Volunteer Hours -->
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-user-clock"></i> Active Volunteers
                        </div>
                        <div class="chart-container">
                            ${monthlyData.map(data => `
                                <div class="chart-bar-group">
                                    <div class="chart-bar-wrapper">
                                        <div class="chart-bar" style="height: ${(data.volunteers / maxVolunteers) * 200}px; background: linear-gradient(180deg, #f59e0b, #d97706);">
                                            <span class="chart-value">${data.volunteers}</span>
                                        </div>
                                    </div>
                                    <div class="chart-label">${data.month}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Export Options -->
                <div class="admin-card">
                    <div class="admin-card-title">
                        <i class="fas fa-download"></i> Export Analytics
                    </div>
                    <div class="export-options">
                        <button class="btn-secondary" onclick="adminDashboard.exportAnalytics('csv')">
                            <i class="fas fa-file-csv"></i> Export as CSV
                        </button>
                        <button class="btn-secondary" onclick="adminDashboard.exportAnalytics('pdf')">
                            <i class="fas fa-file-pdf"></i> Export as PDF
                        </button>
                        <button class="btn-secondary" onclick="adminDashboard.exportAnalytics('excel')">
                            <i class="fas fa-file-excel"></i> Export as Excel
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    exportAnalytics(format) {
        alert(`Analytics exported as ${format.toUpperCase()} successfully!`);
    }

    renderReportsPage() {
        const container = document.getElementById('adminDashboardContent');
        
        container.innerHTML = `
            <div class="container">
                <div class="admin-header">
                    <button class="back-btn" onclick="adminDashboard.renderDashboard()">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <h1>Generate Reports</h1>
                    <p>Create custom reports for members, events, donations, and more</p>
                </div>

                <!-- Report Generation Form -->
                <div class="admin-card">
                    <div class="admin-card-title">
                        <i class="fas fa-file-alt"></i> Report Configuration
                    </div>
                    <form id="reportForm" class="settings-form">
                        <div class="form-group">
                            <label>Report Type</label>
                            <select name="reportType" id="reportType" required>
                                <option value="">Select Report Type</option>
                                <option value="members">Members Report</option>
                                <option value="events">Events Report</option>
                                <option value="donations">Donations Report</option>
                                <option value="volunteers">Volunteer Hours Report</option>
                                <option value="financial">Financial Summary</option>
                                <option value="comprehensive">Comprehensive Report</option>
                            </select>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Start Date</label>
                                <input type="date" name="startDate" required>
                            </div>
                            <div class="form-group">
                                <label>End Date</label>
                                <input type="date" name="endDate" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Export Format</label>
                            <select name="format" required>
                                <option value="pdf">PDF Document</option>
                                <option value="excel">Excel Spreadsheet</option>
                                <option value="csv">CSV File</option>
                            </select>
                        </div>

                        <div class="form-checkbox">
                            <label>
                                <input type="checkbox" name="includeCharts">
                                <span>Include charts and visualizations</span>
                            </label>
                        </div>

                        <div class="form-checkbox">
                            <label>
                                <input type="checkbox" name="includeSummary" checked>
                                <span>Include executive summary</span>
                            </label>
                        </div>

                        <button type="submit" class="btn-primary">
                            <i class="fas fa-chart-pie"></i> Generate Report
                        </button>
                    </form>
                </div>

                <!-- Report Preview -->
                <div id="reportPreview" style="display: none;">
                    <div class="admin-card">
                        <div class="admin-card-title">
                            <i class="fas fa-eye"></i> Report Preview
                        </div>
                        <div id="reportPreviewContent"></div>
                    </div>
                </div>

                <!-- Recent Reports -->
                <div class="admin-card">
                    <div class="admin-card-title">
                        <i class="fas fa-history"></i> Recent Reports
                    </div>
                    <div class="recent-reports">
                        <div class="report-item">
                            <div class="report-info">
                                <div class="report-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div>
                                    <div class="report-name">Members Report - Q1 2024</div>
                                    <div class="report-date">Generated on Feb 3, 2024</div>
                                </div>
                            </div>
                            <button class="btn-secondary" onclick="adminDashboard.downloadReport('members-q1-2024')">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>

                        <div class="report-item">
                            <div class="report-info">
                                <div class="report-icon">
                                    <i class="fas fa-hand-holding-heart"></i>
                                </div>
                                <div>
                                    <div class="report-name">Donations Report - January 2024</div>
                                    <div class="report-date">Generated on Feb 1, 2024</div>
                                </div>
                            </div>
                            <button class="btn-secondary" onclick="adminDashboard.downloadReport('donations-jan-2024')">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>

                        <div class="report-item">
                            <div class="report-info">
                                <div class="report-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div>
                                    <div class="report-name">Events Report - 2023 Annual</div>
                                    <div class="report-date">Generated on Jan 15, 2024</div>
                                </div>
                            </div>
                            <button class="btn-secondary" onclick="adminDashboard.downloadReport('events-2023')">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add form handler
        document.getElementById('reportForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            // Generate report preview
            this.generateReportPreview(data);
        });
    }

    generateReportPreview(data) {
        const reportPreview = document.getElementById('reportPreview');
        const reportPreviewContent = document.getElementById('reportPreviewContent');
        
        const reportTypeNames = {
            'members': 'Members Report',
            'events': 'Events Report',
            'donations': 'Donations Report',
            'volunteers': 'Volunteer Hours Report',
            'financial': 'Financial Summary',
            'comprehensive': 'Comprehensive Report'
        };

        // Sample data based on report type
        let reportData = '';
        
        if (data.reportType === 'members') {
            reportData = `
                <div class="report-summary">
                    <h3>Members Summary</h3>
                    <div class="summary-stats">
                        <div class="summary-stat">
                            <span class="stat-label">Total Members:</span>
                            <span class="stat-value">156</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">New Members:</span>
                            <span class="stat-value">24</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Active Members:</span>
                            <span class="stat-value">142</span>
                        </div>
                    </div>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Join Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rajesh Kumar</td>
                                <td>rajesh@example.com</td>
                                <td>Jan 15, 2024</td>
                                <td><span class="status-badge active">Active</span></td>
                            </tr>
                            <tr>
                                <td>Priya Sharma</td>
                                <td>priya@example.com</td>
                                <td>Jan 20, 2024</td>
                                <td><span class="status-badge active">Active</span></td>
                            </tr>
                            <tr>
                                <td>Arjun Patel</td>
                                <td>arjun@example.com</td>
                                <td>Feb 1, 2024</td>
                                <td><span class="status-badge active">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else if (data.reportType === 'donations') {
            reportData = `
                <div class="report-summary">
                    <h3>Donations Summary</h3>
                    <div class="summary-stats">
                        <div class="summary-stat">
                            <span class="stat-label">Total Donations:</span>
                            <span class="stat-value">₹2,85,000</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Number of Donors:</span>
                            <span class="stat-value">89</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Average Donation:</span>
                            <span class="stat-value">₹3,202</span>
                        </div>
                    </div>
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th>Donor</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amit Shah</td>
                                <td>₹5,000</td>
                                <td>Feb 5, 2024</td>
                                <td>Education</td>
                            </tr>
                            <tr>
                                <td>Sunita Verma</td>
                                <td>₹3,000</td>
                                <td>Feb 3, 2024</td>
                                <td>Healthcare</td>
                            </tr>
                            <tr>
                                <td>Vikram Singh</td>
                                <td>₹10,000</td>
                                <td>Feb 1, 2024</td>
                                <td>Community Development</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            reportData = `
                <div class="report-summary">
                    <h3>${reportTypeNames[data.reportType]} Preview</h3>
                    <p>This report will include detailed information about ${reportTypeNames[data.reportType].toLowerCase()} for the selected date range.</p>
                    <div class="summary-stats">
                        <div class="summary-stat">
                            <span class="stat-label">Report Period:</span>
                            <span class="stat-value">${data.startDate} to ${data.endDate}</span>
                        </div>
                        <div class="summary-stat">
                            <span class="stat-label">Format:</span>
                            <span class="stat-value">${data.format.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        reportPreviewContent.innerHTML = reportData + `
            <div style="margin-top: 20px; text-align: center;">
                <button class="btn-primary" onclick="adminDashboard.downloadGeneratedReport('${data.reportType}', '${data.format}')">
                    <i class="fas fa-download"></i> Download Full Report
                </button>
            </div>
        `;
        
        reportPreview.style.display = 'block';
        reportPreview.scrollIntoView({ behavior: 'smooth' });
    }

    downloadReport(reportId) {
        alert(`Downloading report: ${reportId}`);
    }

    downloadGeneratedReport(reportType, format) {
        alert(`Generating and downloading ${reportType} report as ${format.toUpperCase()}...`);
    }

    viewAllApprovals() {
        const container = document.getElementById('adminDashboardContent');
        container.innerHTML = `
            <div class="container">
                <div class="admin-header">
                    <button class="back-btn" onclick="adminDashboard.renderDashboard()">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <h1>All Pending Approvals</h1>
                    <p>Review and take action on all current approval requests</p>
                </div>

                <div class="admin-card">
                    <div class="admin-card-title">
                        <i class="fas fa-clock"></i> Pending Requests (${this.pendingApprovals.length})
                    </div>
                    ${this.pendingApprovals.map(a => `
                        <div class="pending-item">
                            <div class="pending-title">${a.name}</div>
                            <div class="pending-info">
                                <div><strong>Type:</strong> ${a.type}</div>
                                <div><strong>Applied:</strong> ${new Date(a.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            </div>
                            <div class="pending-actions">
                                <button class="btn-approve" onclick="adminDashboard.approveItem(${a.id})">
                                    <i class="fas fa-check"></i> Approve
                                </button>
                                <button class="btn-reject" onclick="adminDashboard.rejectItem(${a.id})">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    approveItem(id) {
        const approval = this.pendingApprovals.find(a => a.id === id);
        if (approval && confirm(`Approve ${approval.name}'s ${approval.type}?`)) {
            this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
            this.savePendingApprovals();
            this.renderDashboard();
            alert(`${approval.name}'s request has been approved!`);
        }
    }

    rejectItem(id) {
        const approval = this.pendingApprovals.find(a => a.id === id);
        if (approval && confirm(`Reject ${approval.name}'s ${approval.type}?`)) {
            this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
            this.savePendingApprovals();
            this.renderDashboard();
            alert(`${approval.name}'s request has been rejected!`);
        }
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminPortalUser');
            window.location.href = "/raccoimbatorecity/portal/admin.html";
        }
    }
}

// Initialize admin dashboard when DOM is ready
let adminDashboard;
document.addEventListener('DOMContentLoaded', function() {
    adminDashboard = new AdminDashboard();
});
