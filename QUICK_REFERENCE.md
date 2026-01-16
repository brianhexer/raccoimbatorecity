# RACC Backend - Quick Reference Guide

## File Structure

```
wordpress-theme/
├── functions.php          # Main theme functions & backend handlers
├── config.php             # Configuration & constants
├── forms-templates.php    # Form template functions
├── header.php             # Header template
├── footer.php             # Footer template
├── front-page.php         # Homepage template
├── page.php               # Single page template
├── index.php              # Blog/posts template
├── style.css              # Theme stylesheet
└── assets/
    ├── css/
    │   └── style.css      # Main styles
    ├── js/
    │   ├── forms-handler.js   # AJAX form handlers (NEW)
    │   ├── main.js
    │   └── other scripts...
    └── vendor/            # Third-party libraries
```

## Key Backend Functions

### Forms
```php
// Display contact form
racc_contact_form();

// Display donation form
racc_donation_form();

// Display event registration (requires event_id)
racc_event_registration_form($event_id);

// Display volunteer form
racc_volunteer_form();

// Display newsletter subscription
racc_newsletter_form();

// Display statistics
racc_stats_display();
```

### Data Management
```php
// Get all statistics
$stats = racc_get_stats();

// Get email template
$template = racc_get_email_template('donation_confirmation', [
    'amount' => '5000'
]);

// Get configuration
$colors = racc_get_config('colors');
$socials = racc_get_config('social');
$contact = racc_get_config('contact');
```

### Admin Features
```php
// Check rate limiting (prevent spam)
if (!racc_check_rate_limit('contact')) {
    die('Too many submissions. Please try later.');
}

// Log debug information
racc_log('Something happened', 'info');
racc_log('An error occurred', 'error');
```

## Database Tables

### Contacts Table
```
wp_racc_contacts:
- id (INT)
- name (VARCHAR 255)
- email (VARCHAR 255)
- phone (VARCHAR 20)
- subject (VARCHAR 255)
- message (LONGTEXT)
- created_at (DATETIME)
```

### Donations Table
```
wp_racc_donations:
- id (INT)
- donor_name (VARCHAR 255)
- donor_email (VARCHAR 255)
- amount (DECIMAL 10,2)
- donation_type (VARCHAR 50)
- message (LONGTEXT)
- status (VARCHAR 50) [pending/completed/failed]
- created_at (DATETIME)
```

### Event Registrations Table
```
wp_racc_event_registrations:
- id (INT)
- event_id (BIGINT)
- name (VARCHAR 255)
- email (VARCHAR 255)
- phone (VARCHAR 20)
- registered_at (DATETIME)
```

### Volunteers Table
```
wp_racc_volunteers:
- id (INT)
- name (VARCHAR 255)
- email (VARCHAR 255)
- phone (VARCHAR 20)
- skills (LONGTEXT)
- interest_area (VARCHAR 255)
- status (VARCHAR 50) [pending/approved/rejected]
- created_at (DATETIME)
```

### Newsletter Table
```
wp_racc_newsletter:
- id (INT)
- email (VARCHAR 255) UNIQUE
- subscribed_at (DATETIME)
- status (VARCHAR 50) [active/inactive]
```

## AJAX Form Handling

All forms use AJAX with JavaScript file: `assets/js/forms-handler.js`

### Form IDs to Use in HTML
```html
<!-- Contact Form -->
<form id="contactForm">
    <input name="name" required>
    <input type="email" name="email" required>
    <input type="tel" name="phone">
    <input name="subject">
    <textarea name="message" required></textarea>
</form>

<!-- Donation Form -->
<form id="donationForm">
    <input name="donor_name" required>
    <input type="email" name="donor_email" required>
    <input type="tel" name="phone">
    <select name="donation_type">
        <option value="one-time">One Time</option>
        <option value="monthly">Monthly</option>
    </select>
    <input type="number" name="amount" required>
    <textarea name="message"></textarea>
</form>

<!-- Event Registration -->
<form id="eventRegistrationForm">
    <input type="hidden" name="event_id" value="EVENT_ID">
    <input name="name" required>
    <input type="email" name="email" required>
    <input type="tel" name="phone">
</form>

<!-- Volunteer Form -->
<form id="volunteerForm">
    <input name="name" required>
    <input type="email" name="email" required>
    <input type="tel" name="phone">
    <select name="interest_area"></select>
    <textarea name="skills" required></textarea>
</form>

<!-- Newsletter -->
<form id="newsletterForm">
    <input type="email" name="newsletter_email" required>
    <button type="submit">Subscribe</button>
</form>
```

