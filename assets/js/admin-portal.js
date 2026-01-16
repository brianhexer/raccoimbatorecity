// Admin Portal System
class AdminPortalSystem {
    constructor() {
        this.adminUsers = [
            {
                email: 'admin@rotaract.com',
                password: 'admin123',
                name: 'Admin User',
                role: 'Administrator',
                stats: {
                    totalMembers: 156,
                    activeEvents: 12,
                    totalDonations: 285000,
                    pendingApprovals: 8
                }
            }
        ];
        this.init();
    }

    init() {
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Set copyright year
        const yearElement = document.getElementById('footer-copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        this.setupHeader();
        this.checkAdminLogin();
    }

    setupHeader() {
        const header = document.querySelector('.ul-header');
        const savedAdmin = localStorage.getItem('adminPortalUser');
        
        if (savedAdmin && header) {
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

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;
        
        // Validate inputs
        if (!email || !password) {
            this.showAlert('Please enter both email and password', 'error');
            return;
        }

        // Check credentials
        const admin = this.adminUsers.find(a => a.email === email && a.password === password);
        
        if (admin) {
            // Store admin data
            localStorage.setItem('adminPortalUser', JSON.stringify({
                name: admin.name,
                email: admin.email,
                role: admin.role,
                stats: admin.stats,
                loginTime: new Date().toISOString()
            }));
            
            // Hide header and show simple header
            const header = document.querySelector('.ul-header');
            if (header) {
                header.style.display = 'none';
            }
            const existingSimple = document.getElementById('simpleHeader');
            if (!existingSimple) {
                this.createSimpleHeader();
            }
            
            this.showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = '/portal/admin-dashboard.html';
            }, 1000);
        } else {
            this.showAlert('Invalid email or password. Please try again.', 'error');
        }
    }

    checkAdminLogin() {
        const adminUser = localStorage.getItem('adminPortalUser');
        if (adminUser) {
            window.location.href = '/admin-dashboard.html';
        }
    }

    showAdminDashboard() {
        const adminUser = JSON.parse(localStorage.getItem('adminUser'));
        
        const dashboardHTML = `
            <div class="portal-login-card">
                <div class="portal-login-header">
                    <div class="portal-icon">
                        <i class="fas fa-user-shield"></i>
                    </div>
                    <h2>Welcome, ${adminUser.name}</h2>
                    <p style="margin-bottom: 10px;">${adminUser.role}</p>
                    <p style="font-size: 13px; color: #94a3b8;">Last login: ${new Date(adminUser.loginTime).toLocaleString()}</p>
                </div>

                <div class="dashboard-stats" style="margin: 30px 0;">
                    <div class="stat-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div class="stat-box" style="background: #f0f9ff; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #bae6fd;">
                            <i class="fas fa-users" style="font-size: 32px; color: #0284c7; margin-bottom: 12px;"></i>
                            <div style="font-size: 28px; font-weight: 700; color: #0c4a6e; margin-bottom: 8px;">${adminUser.stats.totalMembers}</div>
                            <div style="font-size: 13px; color: #0c4a6e; font-weight: 600;">Total Members</div>
                        </div>
                        <div class="stat-box" style="background: #fef3c7; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #fde68a;">
                            <i class="fas fa-calendar-check" style="font-size: 32px; color: #d97706; margin-bottom: 12px;"></i>
                            <div style="font-size: 28px; font-weight: 700; color: #92400e; margin-bottom: 8px;">${adminUser.stats.activeEvents}</div>
                            <div style="font-size: 13px; color: #92400e; font-weight: 600;">Active Events</div>
                        </div>
                        <div class="stat-box" style="background: #dcfce7; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #bbf7d0;">
                            <i class="fas fa-dollar-sign" style="font-size: 32px; color: #16a34a; margin-bottom: 12px;"></i>
                            <div style="font-size: 28px; font-weight: 700; color: #14532d; margin-bottom: 8px;">₹${adminUser.stats.totalDonations.toLocaleString()}</div>
                            <div style="font-size: 13px; color: #14532d; font-weight: 600;">Total Donations</div>
                        </div>
                        <div class="stat-box" style="background: #fee2e2; padding: 25px; border-radius: 12px; text-align: center; border: 2px solid #fecaca;">
                            <i class="fas fa-clock" style="font-size: 32px; color: #dc2626; margin-bottom: 12px;"></i>
                            <div style="font-size: 28px; font-weight: 700; color: #7f1d1d; margin-bottom: 8px;">${adminUser.stats.pendingApprovals}</div>
                            <div style="font-size: 13px; color: #7f1d1d; font-weight: 600;">Pending Approvals</div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions" style="display: grid; gap: 15px; margin-top: 30px;">
                    <button onclick="window.location.href='#members'" class="dashboard-action-btn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #0284c7, #0369a1); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                        <i class="fas fa-users-cog"></i> Manage Members
                    </button>
                    <button onclick="window.location.href='#events'" class="dashboard-action-btn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #d97706, #b45309); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                        <i class="fas fa-calendar-alt"></i> Manage Events
                    </button>
                    <button onclick="window.location.href='#content'" class="dashboard-action-btn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                        <i class="fas fa-file-alt"></i> Manage Content
                    </button>
                    <button onclick="adminPortal.logout()" class="dashboard-action-btn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #dc2626, #991b1b); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        `;

        document.getElementById('portalContent').innerHTML = `
            <div class="container">
                ${dashboardHTML}
            </div>
        `;

        // Add hover effects
        const actionBtns = document.querySelectorAll('.dashboard-action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    logout() {
        localStorage.removeItem('adminUser');
        window.location.reload();
    }

    showAlert(message, type) {
        const alertDiv = document.getElementById('alertMessage');
        alertDiv.textContent = message;
        alertDiv.className = `alert ${type}`;
        alertDiv.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 2000);
        }
    }
}

// Initialize admin portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPortal = new AdminPortalSystem();
});

