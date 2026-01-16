<?php
/**
 * RACC Theme Configuration File
 * Edit this file to customize theme behavior
 */

// ===== THEME CONSTANTS =====

define('RACC_THEME_NAME', 'RACC Coimbatore');
define('RACC_THEME_VERSION', '1.0.0');
define('RACC_THEME_AUTHOR', 'Rotaract Club of Coimbatore City');

// ===== FORM VALIDATION SETTINGS =====

// Minimum donation amount (in INR)
define('RACC_MIN_DONATION', 100);

// Maximum donation amount (in INR)
define('RACC_MAX_DONATION', 100000);

// ===== EMAIL SETTINGS =====

// Enable email notifications
define('RACC_SEND_EMAILS', true);

// Admin email (uses WordPress admin email by default)
// define('RACC_ADMIN_EMAIL', 'admin@example.com');

// Email templates
$RACC_EMAIL_TEMPLATES = array(
    'contact_received' => array(
        'subject' => 'We received your message',
        'from' => 'noreply@racccoimbatore.org',
    ),
    'donation_received' => array(
        'subject' => 'Donation Received - RACC Coimbatore',
        'from' => 'donations@racccoimbatore.org',
    ),
    'event_confirmed' => array(
        'subject' => 'Event Registration Confirmed',
        'from' => 'events@racccoimbatore.org',
    ),
    'volunteer_received' => array(
        'subject' => 'Volunteer Application Received',
        'from' => 'volunteers@racccoimbatore.org',
    ),
);

// ===== RAZORPAY SETTINGS =====

// Razorpay webhook secret
define('RACC_RAZORPAY_WEBHOOK_SECRET', '');

// Payment description
define('RACC_PAYMENT_DESCRIPTION', 'Donation to Rotaract Club of Coimbatore City');

// ===== FORM SETTINGS =====

// Allow file uploads in contact form
define('RACC_ALLOW_FILE_UPLOAD', false);

// Maximum file size for uploads (in MB)
define('RACC_MAX_FILE_SIZE', 5);

// Allowed file types
$RACC_ALLOWED_FILE_TYPES = array('pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png');

// ===== SECURITY SETTINGS =====

// Enable rate limiting on forms (prevent spam)
define('RACC_RATE_LIMIT_ENABLED', true);

// Maximum submissions per IP per hour
define('RACC_RATE_LIMIT_PER_HOUR', 10);

// Enable GDPR compliance (show checkbox on forms)
define('RACC_GDPR_ENABLED', true);

// ===== DATABASE SETTINGS =====

// Automatically delete old submissions after (days)
define('RACC_AUTO_DELETE_DAYS', 365);

// Enable auto-deletion
define('RACC_ENABLE_AUTO_DELETE', false);

// ===== CUSTOM COLORS =====

$RACC_THEME_COLORS = array(
    'primary' => '#3399cc',
    'secondary' => '#2c3e50',
    'success' => '#27ae60',
    'danger' => '#e74c3c',
    'warning' => '#f39c12',
    'info' => '#3498db',
);

// ===== SOCIAL MEDIA LINKS =====

$RACC_SOCIAL_LINKS = array(
    'facebook' => 'https://www.facebook.com/share/gh8cNttSyKGxhVuC/',
    'twitter' => 'https://x.com/raccbecity',
    'instagram' => 'https://www.instagram.com/raccoimbatorecity',
    'linkedin' => 'https://www.linkedin.com/company/raccoimbatorecity',
    'youtube' => 'https://www.youtube.com/@raccoimbatorecity',
    'threads' => 'https://www.threads.net/@raccoimbatorecity',
    'telegram' => 'https://t.me/raccoimbatorecity',
    'whatsapp' => 'https://whatsapp.com/channel/0029Vadde0RBPzjUzrY55x3P',
);

// ===== CONTACT INFORMATION =====