## REST API Endpoints

**Base URL:** `yoursite.com/wp-json/racc/v1/`

### Authentication
All endpoints require WordPress admin authentication.

### Endpoints

#### GET /donations
Returns last 100 donations

```bash
curl -X GET "https://yoursite.com/wp-json/racc/v1/donations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### GET /contacts
Returns last 100 contact submissions

```bash
curl -X GET "https://yoursite.com/wp-json/racc/v1/contacts" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### GET /event-registrations
Returns last 100 event registrations

```bash
curl -X GET "https://yoursite.com/wp-json/racc/v1/event-registrations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Admin Dashboard Access

1. **Contact Submissions**
   - Path: `wp-admin/admin.php?page=racc-contacts`
   - View all contact form submissions with date, name, email, phone, subject

2. **Donations**
   - Path: `wp-admin/admin.php?page=racc-donations`
   - View donation history with amount, type, and status

3. **Event Registrations**
   - Path: `wp-admin/admin.php?page=racc-event-registrations`
   - View who registered for which event

4. **Volunteer Applications**
   - Path: `wp-admin/admin.php?page=racc-volunteers`
   - Track volunteer application status

5. **Settings**
   - Path: `wp-admin/admin.php?page=racc-settings`
   - Configure Razorpay keys and contact information

## Configuration File

Edit `wordpress-theme/config.php` to customize:
- Email templates
- Social media links
- Contact information
- Theme colors
- Security settings
- Rate limiting
- Payment settings

## Important Constants

```php
// Theme info
RACC_THEME_NAME           // Theme name
RACC_THEME_VERSION        // Current version
RACC_THEME_AUTHOR         // Author name

// Donations
RACC_MIN_DONATION         // Minimum donation amount (₹)
RACC_MAX_DONATION         // Maximum donation amount (₹)

// Security
RACC_RATE_LIMIT_ENABLED   // Enable rate limiting
RACC_RATE_LIMIT_PER_HOUR  // Max submissions per hour per IP
RACC_SEND_EMAILS          // Enable email notifications

// GDPR
RACC_GDPR_ENABLED         // Show GDPR checkbox on forms
```

## Hooks & Filters

### Actions
```php
// After donation submitted
do_action('racc_after_donation_submitted', $donation_id, $donor_info);

// After contact submitted
do_action('racc_after_contact_submitted', $contact_id, $contact_info);

// Payment verified
do_action('racc_payment_verified', $donation_id, $payment_id);
```

### Filters
```php
// Before sending email
apply_filters('racc_before_send_email', $email_args);
```

## Security Features

✅ CSRF Protection (Nonce verification)
✅ Email Validation
✅ Input Sanitization
✅ SQL Injection Prevention
✅ Rate Limiting
✅ Razorpay Signature Verification
✅ Admin Capability Checks
✅ GDPR Compliance Option

## Common Issues & Solutions

### Forms not working?
1. Check browser console for errors
2. Verify `forms-handler.js` is loaded
3. Check nonce is generated in HTML
4. Verify jQuery is loaded

### Payment failing?
1. Check Razorpay keys in Settings
2. Verify test/live mode
3. Check browser console
4. Verify Hostinger allows outbound HTTPS

### Emails not sending?
1. Check admin email setting
2. Verify Hostinger mail settings
3. Check spam folder
4. Test with wp_mail() directly

### Database errors?
1. Verify table prefix
2. Check user permissions
3. Clear cache
4. Reactivate theme

## Performance Tips

1. Enable WordPress caching
2. Use Hostinger's built-in caching
3. Compress images
4. Minimize database queries
5. Archive old submissions

## Deployment Checklist

- [ ] Upload theme to `/wp-content/themes/`
- [ ] Activate theme in WordPress
- [ ] Configure Razorpay keys
- [ ] Set contact information
- [ ] Test all forms
- [ ] Test payment flow
- [ ] Verify email notifications
- [ ] Set up email templates
- [ ] Configure WordPress permalinks
- [ ] Enable HTTPS
- [ ] Set up regular backups
- [ ] Configure security settings

## Support Resources

- WordPress Codex: https://developer.wordpress.org/
- Razorpay Docs: https://razorpay.com/docs/
- Hostinger Docs: https://www.hostinger.com/help
- Bootstrap: https://getbootstrap.com/docs/
