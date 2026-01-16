<?php
/**
 * RACC Advanced Integration Examples
 * Include examples of advanced customizations you can make
 */

// ===== EXAMPLE 1: SEND WEBHOOK TO EXTERNAL SERVICE =====

/**
 * Log donations to external service/webhook
 * Add this to your theme's functions.php
 */
function racc_send_donation_webhook($donation_id, $donor_info) {
    $webhook_url = 'https://your-external-service.com/api/donations';
    
    $donation_data = array(
        'donation_id' => $donation_id,
        'donor_name' => $donor_info['donor_name'],
        'donor_email' => $donor_info['donor_email'],
        'amount' => $donor_info['amount'],
        'timestamp' => current_time('mysql'),
    );

    $response = wp_remote_post($webhook_url, array(
        'method' => 'POST',
        'body' => json_encode($donation_data),
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer YOUR_API_KEY',
        ),
        'sslverify' => true,
        'timeout' => 10,
    ));

    if (is_wp_error($response)) {
        error_log('Webhook failed: ' . $response->get_error_message());
    }
}

// Hook it up
// add_action('racc_after_donation_submitted', 'racc_send_donation_webhook', 10, 2);

// ===== EXAMPLE 2: SEND SMS NOTIFICATION USING TWILIO =====

/**
 * Send SMS notifications for donations
 * Requires Twilio PHP SDK
 */
function racc_send_donation_sms($donation_id, $donor_info) {
    // Requires: composer require twilio/sdk
    
    // $twilio = new Twilio\Rest\Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    // 
    // $twilio->messages->create(
    //     ADMIN_PHONE_NUMBER,
    //     array(
    //         'from' => TWILIO_PHONE_NUMBER,
    //         'body' => "New donation of ₹" . $donor_info['amount'] . " from " . $donor_info['donor_name'],
    //     )
    // );
}

// ===== EXAMPLE 3: MAILCHIMP INTEGRATION FOR NEWSLETTER =====

/**
 * Sync newsletter subscribers to Mailchimp
 * Requires: Install MailChimp for WordPress plugin OR use API directly
 */
function racc_sync_to_mailchimp($email) {
    $api_key = get_option('racc_mailchimp_api_key');
    $list_id = get_option('racc_mailchimp_list_id');

    if (!$api_key || !$list_id) {
        return;
    }

    $server = substr($api_key, strpos($api_key, '-') + 1);
    $auth = base64_encode('user:' . $api_key);

    $url = 'https://' . $server . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members';

    $email_hash = md5(strtolower($email));
    $url .= '/' . $email_hash;

    $json = json_encode(array(
        'email_address' => $email,
        'status' => 'subscribed',
    ));

    $args = array(
        'method' => 'PUT',
        'headers' => array(
            'Authorization' => 'Basic ' . $auth,
            'Content-Type' => 'application/json',
        ),
        'body' => $json,
    );

    wp_remote_request($url, $args);
}

// Hook it up
// add_action('racc_newsletter_subscribed', 'racc_sync_to_mailchimp');

// ===== EXAMPLE 4: EXPORT DONORS TO CSV =====

/**
 * Generate CSV export of all donations
 * Usage: Call this in admin via custom button
 */
function racc_export_donations_csv() {
    if (!current_user_can('manage_options')) {
        wp_die('Unauthorized');
    }

    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';
    $donations = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC");

    // Set headers for CSV
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="donations_' . date('Y-m-d') . '.csv"');

    // Open output stream
    $output = fopen('php://output', 'w');

    // Write header row
    fputcsv($output, array(
        'ID',
        'Donor Name',
        'Email',
        'Amount',
        'Type',
        'Status',
        'Date'
    ));

    // Write data rows
    foreach ($donations as $donation) {
        fputcsv($output, array(
            $donation->id,
            $donation->donor_name,
            $donation->donor_email,
            $donation->amount,
            $donation->donation_type,
            $donation->status,
            $donation->created_at,
        ));
    }

    fclose($output);
    exit;
}

// Create admin action to trigger export
// add_action('admin_action_racc_export_donations', 'racc_export_donations_csv');

// ===== EXAMPLE 5: DASHBOARD WIDGET SHOWING STATS =====

/**
 * Add custom dashboard widget for quick stats
 */
