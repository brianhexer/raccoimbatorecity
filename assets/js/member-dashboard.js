class MemberDashboard {
    constructor() {
        this.user = null;
        this.currentView = 'overview';
        this.registeredEvents = [];
        this.myDonations = [];
        this.volunteeringHours = [];
        
        this.upcomingEvents = [
            {
                id: 1,
                title: "Community Cleanup Drive",
                date: "2024-02-10",
                location: "City Park",
                time: "09:00 AM",
                description: "Join us for a community cleanup initiative",
                status: "upcoming"
            },
            {
                id: 2,
                title: "Health Camp",
                date: "2024-02-15",
                location: "Community Center",
                time: "02:00 PM",
                description: "Free health checkup and medical assistance",
                status: "upcoming"
            },
            {
                id: 3,
                title: "Educational Workshop",
                date: "2024-02-20",
                location: "School Auditorium",
                time: "04:00 PM",
                description: "Workshop on digital literacy and skills",
                status: "upcoming"
            }
        ];

        this.recentActivities = [
            {
                type: "donation",
                description: "Donated ₹500 for Medical Assistance Program",
                date: "2024-02-05"
            },
            {
                type: "volunteer",
                description: "Volunteered 4 hours at Community Health Camp",
                date: "2024-02-02"
            },
            {
                type: "event",
                description: "Attended Environmental Awareness Seminar",
                date: "2024-01-28"
            },
            {
                type: "donation",
                description: "Donated ₹1000 for Education Initiative",
                date: "2024-01-25"
            }
        ];

        this.init();
    }

    init() {
        // Check if user is logged in
        const loggedIn = this.checkLogin();
        if (!loggedIn) {
            window.location.href = '/portal/login.html';
            return;
        }

        this.setupHeader();
        this.renderDashboard();
    }

    setupHeader() {
        const header = document.querySelector('.ul-header');
        const savedUser = localStorage.getItem('memberPortalUser');
        
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
                <a href="/home.html" style="display: inline-block;">
                    <img src="/assets/img/logo.svg" alt="logo" style="height: 40px; width: auto;">
                </a>
            </div>
            <a href="/home.html" style="
                padding: 10px 20px;
                background: linear-gradient(135deg, #FF6B35, #F44708);
                color: white;
                border: none;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                cursor: pointer;
                margin-right: 20px;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <i class="fas fa-arrow-left" style="margin-right: 8px;"></i> Back to Home
            </a>
        `;
        
        body.insertBefore(simpleHeader, body.firstChild);
    }

    checkLogin() {
        const userStr = localStorage.getItem('memberPortalUser');
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
        const container = document.getElementById('dashboardContent');
        
        if (this.currentView === 'overview') {
            this.renderOverview(container);
        } else if (this.currentView === 'profile') {
            this.renderProfile(container);
        } else if (this.currentView === 'donations') {
            this.renderDonations(container);
        } else if (this.currentView === 'volunteering') {
            this.renderVolunteering(container);
        } else if (this.currentView === 'registrations') {
            this.renderRegistrations(container);
        }
    }

    renderOverview(container) {
        const userFirstName = this.user.name.split(' ')[0];

        let html = `
            <div class="container">
                <!-- Dashboard Header -->
                <div class="dashboard-header">
                    <div class="dashboard-title">Welcome back, ${userFirstName}! 👋</div>
                    <p class="dashboard-subtitle">Here's your activity overview and upcoming opportunities</p>
                </div>

                <!-- Stats Section -->
                <div class="stats-section">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #FF6B35;"><i class="fas fa-heartbeat"></i></div>
                        <div class="stat-value">${this.user.stats.volunteering}</div>
                        <div class="stat-label">Hours Volunteered</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-hand-holding-heart"></i></div>
                        <div class="stat-value">₹${this.user.stats.donations.toLocaleString()}</div>
                        <div class="stat-label">Total Donated</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-calendar-check"></i></div>
                        <div class="stat-value">${this.user.stats.eventsAttended}</div>
                        <div class="stat-label">Events Attended</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #f59e0b;"><i class="fas fa-user-check"></i></div>
                        <div class="stat-value">Active</div>
                        <div class="stat-label">Member Status</div>
                    </div>
                </div>

                <!-- Content Grid -->
                <div class="content-grid">
                    <!-- Main Content -->
                    <div>
                        <!-- Upcoming Events -->
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-calendar-alt"></i>
                                Upcoming Events
                            </div>
                            ${this.upcomingEvents.map(event => `
                                <div class="upcoming-event">
                                    <div class="event-date">
                                        <i class="fas fa-clock"></i> ${new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${event.time}
                                    </div>
                                    <div class="event-title">${event.title}</div>
                                    <div class="event-location">
                                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                                    </div>
                                    <div style="margin-top: 10px; font-size: 13px; color: #64748b;">${event.description}</div>
                                    <button class="action-btn" style="width: 100%; margin-top: 10px;" onclick="memberDashboard.registerEvent(${event.id}, '${event.title}')">
                                        <i class="fas fa-check-circle"></i> Register Now
                                    </button>
                                </div>
                            `).join('')}
                            <a href="/upcoming-events.html" class="action-btn" style="width: 100%; margin-top: 15px; display: flex; justify-content: center; text-decoration: none;">
                                <i class="fas fa-arrow-right"></i> View All Events
                            </a>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div>
                        <!-- Profile Card -->
                        <div class="card">
                            <div class="profile-card">
                                <div class="profile-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="profile-name">${this.user.name}</div>
                                <div class="profile-role">${this.user.email}</div>
                            </div>

                            <div class="action-buttons">
                                <button class="action-btn" onclick="memberDashboard.switchView('profile')">
                                    <i class="fas fa-user-edit"></i> Edit Profile
                                </button>
                                <button class="action-btn" onclick="memberDashboard.switchView('donations')">
                                    <i class="fas fa-hands-holding-circle"></i> My Donations
                                </button>
                                <button class="action-btn" onclick="memberDashboard.switchView('volunteering')">
                                    <i class="fas fa-hand-fist"></i> Volunteering
                                </button>
                                <button class="action-btn" onclick="memberDashboard.switchView('registrations')">
                                    <i class="fas fa-clipboard-list"></i> Registrations
                                </button>
                            </div>

                            <button class="logout-btn" onclick="memberDashboard.handleLogout()">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>

                        <!-- Quick Stats -->
                        <div class="card" style="margin-top: 20px;">
                            <div class="card-title">
                                <i class="fas fa-chart-pie"></i> Impact Summary
                            </div>
                            <div style="font-size: 14px; color: #64748b; line-height: 1.8;">
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 5px;">Member Since</div>
                                    <div>January 2023</div>
                                </div>
                                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 5px;">Rank</div>
                                    <div>Active Member</div>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 5px;">Badges Earned</div>
                                    <div>
                                        <span style="display: inline-block; margin-right: 8px;"><i class="fas fa-medal" style="color: #FF6B35;"></i></span>
                                        <span style="display: inline-block; margin-right: 8px;"><i class="fas fa-heart" style="color: #ef4444;"></i></span>
                                        <span style="display: inline-block;"><i class="fas fa-leaf" style="color: #10b981;"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-history"></i> Recent Activities
                    </div>
                    ${this.recentActivities.map(activity => `
                        <div class="recent-activity">
                            <div style="display: flex; align-items: flex-start; gap: 12px;">
                                <div style="flex-shrink: 0;">
                                    ${activity.type === 'donation' ? '<i class="fas fa-heart" style="color: #ef4444; font-size: 16px; margin-top: 2px;"></i>' : 
                                      activity.type === 'volunteer' ? '<i class="fas fa-hand-fist" style="color: #FF6B35; font-size: 16px; margin-top: 2px;"></i>' :
                                      '<i class="fas fa-calendar-check" style="color: #3b82f6; font-size: 16px; margin-top: 2px;"></i>'}
                                </div>
                                <div style="flex-grow: 1;">
                                    <div style="color: #1e293b; margin-bottom: 5px;">${activity.description}</div>
                                    <div class="activity-date">${new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderProfile(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="memberDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Edit Your Profile</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 350px; gap: 30px;">
                    <div class="card">
                        <div class="card-title" style="margin-bottom: 25px;">
                            <i class="fas fa-user-circle"></i> Personal Information
                        </div>
                        <form onsubmit="memberDashboard.updateProfile(event)">
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Full Name</label>
                                <input type="text" id="profileName" value="${this.user.name}" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Email Address</label>
                                <input type="email" id="profileEmail" value="${this.user.email}" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Phone Number</label>
                                <input type="tel" id="profilePhone" value="${this.user.phone || ''}" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Bio</label>
                                <textarea id="profileBio" style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; resize: vertical; min-height: 100px;" placeholder="Tell us about yourself...">${this.user.bio || ''}</textarea>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b;">Member Since</label>
                                <div style="padding: 12px; background: #f1f5f9; border-radius: 8px; color: #64748b;">January 2023</div>
                            </div>

                            <button type="submit" class="action-btn" style="width: 100%; padding: 15px; margin-bottom: 10px;">
                                <i class="fas fa-save"></i> Save Changes
                            </button>
                            <button type="button" class="action-btn" onclick="memberDashboard.switchView('overview')" style="width: 100%; padding: 15px; background: #64748b;">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </form>
                    </div>

                    <div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-shield-alt"></i> Account Security
                            </div>
                            <div style="margin-bottom: 15px;">
                                <button class="action-btn" style="width: 100%; font-size: 13px; padding: 10px;">
                                    <i class="fas fa-key"></i> Change Password
                                </button>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <button class="action-btn" style="width: 100%; font-size: 13px; padding: 10px;">
                                    <i class="fas fa-mobile-alt"></i> Two-Factor Auth
                                </button>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <button class="action-btn" style="width: 100%; font-size: 13px; padding: 10px;">
                                    <i class="fas fa-sign-out-alt"></i> Logout All Devices
                                </button>
                            </div>
                        </div>

                        <div class="card" style="margin-top: 20px;">
                            <div class="card-title">
                                <i class="fas fa-bell"></i> Notifications
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="checkbox" checked style="width: 16px; height: 16px; cursor: pointer;">
                                    <span style="color: #1e293b;">Event Notifications</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="checkbox" checked style="width: 16px; height: 16px; cursor: pointer;">
                                    <span style="color: #1e293b;">Donation Updates</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="checkbox" checked style="width: 16px; height: 16px; cursor: pointer;">
                                    <span style="color: #1e293b;">Volunteer Opportunities</span>
                                </label>
                            </div>
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
                    <button class="action-btn" onclick="memberDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">My Donations</div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #ef4444;"><i class="fas fa-heart"></i></div>
                        <div class="stat-value">₹${this.user.stats.donations.toLocaleString()}</div>
                        <div class="stat-label">Total Given</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-list-check"></i></div>
                        <div class="stat-value">${this.recentActivities.filter(a => a.type === 'donation').length}</div>
                        <div class="stat-label">Donations Made</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-medal"></i></div>
                        <div class="stat-value">₹500</div>
                        <div class="stat-label">Avg. Per Donation</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                    <div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-history"></i> Donation History
                            </div>
                            ${this.recentActivities.filter(a => a.type === 'donation').map((donation, idx) => `
                                <div class="upcoming-event">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <div style="flex-grow: 1;">
                                            <div class="event-title" style="color: #1e293b; margin-bottom: 5px;">${donation.description}</div>
                                            <div class="event-location" style="margin-top: 5px;">
                                                <i class="fas fa-calendar-alt"></i> ${new Date(donation.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div style="margin-top: 3px; font-size: 12px; color: #64748b;">
                                                <i class="fas fa-receipt"></i> Receipt ID: RCP-${(Date.now() + idx).toString().slice(-6)}
                                            </div>
                                        </div>
                                        <div style="display: flex; gap: 8px;">
                                            <button class="action-btn" style="padding: 8px 12px; font-size: 12px;" onclick="memberDashboard.downloadReceipt(${idx})">
                                                <i class="fas fa-file-pdf"></i> Receipt
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-plus-circle"></i> Make a Donation
                            </div>
                            <form onsubmit="memberDashboard.makeDonation(event)">
                                <div style="margin-bottom: 20px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b; font-size: 13px;">Amount (₹)</label>
                                    <input type="number" id="donationAmount" min="100" step="100" placeholder="500" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b; font-size: 13px;">Program</label>
                                    <select id="donationProgram" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                                        <option>Select Program</option>
                                        <option>Medical Assistance</option>
                                        <option>Education Initiative</option>
                                        <option>Community Development</option>
                                        <option>Environmental Protection</option>
                                    </select>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                        <input type="checkbox" style="width: 16px; height: 16px; cursor: pointer;">
                                        <span style="font-size: 13px; color: #64748b;">Anonymous donation</span>
                                    </label>
                                </div>

                                <button type="submit" class="action-btn" style="width: 100%; font-size: 13px; padding: 12px;">
                                    <i class="fas fa-donate"></i> Donate Now
                                </button>
                            </form>
                            
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
                                <button class="action-btn" style="width: 100%; font-size: 13px; padding: 10px;" onclick="window.location.href='/donations.html'">
                                    <i class="fas fa-arrow-right"></i> View All Programs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderVolunteering(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="memberDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">Volunteering Opportunities</div>
                </div>

                <div class="stats-section">
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #FF6B35;"><i class="fas fa-clock"></i></div>
                        <div class="stat-value">${this.user.stats.volunteering}</div>
                        <div class="stat-label">Total Hours</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #10b981;"><i class="fas fa-project-diagram"></i></div>
                        <div class="stat-value">8</div>
                        <div class="stat-label">Projects Joined</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #3b82f6;"><i class="fas fa-star"></i></div>
                        <div class="stat-value">4.8</div>
                        <div class="stat-label">Volunteer Rating</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-icon" style="color: #f59e0b;"><i class="fas fa-target"></i></div>
                        <div class="stat-value">Next: 100</div>
                        <div class="stat-label">Hour Goal</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                    <div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-hand-fist"></i> Volunteer History
                            </div>
                            ${this.recentActivities.filter(a => a.type === 'volunteer').map(volunteer => `
                                <div class="upcoming-event">
                                    <div class="event-title" style="color: #1e293b;">${volunteer.description}</div>
                                    <div class="event-location" style="margin-top: 5px;">
                                        <i class="fas fa-calendar-alt"></i> ${new Date(volunteer.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div style="margin-top: 8px; display: flex; gap: 8px;">
                                        <button class="action-btn" style="padding: 6px 12px; font-size: 12px;">
                                            <i class="fas fa-eye"></i> Details
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <div class="card">
                            <div class="card-title">
                                <i class="fas fa-plus-circle"></i> Log Hours
                            </div>
                            <form onsubmit="memberDashboard.logVolunteerHours(event)">
                                <div style="margin-bottom: 20px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b; font-size: 13px;">Activity</label>
                                    <input type="text" id="volunteerActivity" placeholder="e.g., Community Cleanup" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b; font-size: 13px;">Hours</label>
                                    <input type="number" id="volunteerHours" min="0.5" step="0.5" value="2" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #1e293b; font-size: 13px;">Date</label>
                                    <input type="date" id="volunteerDate" value="${new Date().toISOString().split('T')[0]}" style="width: 100%; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px;" required>
                                </div>

                                <button type="submit" class="action-btn" style="width: 100%; font-size: 13px; padding: 12px;">
                                    <i class="fas fa-plus"></i> Log Hours
                                </button>
                            </form>
                        </div>

                        <div class="card" style="margin-top: 20px;">
                            <div class="card-title">
                                <i class="fas fa-search"></i> Find Opportunities
                            </div>
                            <button class="action-btn" style="width: 100%; font-size: 13px; padding: 10px;" onclick="window.location.href='/our-projects.html'">
                                <i class="fas fa-arrow-right"></i> Browse Projects
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        document.getElementById('footer-copyright-year').textContent = new Date().getFullYear();
    }

    renderRegistrations(container) {
        let html = `
            <div class="container">
                <div class="dashboard-header">
                    <button class="action-btn" onclick="memberDashboard.switchView('overview')" style="margin-bottom: 20px;">
                        <i class="fas fa-arrow-left"></i> Back to Dashboard
                    </button>
                    <div class="dashboard-title">My Event Registrations</div>
                </div>

                <div class="card" style="margin-bottom: 30px;">
                    <div class="card-title">
                        <i class="fas fa-calendar-check"></i> Registered Events
                    </div>
                    ${this.registeredEvents.length > 0 ? this.registeredEvents.map(event => `
                        <div class="upcoming-event">
                            <div class="event-date">
                                <i class="fas fa-check-circle"></i> Registered on ${new Date().toLocaleDateString()}
                            </div>
                            <div class="event-title">${event.title}</div>
                            <div class="event-location">
                                <i class="fas fa-map-marker-alt"></i> ${event.location}
                            </div>
                            <div style="margin-top: 10px;">
                                <button class="action-btn" style="margin-right: 10px;" onclick="memberDashboard.cancelRegistration(${event.id})">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </div>
                    `).join('') : '<div style="text-align: center; padding: 40px; color: #64748b;">No registrations yet</div>'}
                </div>

                <div class="card">
                    <div class="card-title">
                        <i class="fas fa-calendar-plus"></i> Register for More Events
                    </div>
                    <a href="/upcoming-events.html" class="action-btn" style="width: 100%; display: flex; justify-content: center;">
                        <i class="fas fa-arrow-right"></i> Browse All Events
                    </a>
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

    registerEvent(eventId, eventTitle) {
        const event = this.upcomingEvents.find(e => e.id === eventId);
        if (event) {
            this.registeredEvents.push(event);
            alert(`✓ Successfully registered for "${eventTitle}"!`);
            this.recentActivities.unshift({
                type: 'event',
                description: `Registered for ${eventTitle}`,
                date: new Date().toISOString().split('T')[0]
            });
        }
    }

    cancelRegistration(eventId) {
        if (confirm('Are you sure you want to cancel this registration?')) {
            this.registeredEvents = this.registeredEvents.filter(e => e.id !== eventId);
            alert('Registration cancelled successfully.');
            this.switchView('registrations');
        }
    }

    updateProfile(event) {
        event.preventDefault();
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const phone = document.getElementById('profilePhone').value;
        const bio = document.getElementById('profileBio').value;

        this.user.name = name;
        this.user.email = email;
        this.user.phone = phone;
        this.user.bio = bio;

        localStorage.setItem('memberPortalUser', JSON.stringify(this.user));
        alert('✓ Profile updated successfully!');
        this.switchView('overview');
    }

    makeDonation(event) {
        event.preventDefault();
        const amount = document.getElementById('donationAmount').value;
        const program = document.getElementById('donationProgram').value;

        if (program === 'Select Program') {
            alert('Please select a donation program');
            return;
        }

        this.recentActivities.unshift({
            type: 'donation',
            description: `Donated ₹${amount} for ${program}`,
            date: new Date().toISOString().split('T')[0]
        });

        this.user.stats.donations += parseInt(amount);
        localStorage.setItem('memberPortalUser', JSON.stringify(this.user));

        alert(`✓ Thank you! Your donation of ₹${amount} has been received successfully!`);
        this.switchView('donations');
    }

    downloadReceipt(index) {
        const donation = this.recentActivities.filter(a => a.type === 'donation')[index];
        alert(`Receipt for "${donation.description}" would be generated here.\n\nIn production, this would download a PDF receipt.`);
    }

    logVolunteerHours(event) {
        event.preventDefault();
        const activity = document.getElementById('volunteerActivity').value;
        const hours = parseFloat(document.getElementById('volunteerHours').value);
        const date = document.getElementById('volunteerDate').value;

        this.recentActivities.unshift({
            type: 'volunteer',
            description: `Volunteered ${hours} hours at ${activity}`,
            date: date
        });

        this.user.stats.volunteering += hours;
        localStorage.setItem('memberPortalUser', JSON.stringify(this.user));

        alert(`✓ Successfully logged ${hours} volunteer hours!`);
        this.switchView('volunteering');
    }

    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('memberPortalUser');
            window.location.href = '/portal/login.html';
        }
    }
}

// Initialize dashboard when DOM is ready
let memberDashboard;
document.addEventListener('DOMContentLoaded', function() {
    memberDashboard = new MemberDashboard();
});