$RACC_CONTACT_INFO = array(
    'email' => get_option('admin_email'),
    'phone' => get_option('racc_phone', '+91-XXXXXXXXXX'),
    'address' => get_option('racc_address', 'Coimbatore, India'),
    'hours' => 'Monday - Friday, 9:00 AM - 5:00 PM IST',
);

// ===== SHORTCODE SETTINGS =====

// Enable shortcodes in widgets
define('RACC_SHORTCODES_IN_WIDGETS', true);

// ===== LOGGING SETTINGS =====

// Enable debug logging
define('RACC_DEBUG_LOG', false);

// Log file location
define('RACC_LOG_FILE', WP_CONTENT_DIR . '/racc-debug.log');

// ===== CUSTOM HOOKS =====

/**
 * Hook: racc_after_donation_submitted
 * Fired after a donation is recorded in database
 * 
 * Usage:
 * add_action('racc_after_donation_submitted', function($donation_id, $donor_info) {
 *     // Do something with the donation
 * }, 10, 2);
 */

/**
 * Hook: racc_after_contact_submitted
 * Fired after a contact form is submitted
 * 
 * Usage:
 * add_action('racc_after_contact_submitted', function($contact_id, $contact_info) {
 *     // Do something with the contact
 * }, 10, 2);
 */

/**
 * Hook: racc_payment_verified
 * Fired after Razorpay payment is verified
 * 
 * Usage:
 * add_action('racc_payment_verified', function($donation_id, $payment_id) {
 *     // Do something after payment
 * }, 10, 2);
 */

/**
 * Hook: racc_before_send_email
 * Fired before sending email notification
 * 
 * Usage:
 * add_filter('racc_before_send_email', function($email_args) {
 *     // Modify email before sending
 *     return $email_args;
 * });
 */

// ===== HELPER FUNCTION TO GET CONFIG =====

function racc_get_config($key, $default = '') {
    global $RACC_EMAIL_TEMPLATES, $RACC_SOCIAL_LINKS, $RACC_CONTACT_INFO, $RACC_THEME_COLORS;
    
    switch($key) {
        case 'templates':
            return $RACC_EMAIL_TEMPLATES;
        case 'social':
            return $RACC_SOCIAL_LINKS;
        case 'contact':
            return $RACC_CONTACT_INFO;
        case 'colors':
            return $RACC_THEME_COLORS;
        default:
            return $default;
    }
}

// ===== LOGGING FUNCTION =====

function racc_log($message, $type = 'info') {
    if (!RACC_DEBUG_LOG) {
        return;
    }

    $timestamp = current_time('Y-m-d H:i:s');
    $log_message = "[$timestamp] [$type] $message\n";
    
    error_log($log_message, 3, RACC_LOG_FILE);
}

// ===== RATE LIMITING FUNCTION =====

function racc_check_rate_limit($form_type) {
    if (!RACC_RATE_LIMIT_ENABLED) {
        return true;
    }

    $ip = $_SERVER['REMOTE_ADDR'];
    $key = "racc_form_{$form_type}_{$ip}";
    $count = get_transient($key);

    if ($count >= RACC_RATE_LIMIT_PER_HOUR) {
        return false;
    }

    $count = ($count ?: 0) + 1;
    set_transient($key, $count, 3600); // 1 hour

    return true;
}

// ===== INSTALLATION/ACTIVATION HOOK =====

function racc_theme_activation() {
    racc_create_custom_tables();
    
    // Set default options
    if (!get_option('racc_theme_activated')) {
        update_option('racc_admin_email', get_option('admin_email'));
        update_option('racc_theme_activated', true);
    }
    
    racc_log('Theme activated', 'info');
}

add_action('after_setup_theme', 'racc_theme_activation');

// ===== DEACTIVATION HOOK =====

function racc_theme_deactivation() {
    racc_log('Theme deactivated', 'info');
}

add_action('switch_theme', 'racc_theme_deactivation');
