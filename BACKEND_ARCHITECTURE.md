# 📊 RACC Backend Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (HTML/CSS/JS)                   │
│  (Forms, Pages, Donations Page, Contact Page, etc.)        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│            AJAX Form Handler (forms-handler.js)             │
│  ├─ Validation                                              │
│  ├─ CSRF Protection (Nonce)                                │
│  └─ Razorpay Payment Integration                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│         WordPress Backend (PHP/functions.php)               │
│  ├─ Form Handlers                                           │
│  ├─ Payment Verification                                    │
│  ├─ Email Notifications                                     │
│  ├─ Database Operations                                     │
│  └─ REST API Endpoints                                      │
└──────────┬───────────────────────────────┬──────────────────┘
           │                               │
           ↓                               ↓
┌──────────────────────────┐   ┌──────────────────────────┐
│   Database (MySQL)       │   │  Email Service (SMTP)    │
│                          │   │                          │
│ ├─ Contacts             │   │ ├─ Notifications        │
│ ├─ Donations            │   │ ├─ Confirmations        │
│ ├─ Event Registrations  │   │ └─ Reminders            │
│ ├─ Volunteers           │   │                          │
│ └─ Newsletter           │   │                          │
└──────────────────────────┘   └──────────────────────────┘
                                         │
                                         ↓
                          ┌──────────────────────────┐
                          │  Razorpay API            │
                          │  (Payment Gateway)       │
                          │                          │
                          │ ├─ Process Payment      │
                          │ ├─ Verify Signature     │
                          │ └─ Return Status        │
                          └──────────────────────────┘
```

---

## Data Flow Diagrams

### Contact Form Flow
```
User fills Contact Form
    ↓
JavaScript validates & sends AJAX request
    ↓
WordPress receives POST request
    ↓
Check Nonce (CSRF Protection)
    ↓
Sanitize input
    ↓
Validate email
    ↓
Insert into wp_racc_contacts table
    ↓
Send email to Admin
    ↓
Return success to user
    ↓
Display notification to user
```

### Donation Flow (with Payment)
```
User fills Donation Form
    ↓
JavaScript validates
    ↓
Send AJAX request to create donation record
    ↓
WordPress validates & inserts into database (status: pending)
    ↓
JavaScript receives donation_id
    ↓
Open Razorpay payment dialog
    ↓
User enters payment details
    ↓
Razorpay processes payment
    ↓
Return signature & payment_id
    ↓
Send AJAX request to verify payment
    ↓
WordPress verifies Razorpay signature
    ↓
Update donation status to "completed"
    ↓
Send confirmation email to donor
    ↓
Display success message to user
```

### Event Registration Flow
```
User on Event page
    ↓
Clicks "Register Now"
    ↓
Fills Registration Form
    ↓
Submit via AJAX
    ↓
WordPress validates & inserts into wp_racc_event_registrations
    ↓
Send confirmation email to user
    ↓
Return success message
```

### Volunteer Application Flow
```
User fills Volunteer Form
    ↓
AJAX validation & submission
    ↓
WordPress stores in wp_racc_volunteers (status: pending)
    ↓
Send notification email to admin
    ↓
Admin reviews & approves/rejects
    ↓
Status updated in database
    ↓
User notified of decision (optional)
```

### Newsletter Subscription Flow
```
User enters email in Newsletter form
    ↓
AJAX validates email
    ↓
Check if already subscribed
    ↓
Insert/Update in wp_racc_newsletter
    ↓
Send welcome email (optional)
    ↓
Add to email list
    ↓
Ready for bulk newsletter campaigns
```

---

## Database Schema

### wp_racc_contacts
```
id (INT, Primary Key, Auto Increment)
name (VARCHAR 255)
email (VARCHAR 255)
phone (VARCHAR 20)
subject (VARCHAR 255)
message (LONGTEXT)
created_at (DATETIME)
```

### wp_racc_donations
```
id (INT, Primary Key, Auto Increment)
donor_name (VARCHAR 255)
donor_email (VARCHAR 255)
amount (DECIMAL 10,2)
donation_type (VARCHAR 50) [one-time/monthly/quarterly/yearly]
message (LONGTEXT)
status (VARCHAR 50) [pending/completed/failed]
created_at (DATETIME)
```

### wp_racc_event_registrations
```
id (INT, Primary Key, Auto Increment)
event_id (BIGINT)
name (VARCHAR 255)
email (VARCHAR 255)
phone (VARCHAR 20)
registered_at (DATETIME)
```

### wp_racc_volunteers
```
id (INT, Primary Key, Auto Increment)
name (VARCHAR 255)
email (VARCHAR 255)
phone (VARCHAR 20)
skills (LONGTEXT)
interest_area (VARCHAR 255)
status (VARCHAR 50) [pending/approved/rejected]
created_at (DATETIME)
```

### wp_racc_newsletter
```
id (INT, Primary Key, Auto Increment)
email (VARCHAR 255) UNIQUE
subscribed_at (DATETIME)
status (VARCHAR 50) [active/inactive]
```

---

## Admin Dashboard Structure

```
WordPress Admin
└── RACC Submissions (Main Menu)
    ├── Dashboard Overview
    ├── Contacts
    │   └── View all contact form submissions
    │       ├── Filter by date
    │       ├── Search by name/email
    │       └── Export to CSV (optional)
    ├── Donations
    │   └── View all donations
    │       ├── Total amount (completed only)
    │       ├── Filter by status
    │       ├── Filter by type
    │       └── Revenue report
    ├── Event Registrations
    │   └── View event attendees
    │       ├── Filter by event
    │       ├── Download attendee list
    │       └── Send emails to attendees
    ├── Volunteer Applications
    │   └── Manage volunteers
    │       ├── Filter by status
    │       ├── Approve/Reject
    │       └── Send bulk emails
    └── Settings
        ├── Razorpay Keys
        ├── Contact Information
        ├── Email Templates
        ├── Rate Limiting
        └── Security Settings
