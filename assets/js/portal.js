// Portal Management System
class PortalSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        // Hide preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        
        // Set copyright year
        const yearElement = document.getElementById('footer-copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        this.setupHeader();
        this.checkLogin();
        this.setupEventListeners();
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
                <a href="/raccoimbatorecity/home.html" style="display: inline-block;">
                    <img src="/assets/img/logo.svg" alt="logo" style="height: 40px; width: auto;">
                </a>
            </div>
            <a href="/raccoimbatorecity/home.html" style="
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

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('memberPortalUser', JSON.stringify(user));
            this.showAlert('Login successful! Redirecting...', 'success');
            
            // Hide header and show simple header
            const header = document.querySelector('.ul-header');
            if (header) {
                header.style.display = 'none';
            }
            const existingSimple = document.getElementById('simpleHeader');
            if (!existingSimple) {
                this.createSimpleHeader();
            }
            
            setTimeout(() => {
                window.location.href = '/portal/member-dashboard.html';
            }, 1500);
        } else {
            this.showAlert('Invalid email or password', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            this.showAlert('Passwords do not match', 'error');
            return;
        }

        // Check if email exists
        if (this.users.find(u => u.email === email)) {
            this.showAlert('Email already registered', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            role: 'Member',
            joinDate: new Date().toLocaleDateString(),
            stats: {
                volunteered: 0,
                donated: 0,
                events: 0
            }
        };

        this.users.push(newUser);
        this.saveUsers();
        
        this.currentUser = newUser;
        localStorage.setItem('portalUser', JSON.stringify(newUser));
        this.showAlert('Account created successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            this.showDashboard();
        }, 1500);
    }

    showAlert(message, type) {
        const alertDiv = document.getElementById('alertMessage');
        if (alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `alert ${type}`;
            alertDiv.style.display = 'block';
        }
    }

    showDashboard() {
        const portalContent = document.getElementById('portalContent');
        if (!portalContent) return;

        const user = this.currentUser;
        const dashboardHTML = `
            <div class="container">
                <div class="portal-login-card">
                    <div class="portal-login-header">
                        <div class="portal-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <h2>Welcome, ${user.name}!</h2>
                        <p style="margin-bottom: 10px;">Member since: ${user.joinDate}</p>
                        <p style="font-size: 13px; color: #94a3b8;">Role: ${user.role}</p>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class="fas fa-heart" style="color: #ef4444;"></i>
                            <div class="stat-value">${user.stats.volunteered}</div>
                            <div class="stat-label">Hours Volunteered</div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-donate" style="color: #10b981;"></i>
                            <div class="stat-value">₹${user.stats.donated}</div>
                            <div class="stat-label">Total Donated</div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-calendar-check" style="color: #3b82f6;"></i>
                            <div class="stat-value">${user.stats.events}</div>
                            <div class="stat-label">Events Attended</div>
                        </div>
                    </div>

                    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin: 30px 0;">
                        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b;">Quick Actions</h3>
                        <div style="display: grid; gap: 12px;">
                            <a href="upcoming-events.html" style="display: flex; align-items: center; gap: 12px; padding: 15px; background: white; border-radius: 10px; text-decoration: none; color: #FF6B35; font-weight: 600; border: 2px solid #e9ecef; transition: all 0.3s ease;">
                                <i class="fas fa-calendar-plus" style="font-size: 20px;"></i> Register for Events
                            </a>
                            <a href="donations.html" style="display: flex; align-items: center; gap: 12px; padding: 15px; background: white; border-radius: 10px; text-decoration: none; color: #FF6B35; font-weight: 600; border: 2px solid #e9ecef; transition: all 0.3s ease;">
                                <i class="fas fa-heart" style="font-size: 20px;"></i> Make a Donation
                            </a>
                            <a href="our-projects.html" style="display: flex; align-items: center; gap: 12px; padding: 15px; background: white; border-radius: 10px; text-decoration: none; color: #FF6B35; font-weight: 600; border: 2px solid #e9ecef; transition: all 0.3s ease;">
                                <i class="fas fa-users" style="font-size: 20px;"></i> View Projects
                            </a>
                        </div>
                    </div>

                    <button class="logout-btn" onclick="portalSystem.handleLogout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;

        portalContent.innerHTML = dashboardHTML;
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('memberPortalUser');
        window.location.href = '/portal/';
    }

    checkLogin() {
        const savedUser = localStorage.getItem('memberPortalUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            window.location.href = '/member-dashboard.html';
        }
    }

    loadUsers() {
        const saved = localStorage.getItem('portalUsers');
        if (saved) {
            return JSON.parse(saved);
        }

        // Initialize with demo user
        return [
            {
                id: 1,
                name: 'Demo User',
                email: 'demo@rotaract.com',
                phone: '+91 9876543210',
                password: 'demo123',
                role: 'volunteer',
                joinDate: '2025-01-01',
                stats: {
                    volunteering: 24,
                    donations: 5000,
                    eventsAttended: 8
                }
            }
        ];
    }

    saveUsers() {
        localStorage.setItem('portalUsers', JSON.stringify(this.users));
    }
}

// Initialize portal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portalSystem = new PortalSystem();
    });
} else {
    window.portalSystem = new PortalSystem();
}