function racc_dashboard_widget() {
    $stats = racc_get_stats();
    ?>
    <div class="racc-dashboard-widget">
        <h3>RACC Stats</h3>
        <ul style="list-style: none; padding: 10px;">
            <li><strong>Total Donations:</strong> ₹<?php echo number_format($stats['total_donations'] ?? 0, 0); ?></li>
            <li><strong>Donors:</strong> <?php echo ($stats['donation_count'] ?? 0); ?></li>
            <li><strong>Volunteers:</strong> <?php echo ($stats['volunteer_count'] ?? 0); ?></li>
            <li><strong>Event Registrations:</strong> <?php echo ($stats['event_registration_count'] ?? 0); ?></li>
            <li><strong>Newsletter:</strong> <?php echo ($stats['newsletter_count'] ?? 0); ?> subscribers</li>
        </ul>
    </div>
    <?php
}

function racc_add_dashboard_widget() {
    wp_add_dashboard_widget(
        'racc_dashboard_widget',
        'RACC Statistics',
        'racc_dashboard_widget'
    );
}

// Uncomment to enable
// add_action('wp_dashboard_setup', 'racc_add_dashboard_widget');

// ===== EXAMPLE 6: MONTHLY DONATION SUMMARY EMAIL =====

/**
 * Send monthly summary to admin
 * Schedule this with: wp_schedule_event(time(), 'monthly', 'racc_send_monthly_summary');
 */
function racc_send_monthly_summary() {
    if (!function_exists('racc_get_stats')) {
        return;
    }

    $stats = racc_get_stats();
    $admin_email = get_option('admin_email');

    $subject = 'RACC Monthly Summary - ' . date('F Y');
    $message = "
    <h2>RACC Monthly Summary</h2>
    <p><strong>Period:</strong> " . date('F Y') . "</p>
    
    <h3>Financial Summary</h3>
    <ul>
    <li>Total Donations: ₹" . number_format($stats['total_donations'] ?? 0, 2) . "</li>
    <li>Total Donors: " . ($stats['donation_count'] ?? 0) . "</li>
    </ul>
    
    <h3>Engagement Summary</h3>
    <ul>
    <li>Event Registrations: " . ($stats['event_registration_count'] ?? 0) . "</li>
    <li>Volunteers: " . ($stats['volunteer_count'] ?? 0) . "</li>
    <li>Newsletter Subscribers: " . ($stats['newsletter_count'] ?? 0) . "</li>
    </ul>
    
    <p>Login to dashboard: " . admin_url() . "</p>
    ";

    wp_mail($admin_email, $subject, $message, array('Content-Type: text/html; charset=UTF-8'));
}

// Schedule monthly emails
// if (!wp_next_scheduled('racc_monthly_summary')) {
//     wp_schedule_event(time(), 'monthly', 'racc_monthly_summary');
// }
// add_action('racc_monthly_summary', 'racc_send_monthly_summary');

// ===== EXAMPLE 7: DONOR RECOGNITION WALL =====

/**
 * Display top donors on a page
 * Use shortcode: [racc_top_donors limit="10"]
 */
function racc_top_donors_shortcode($atts) {
    $atts = shortcode_atts(array(
        'limit' => 10,
    ), $atts);

    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';
    $donors = $wpdb->get_results($wpdb->prepare(
        "SELECT donor_name, SUM(amount) as total FROM $table 
         WHERE status = 'completed'
         GROUP BY donor_email
         ORDER BY total DESC
         LIMIT %d",
        $atts['limit']
    ));

    $html = '<div class="racc-donor-wall">';
    $html .= '<h2>Our Generous Supporters</h2>';
    $html .= '<div class="donor-list">';

    foreach ($donors as $donor) {
        $html .= '<div class="donor-item">';
        $html .= '<strong>' . esc_html($donor->donor_name) . '</strong>';
        $html .= '<p>₹' . number_format($donor->total, 0) . '</p>';
        $html .= '</div>';
    }

    $html .= '</div></div>';
    return $html;
}

// Uncomment to enable
// add_shortcode('racc_top_donors', 'racc_top_donors_shortcode');

// ===== EXAMPLE 8: AUTOMATED THANK YOU LETTERS =====

/**
 * Generate PDF thank you letter for donors
 * Requires: TCPDF library or MPDF library
 */