```

---

## API Response Examples

### POST /contact-form (AJAX)
```json
{
  "success": true,
  "data": "Thank you! Your message has been sent successfully."
}
```

### POST /donation-form (AJAX)
```json
{
  "success": true,
  "data": {
    "donation_id": 123,
    "message": "Donation recorded! Thank you for your generosity."
  }
}
```

### GET /wp-json/racc/v1/donations (REST API)
```json
[
  {
    "id": 1,
    "donor_name": "John Doe",
    "donor_email": "john@example.com",
    "amount": "5000.00",
    "donation_type": "one-time",
    "status": "completed",
    "created_at": "2024-01-01 10:00:00"
  },
  {
    "id": 2,
    "donor_name": "Jane Smith",
    "donor_email": "jane@example.com",
    "amount": "2500.00",
    "donation_type": "monthly",
    "status": "completed",
    "created_at": "2024-01-02 14:30:00"
  }
]
```

---

## Security Layers

```
User Input
    ↓
JavaScript Validation (Frontend)
    ├─ Email format check
    ├─ Required field check
    └─ Amount range check
    ↓
AJAX Request
    ├─ CSRF Token (Nonce) included
    └─ HTTPS encryption
    ↓
WordPress Backend
    ├─ Nonce verification
    ├─ Input sanitization (sanitize_*)
    ├─ Email validation (is_email)
    └─ Prepared statements (SQL)
    ↓
Payment Processing (Razorpay)
    ├─ HMAC-SHA256 signature verification
    ├─ Order ID validation
    └─ Status check
    ↓
Database Storage
    ├─ Escaped values
    ├─ Type casting
    └─ Permission checks
```

---

## Email Template System

```
racc_get_email_template()
    ├─ donation_confirmation {amount}
    ├─ event_confirmation {event_name}
    ├─ volunteer_confirmation (none)
    └─ contact_confirmation (none)
    
Emails sent by:
├─ Admin notification
├─ Donor confirmation
├─ Attendee confirmation
└─ Applicant confirmation
```

---

## Statistics Calculation

```
racc_get_stats()
    ├─ total_donations (SUM where status='completed')
    ├─ donation_count (COUNT all)
    ├─ volunteer_count (COUNT from volunteers table)
    ├─ event_registration_count (COUNT all registrations)
    ├─ contact_count (COUNT all contacts)
    └─ newsletter_count (COUNT where status='active')
    
Display via:
├─ Shortcode [racc_stats]
├─ Admin widget
└─ Dashboard cards
```

---

## Razorpay Integration Flow

```
Form Submit
    ↓
Create Donation Record (status: pending)
    ↓
Get Donation ID
    ↓
Initialize Razorpay with:
├─ API Key (public)
├─ Amount (in paise)
├─ Currency (INR)
├─ Customer info
└─ Order ID (donation_id)
    ↓
Open Payment Dialog
    ↓
User enters card/UPI details
    ↓
Payment processed
    ↓
Razorpay returns:
├─ payment_id
├─ order_id
└─ signature
    ↓
Verify Signature (HMAC-SHA256)
    ↓
If valid:
├─ Update status to "completed"
├─ Send confirmation email
└─ Display success
    ↓
If invalid:
└─ Display error & ask to retry
```

---

## Form Validation Chain

```
Frontend (JavaScript)
├─ Required fields
├─ Email format
├─ Amount range (100-100000)
└─ Phone format

    ↓

Backend (PHP)
├─ Nonce check
├─ Sanitize input
├─ Email validation (is_email)
├─ Amount validation
└─ Custom validation rules

    ↓

Database
├─ Unique constraints
├─ Type casting
└─ Foreign key checks
```

---

## Performance Optimizations

```
Frontend:
├─ Minified CSS/JS
├─ Lazy loading images
├─ Inline critical CSS
└─ Async JavaScript

Backend:
├─ Prepared statements
├─ Query optimization
├─ Transient caching
└─ Database indexing

Hosting:
├─ Server-side caching
├─ Gzip compression
├─ CDN for assets
└─ Database optimization
```

---

## Monitoring Points

```
Application Monitoring:
├─ Form submission errors
├─ Payment failures
├─ Email delivery failures
├─ Database connection errors
└─ API request errors

Database Monitoring:
├─ Query performance
├─ Table size growth
├─ Row count by table
└─ Backup status

Server Monitoring:
├─ Disk usage
├─ Memory usage
├─ CPU load
└─ Database size
```

---

## Scalability Considerations

```
Small Scale (0-1000 submissions/month):
✅ Current setup works perfectly
✅ Minimal maintenance needed
✅ Fast response times

Medium Scale (1000-10000/month):
⚠️ Consider caching implementation
⚠️ Archive old donations
⚠️ Add database indexes
⚠️ Optimize queries

Large Scale (10000+/month):
❌ May need additional services:
   ├─ Separate API server
   ├─ Email queue service
   ├─ Advanced caching (Redis)
   ├─ Database replication
   └─ CDN for static assets
```

---

**Last Updated:** January 4, 2026  
**Architecture Version:** 1.0  
**Status:** Production Ready ✅
