# RACC WordPress Theme - Setup Guide

## Installation Steps

### 1. Prerequisites
- WordPress 5.0+ installed on Hostinger
- PHP 7.4 or higher
- MySQL 5.7 or higher
- 50GB storage available (you have this)

### 2. Theme Installation

1. **Upload the theme to Hostinger:**
   - Connect via FTP or File Manager
   - Navigate to `/public_html/wp-content/themes/`
   - Upload the entire `wordpress-theme` folder and rename it to `racc` (or your preferred name)

2. **Activate the theme:**
   - Log in to WordPress admin panel
   - Go to Appearance > Themes
   - Activate the RACC theme

3. **Set up Razorpay:**
   - Create account at https://razorpay.com
   - Get your API Key and Secret Key
   - In WordPress admin: Go to RACC Submissions > Settings
   - Enter your Razorpay credentials

### 3. Database Setup
The theme automatically creates required database tables on activation:
- `wp_racc_contacts` - Contact form submissions
- `wp_racc_donations` - Donation records
- `wp_racc_event_registrations` - Event attendees
- `wp_racc_volunteers` - Volunteer applications
- `wp_racc_newsletter` - Newsletter subscribers

## Using Forms in Your Pages

### Contact Form
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_contact_form();
?>
```

### Donation Form
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_donation_form();
?>
```

### Event Registration
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_event_registration_form($event_id); // Pass event post ID
?>
```

### Volunteer Form
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_volunteer_form();
?>
```

### Newsletter Subscription
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_newsletter_form();
?>
```

### Display Statistics
```php
<?php
require_once(get_template_directory() . '/forms-templates.php');
racc_stats_display();
?>
```

Or use shortcode:
```
[racc_stats]
```

## Admin Dashboard Features

1. **RACC Submissions Menu:**
   - Contacts - View all contact form submissions
   - Donations - View donation records with amounts
   - Event Registrations - See who registered for events
   - Volunteers - Manage volunteer applications
   - Settings - Configure Razorpay and contact info

2. **Custom Post Types:**
   - Events - Manage your events
   - Projects - Showcase projects
   - Donations - Create donation campaigns
   - Team Members - Add team profiles

## REST API Endpoints

All endpoints require admin authentication.

### Get Donations
```
GET /wp-json/racc/v1/donations
```
Response:
```json
[
  {
    "id": 1,
    "donor_name": "John Doe",
    "donor_email": "john@example.com",
    "amount": "1000.00",
    "donation_type": "one-time",
    "status": "completed",
    "created_at": "2024-01-01 10:00:00"
  }
]
```

### Get Contacts
```
GET /wp-json/racc/v1/contacts
```

### Get Event Registrations
```
GET /wp-json/racc/v1/event-registrations
```

## Available Functions

### Get Stats
```php
$stats = racc_get_stats();
echo $stats['total_donations'];     // Total amount donated
echo $stats['donation_count'];      // Count of donations
echo $stats['volunteer_count'];     // Active volunteers
echo $stats['event_registration_count']; // Event registrations
echo $stats['newsletter_count'];    // Newsletter subscribers
```

### Get Email Template
```php
$email_body = racc_get_email_template('donation_confirmation', array(
    'amount' => '5000'
));
```

Available templates:
- `donation_confirmation` - Variables: {amount}
- `event_confirmation` - Variables: {event_name}
- `volunteer_confirmation` - No variables
- `contact_confirmation` - No variables

## Security Features

✓ AJAX Nonce verification on all forms
✓ Email validation
✓ Input sanitization
✓ Razorpay signature verification
✓ Admin capability checks for REST API
✓ SQL injection prevention with prepared statements

## Email Notifications

The theme automatically sends emails for:
1. Contact form submissions → Admin email
2. Donation confirmations → Donor email
3. Event registrations → Attendee email
4. Volunteer applications → Applicant (optional)

## Payment Processing

1. User fills donation form
2. Form validated on client-side and server-side
3. Donation record created in database with "pending" status
4. Razorpay payment dialog opens
5. After successful payment:
   - Razorpay signature verified
   - Donation status updated to "completed"
   - Confirmation email sent to donor

## Customization

### Adding New Custom Fields
Edit `functions.php` in the `racc_create_custom_tables()` function to add new columns.

### Styling Forms
Forms use Bootstrap classes. Customize in:
- `/assets/css/style.css`
- `/assets/scss/style.scss`

### Modifying Email Templates
Edit `racc_get_email_template()` function in `functions.php`

## Troubleshooting

### Forms not submitting?
1. Check browser console for JavaScript errors
2. Verify nonces are being generated: `wp_localize_script` is active
3. Check admin-ajax.php is accessible
4. Ensure jQuery is loaded

### Payment not working?
1. Verify Razorpay keys in Theme Settings
2. Check Razorpay account is in live mode
3. Review browser console for payment errors

### Emails not sending?
1. Check Hostinger's mail settings
2. Verify admin email in WordPress settings
3. Check spam/junk folder
4. Enable mail logging in wp-config.php for debugging

### Database errors?
1. Check WordPress database user has CREATE TABLE permission
2. Verify table prefix matches in database
3. Clear browser cache and reactivate theme

## Scheduled Tasks

For email newsletters, you can use WordPress cron:

```php
wp_schedule_event(time(), 'weekly', 'racc_send_newsletter_email');

function racc_send_newsletter_email() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_newsletter';
    $subscribers = $wpdb->get_results(
        "SELECT email FROM $table WHERE status = 'active'"
    );
    
    foreach ($subscribers as $subscriber) {
        wp_mail(
            $subscriber->email,
            'RACC Weekly Newsletter',
            'Your newsletter content here'
        );
    }
}
add_action('racc_send_newsletter_email', 'racc_send_newsletter_email');
```

## Performance Optimization

1. **Enable caching:**
   - Use Hostinger's caching feature
   - Install WP Super Cache or W3 Total Cache

2. **Optimize images:**
   - Use Shortpixel or Imagify plugin
   - Compress before uploading

3. **Minify CSS/JS:**
   - Already using minified vendor files
   - Use a minification plugin for custom CSS/JS

4. **Database optimization:**
   - Regular maintenance via WP-Optimize
   - Archive old donations if needed

## Support & Maintenance

- Regular WordPress updates
- Monitor server logs for errors
- Back up database weekly
- Test forms monthly
- Review security logs in admin

## Additional Features You Can Add

1. **Email Newsletter Plugin** - Mailchimp integration
2. **SMS Notifications** - Twilio integration
3. **Export Functions** - Export donors/volunteers to CSV
4. **Analytics** - Track form submissions with charts
5. **QR Code Donations** - For offline events
6. **Multi-language Support** - WPML plugin

---

For issues or questions, check WordPress documentation or Hostinger support.