function racc_generate_donor_letter($donor_id) {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';
    $donation = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table WHERE id = %d",
        $donor_id
    ));

    if (!$donation) {
        return false;
    }

    // Using basic HTML to PDF conversion
    // For production, use: composer require mpdf/mpdf
    
    $letter = "
    <html>
    <head>
        <title>Thank You Letter</title>
    </head>
    <body>
        <p>Dear " . $donation->donor_name . ",</p>
        
        <p>We are writing to express our heartfelt gratitude for your generous donation of 
        <strong>₹" . number_format($donation->amount, 2) . "</strong>.</p>
        
        <p>Your contribution will help us continue our mission of serving the community 
        and making a positive difference in the lives of those around us.</p>
        
        <p>Thank you for your continued support and belief in our cause.</p>
        
        <p>Warm regards,<br>
        Rotaract Club of Coimbatore City</p>
    </body>
    </html>
    ";

    // Would convert to PDF here
    return $letter;
}

// ===== EXAMPLE 9: TRACK DONOR RETENTION =====

/**
 * Calculate repeat donor percentage
 */
function racc_get_repeat_donor_stats() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';

    $total_donors = $wpdb->get_var("SELECT COUNT(DISTINCT donor_email) FROM $table");
    $repeat_donors = $wpdb->get_var(
        "SELECT COUNT(DISTINCT donor_email) FROM $table 
         WHERE donor_email IN (
            SELECT donor_email FROM $table 
            GROUP BY donor_email HAVING COUNT(*) > 1
         )"
    );

    return array(
        'total_donors' => $total_donors,
        'repeat_donors' => $repeat_donors,
        'retention_percentage' => $total_donors > 0 ? ($repeat_donors / $total_donors * 100) : 0,
    );
}

// ===== EXAMPLE 10: DISCORD/SLACK WEBHOOK =====

/**
 * Send notifications to Discord/Slack channel
 */
function racc_send_discord_notification($message, $type = 'info') {
    $webhook_url = get_option('racc_discord_webhook_url');

    if (!$webhook_url) {
        return;
    }

    $colors = array(
        'success' => 3066993,  // Green
        'error' => 15158332,   // Red
        'info' => 3447003,     // Blue
        'warning' => 16776960, // Yellow
    );

    $payload = json_encode(array(
        'embeds' => array(
            array(
                'description' => $message,
                'color' => $colors[$type] ?? $colors['info'],
                'timestamp' => current_time('c'),
            )
        )
    ));

    wp_remote_post($webhook_url, array(
        'method' => 'POST',
        'headers' => array('Content-Type' => 'application/json'),
        'body' => $payload,
    ));
}

// Use in handlers:
// racc_send_discord_notification('New donation received!', 'success');

// ===== EXAMPLE 11: FORM ANALYTICS TRACKING =====

/**
 * Track form submission metrics
 */
function racc_track_form_metric($form_name, $status = 'success') {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_form_metrics';

    $wpdb->insert($table, array(
        'form_name' => $form_name,
        'status' => $status,
        'user_agent' => sanitize_text_field($_SERVER['HTTP_USER_AGENT'] ?? ''),
        'ip_address' => $_SERVER['REMOTE_ADDR'],
        'timestamp' => current_time('mysql'),
    ));
}

// ===== EXAMPLE 12: CUSTOM VALIDATION RULES =====

/**
 * Add custom validation before saving donation
 */
function racc_validate_donation_custom($donation_data) {
    $errors = array();

    // Check if donor exists and has suspicious pattern
    if (preg_match('/test|demo|example/i', $donation_data['donor_name'])) {
        $errors[] = 'Invalid donor name';
    }

    // Check if email domain is blacklisted
    $blacklisted_domains = array('tempmail.com', '10minutemail.com');
    $email_domain = substr($donation_data['donor_email'], strrpos($donation_data['donor_email'], '@') + 1);
    
    if (in_array($email_domain, $blacklisted_domains)) {
        $errors[] = 'Email domain not allowed';
    }

    return $errors;
}

// Use in donation handler
// $validation_errors = racc_validate_donation_custom($donor_info);
// if (!empty($validation_errors)) {
//     wp_send_json_error(implode(', ', $validation_errors));
// }
