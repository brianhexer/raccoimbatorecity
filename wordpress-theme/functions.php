<?php

// Include Content Management Portal
require_once(get_template_directory() . '/content-portal.php');

function racc_enqueue_assets() {
    // Styles
    wp_enqueue_style('flaticon', get_template_directory_uri() . '/assets/icon/flaticon_charitics.css');
    wp_enqueue_style('bootstrap', get_template_directory_uri() . '/assets/vendor/bootstrap/bootstrap.min.css');
    wp_enqueue_style('splide', get_template_directory_uri() . '/assets/vendor/splide/splide.min.css');
    wp_enqueue_style('swiper', get_template_directory_uri() . '/assets/vendor/swiper/swiper-bundle.min.css');
    wp_enqueue_style('slimselect', get_template_directory_uri() . '/assets/vendor/slim-select/slimselect.css');
    wp_enqueue_style('animate', get_template_directory_uri() . '/assets/vendor/animate-wow/animate.min.css');
    wp_enqueue_style('flatpickr', get_template_directory_uri() . '/assets/vendor/flatpickr/flatpickr.min.css');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
    wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/style.css');
    wp_enqueue_style('theme-style', get_stylesheet_uri()); // Loads style.css

    // Scripts
    wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/assets/vendor/bootstrap/bootstrap.bundle.min.js', array(), null, true);
    wp_enqueue_script('splide-js', get_template_directory_uri() . '/assets/vendor/splide/splide.min.js', array(), null, true);
    wp_enqueue_script('splide-auto-scroll', get_template_directory_uri() . '/assets/vendor/splide/splide-extension-auto-scroll.min.js', array('splide-js'), null, true);
    wp_enqueue_script('swiper-js', get_template_directory_uri() . '/assets/vendor/swiper/swiper-bundle.min.js', array(), null, true);
    wp_enqueue_script('slimselect-js', get_template_directory_uri() . '/assets/vendor/slim-select/slimselect.min.js', array(), null, true);
    wp_enqueue_script('wow-js', get_template_directory_uri() . '/assets/vendor/animate-wow/wow.min.js', array(), null, true);
    wp_enqueue_script('splittype', get_template_directory_uri() . '/assets/vendor/splittype/index.min.js', array(), null, true);
    wp_enqueue_script('mixitup', get_template_directory_uri() . '/assets/vendor/mixitup/mixitup.min.js', array(), null, true);
    wp_enqueue_script('fslightbox', get_template_directory_uri() . '/assets/vendor/fslightbox/fslightbox.js', array(), null, true);
    wp_enqueue_script('flatpickr-js', get_template_directory_uri() . '/assets/vendor/flatpickr/flatpickr.js', array(), null, true);

    // Custom Scripts
    wp_enqueue_script('main-js', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), null, true);
    wp_enqueue_script('tab-js', get_template_directory_uri() . '/assets/js/tab.js', array(), null, true);
    wp_enqueue_script('accordion-js', get_template_directory_uri() . '/assets/js/accordion.js', array(), null, true);
    wp_enqueue_script('progressbar-js', get_template_directory_uri() . '/assets/js/progressbar.js', array(), null, true);
    wp_enqueue_script('donate-form-js', get_template_directory_uri() . '/assets/js/donate-form.js', array(), null, true);
    wp_enqueue_script('forms-handler-js', get_template_directory_uri() . '/assets/js/forms-handler.js', array('jquery'), null, true);
    
    // Razorpay Payment Gateway
    wp_enqueue_script('razorpay', 'https://checkout.razorpay.com/v1/checkout.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'racc_enqueue_assets');

function racc_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'racc'),
    ));
}
add_action('after_setup_theme', 'racc_theme_setup');

// ===== CUSTOM POST TYPES =====

function racc_register_post_types() {
    // Events Post Type
    register_post_type('event', array(
        'labels' => array(
            'name' => 'Events',
            'singular_name' => 'Event',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-calendar-alt',
        'rewrite' => array('slug' => 'events'),
    ));

    // Projects Post Type
    register_post_type('project', array(
        'labels' => array(
            'name' => 'Projects',
            'singular_name' => 'Project',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-briefcase',
        'rewrite' => array('slug' => 'projects'),
    ));

    // Donations Post Type
    register_post_type('donation', array(
        'labels' => array(
            'name' => 'Donations',
            'singular_name' => 'Donation',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-heart',
        'rewrite' => array('slug' => 'donations'),
    ));

    // Team Post Type
    register_post_type('team_member', array(
        'labels' => array(
            'name' => 'Team Members',
            'singular_name' => 'Team Member',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-groups',
        'rewrite' => array('slug' => 'team'),
    ));
}
add_action('init', 'racc_register_post_types');

// ===== CUSTOM TAXONOMIES =====

function racc_register_taxonomies() {
    register_taxonomy('event_category', 'event', array(
        'label' => 'Event Categories',
        'rewrite' => array('slug' => 'event-category'),
        'hierarchical' => true,
    ));

    register_taxonomy('project_category', 'project', array(
        'label' => 'Project Categories',
        'rewrite' => array('slug' => 'project-category'),
        'hierarchical' => true,
    ));
}
add_action('init', 'racc_register_taxonomies');

// ===== CONTACT FORM HANDLER =====

function racc_handle_contact_form() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'submit_contact') {
        check_ajax_referer('racc_contact_nonce', 'nonce');

        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $subject = sanitize_text_field($_POST['subject'] ?? '');
        $message = sanitize_textarea_field($_POST['message'] ?? '');

        if (!$name || !$email || !$message) {
            wp_send_json_error('Please fill in all required fields');
            return;
        }

        if (!is_email($email)) {
            wp_send_json_error('Please enter a valid email address');
            return;
        }

        // Save to database
        global $wpdb;
        $table = $wpdb->prefix . 'racc_contacts';
        
        $wpdb->insert($table, array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => $subject,
            'message' => $message,
            'created_at' => current_time('mysql'),
        ));

        // Send email to admin
        $admin_email = get_option('admin_email');
        $headers = array('Content-Type: text/html; charset=UTF-8');
        
        $email_body = "<h2>New Contact Form Submission</h2>";
        $email_body .= "<p><strong>Name:</strong> $name</p>";
        $email_body .= "<p><strong>Email:</strong> $email</p>";
        $email_body .= "<p><strong>Phone:</strong> $phone</p>";
        $email_body .= "<p><strong>Subject:</strong> $subject</p>";
        $email_body .= "<p><strong>Message:</strong></p>";
        $email_body .= "<p>" . nl2br($message) . "</p>";

        wp_mail($admin_email, "New Contact: $subject", $email_body, $headers);

        wp_send_json_success('Thank you! Your message has been sent successfully.');
    }
}
add_action('wp_loaded', 'racc_handle_contact_form');

// ===== DONATION HANDLER =====

function racc_handle_donation() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'submit_donation') {
        check_ajax_referer('racc_donation_nonce', 'nonce');

        $donor_name = sanitize_text_field($_POST['donor_name'] ?? '');
        $donor_email = sanitize_email($_POST['donor_email'] ?? '');
        $amount = floatval($_POST['amount'] ?? 0);
        $donation_type = sanitize_text_field($_POST['donation_type'] ?? 'one-time');
        $message = sanitize_textarea_field($_POST['message'] ?? '');

        if (!$donor_name || !$donor_email || $amount <= 0) {
            wp_send_json_error('Please fill in all required fields with valid values');
            return;
        }

        // Save to database
        global $wpdb;
        $table = $wpdb->prefix . 'racc_donations';
        
        $wpdb->insert($table, array(
            'donor_name' => $donor_name,
            'donor_email' => $donor_email,
            'amount' => $amount,
            'donation_type' => $donation_type,
            'message' => $message,
            'status' => 'pending',
            'created_at' => current_time('mysql'),
        ));

        $donation_id = $wpdb->insert_id;

        wp_send_json_success(array(
            'donation_id' => $donation_id,
            'message' => 'Donation recorded! Thank you for your generosity.'
        ));
    }
}
add_action('wp_loaded', 'racc_handle_donation');

// ===== EVENT REGISTRATION HANDLER =====

function racc_handle_event_registration() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register_event') {
        check_ajax_referer('racc_event_nonce', 'nonce');

        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $event_id = intval($_POST['event_id'] ?? 0);

        if (!$name || !$email || !$event_id) {
            wp_send_json_error('Please fill in all required fields');
            return;
        }

        global $wpdb;
        $table = $wpdb->prefix . 'racc_event_registrations';
        
        $wpdb->insert($table, array(
            'event_id' => $event_id,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'registered_at' => current_time('mysql'),
        ));

        // Send confirmation email
        $admin_email = get_option('admin_email');
        $event_title = get_the_title($event_id);
        wp_mail($email, "Event Registration Confirmation - $event_title", "Thank you for registering for $event_title. We look forward to seeing you!");

        wp_send_json_success('Registration successful! Check your email for confirmation.');
    }
}
add_action('wp_loaded', 'racc_handle_event_registration');

// ===== VOLUNTEER APPLICATION HANDLER =====

function racc_handle_volunteer_application() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'apply_volunteer') {
        check_ajax_referer('racc_volunteer_nonce', 'nonce');

        $name = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        $phone = sanitize_text_field($_POST['phone'] ?? '');
        $skills = sanitize_textarea_field($_POST['skills'] ?? '');
        $interest_area = sanitize_text_field($_POST['interest_area'] ?? '');

        if (!$name || !$email || !$skills) {
            wp_send_json_error('Please fill in all required fields');
            return;
        }

        global $wpdb;
        $table = $wpdb->prefix . 'racc_volunteers';
        
        $wpdb->insert($table, array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'skills' => $skills,
            'interest_area' => $interest_area,
            'status' => 'pending',
            'created_at' => current_time('mysql'),
        ));

        wp_send_json_success('Thank you for your interest! We will review your application and contact you soon.');
    }
}
add_action('wp_loaded', 'racc_handle_volunteer_application');

// ===== CREATE CUSTOM TABLES ON THEME ACTIVATION =====

function racc_create_custom_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();

    // Contacts Table
    $contacts_table = $wpdb->prefix . 'racc_contacts';
    if ($wpdb->get_var("SHOW TABLES LIKE '$contacts_table'") != $contacts_table) {
        $sql = "CREATE TABLE $contacts_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(20),
            subject varchar(255),
            message longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Donations Table
    $donations_table = $wpdb->prefix . 'racc_donations';
    if ($wpdb->get_var("SHOW TABLES LIKE '$donations_table'") != $donations_table) {
        $sql = "CREATE TABLE $donations_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            donor_name varchar(255) NOT NULL,
            donor_email varchar(255) NOT NULL,
            amount decimal(10, 2) NOT NULL,
            donation_type varchar(50),
            message longtext,
            status varchar(50) DEFAULT 'pending',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Event Registrations Table
    $event_table = $wpdb->prefix . 'racc_event_registrations';
    if ($wpdb->get_var("SHOW TABLES LIKE '$event_table'") != $event_table) {
        $sql = "CREATE TABLE $event_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            event_id bigint(20) NOT NULL,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(20),
            registered_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    // Volunteers Table
    $volunteers_table = $wpdb->prefix . 'racc_volunteers';
    if ($wpdb->get_var("SHOW TABLES LIKE '$volunteers_table'") != $volunteers_table) {
        $sql = "CREATE TABLE $volunteers_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(20),
            skills longtext NOT NULL,
            interest_area varchar(255),
            status varchar(50) DEFAULT 'pending',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
add_action('after_setup_theme', 'racc_create_custom_tables');

// ===== ENQUEUE AJAX NONCES =====

function racc_enqueue_nonces() {
    wp_localize_script('main-js', 'racc_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'contact_nonce' => wp_create_nonce('racc_contact_nonce'),
        'donation_nonce' => wp_create_nonce('racc_donation_nonce'),
        'event_nonce' => wp_create_nonce('racc_event_nonce'),
        'volunteer_nonce' => wp_create_nonce('racc_volunteer_nonce'),
        'newsletter_nonce' => wp_create_nonce('racc_newsletter_nonce'),
        'razorpay_key' => get_option('racc_razorpay_key'),
        'logo_url' => get_template_directory_uri() . '/assets/img/logo.svg',
    ));
}
add_action('wp_enqueue_scripts', 'racc_enqueue_nonces');
// ===== ADMIN PAGES FOR SUBMISSIONS =====

function racc_admin_menu() {
    add_menu_page('RACC Submissions', 'RACC Submissions', 'manage_options', 'racc-submissions', 'racc_submissions_page', 'dashicons-inbox');
    add_submenu_page('racc-submissions', 'Contact Submissions', 'Contacts', 'manage_options', 'racc-contacts', 'racc_contacts_page');
    add_submenu_page('racc-submissions', 'Donations', 'Donations', 'manage_options', 'racc-donations', 'racc_donations_page');
    add_submenu_page('racc-submissions', 'Event Registrations', 'Event Registrations', 'manage_options', 'racc-event-registrations', 'racc_event_registrations_page');
    add_submenu_page('racc-submissions', 'Volunteer Applications', 'Volunteers', 'manage_options', 'racc-volunteers', 'racc_volunteers_page');
}
add_action('admin_menu', 'racc_admin_menu');

function racc_submissions_page() {
    echo '<div class="wrap"><h1>RACC Submissions Dashboard</h1><p>Select a submission type from the menu.</p></div>';
}

function racc_contacts_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_contacts';
    $contacts = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC");
    
    echo '<div class="wrap"><h1>Contact Form Submissions</h1>';
    echo '<table class="wp-list-table widefat striped">';
    echo '<thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Date</th></tr></thead>';
    echo '<tbody>';
    foreach ($contacts as $contact) {
        echo '<tr>';
        echo '<td>' . esc_html($contact->name) . '</td>';
        echo '<td>' . esc_html($contact->email) . '</td>';
        echo '<td>' . esc_html($contact->phone) . '</td>';
        echo '<td>' . esc_html($contact->subject) . '</td>';
        echo '<td>' . esc_html($contact->created_at) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

function racc_donations_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';
    $donations = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC");
    
    echo '<div class="wrap"><h1>Donations</h1>';
    echo '<table class="wp-list-table widefat striped">';
    echo '<thead><tr><th>Donor Name</th><th>Email</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>';
    echo '<tbody>';
    foreach ($donations as $donation) {
        echo '<tr>';
        echo '<td>' . esc_html($donation->donor_name) . '</td>';
        echo '<td>' . esc_html($donation->donor_email) . '</td>';
        echo '<td>₹' . esc_html($donation->amount) . '</td>';
        echo '<td>' . esc_html($donation->donation_type) . '</td>';
        echo '<td>' . esc_html($donation->status) . '</td>';
        echo '<td>' . esc_html($donation->created_at) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

function racc_event_registrations_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_event_registrations';
    $registrations = $wpdb->get_results("SELECT * FROM $table ORDER BY registered_at DESC");
    
    echo '<div class="wrap"><h1>Event Registrations</h1>';
    echo '<table class="wp-list-table widefat striped">';
    echo '<thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Event ID</th><th>Date</th></tr></thead>';
    echo '<tbody>';
    foreach ($registrations as $reg) {
        echo '<tr>';
        echo '<td>' . esc_html($reg->name) . '</td>';
        echo '<td>' . esc_html($reg->email) . '</td>';
        echo '<td>' . esc_html($reg->phone) . '</td>';
        echo '<td>' . esc_html($reg->event_id) . '</td>';
        echo '<td>' . esc_html($reg->registered_at) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

function racc_volunteers_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_volunteers';
    $volunteers = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC");
    
    echo '<div class="wrap"><h1>Volunteer Applications</h1>';
    echo '<table class="wp-list-table widefat striped">';
    echo '<thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Interest Area</th><th>Status</th><th>Date</th></tr></thead>';
    echo '<tbody>';
    foreach ($volunteers as $volunteer) {
        echo '<tr>';
        echo '<td>' . esc_html($volunteer->name) . '</td>';
        echo '<td>' . esc_html($volunteer->email) . '</td>';
        echo '<td>' . esc_html($volunteer->phone) . '</td>';
        echo '<td>' . esc_html($volunteer->interest_area) . '</td>';
        echo '<td>' . esc_html($volunteer->status) . '</td>';
        echo '<td>' . esc_html($volunteer->created_at) . '</td>';
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

// ===== RAZORPAY PAYMENT VERIFICATION =====

function racc_verify_payment() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'verify_payment') {
        check_ajax_referer('racc_donation_nonce', 'nonce');

        $razorpay_payment_id = sanitize_text_field($_POST['razorpay_payment_id'] ?? '');
        $razorpay_order_id = sanitize_text_field($_POST['razorpay_order_id'] ?? '');
        $razorpay_signature = sanitize_text_field($_POST['razorpay_signature'] ?? '');
        $donation_id = intval($_POST['donation_id'] ?? 0);

        if (!$razorpay_payment_id || !$razorpay_order_id || !$razorpay_signature) {
            wp_send_json_error('Invalid payment details');
            return;
        }

        // Verify signature
        $key_secret = get_option('racc_razorpay_secret_key');
        $expected_signature = hash_hmac('sha256', "$razorpay_order_id|$razorpay_payment_id", $key_secret);

        if ($razorpay_signature !== $expected_signature) {
            wp_send_json_error('Payment signature verification failed');
            return;
        }

        // Update donation status
        global $wpdb;
        $table = $wpdb->prefix . 'racc_donations';
        $wpdb->update($table, array(
            'status' => 'completed',
        ), array('id' => $donation_id));

        // Send confirmation email
        $donation = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE id = %d", $donation_id));
        if ($donation) {
            $subject = 'Donation Confirmation - RACC Coimbatore';
            $message = "Thank you for your generous donation of ₹" . $donation->amount . "!\n\n";
            $message .= "Payment ID: $razorpay_payment_id\n";
            $message .= "Your contribution will help us create a positive impact in the community.\n";
            $message .= "We will send you receipt via email shortly.";

            wp_mail($donation->donor_email, $subject, $message);
        }

        wp_send_json_success('Payment verified successfully');
    }
}
add_action('wp_loaded', 'racc_verify_payment');

// ===== NEWSLETTER SUBSCRIPTION HANDLER =====

function racc_create_newsletter_table() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table = $wpdb->prefix . 'racc_newsletter';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table'") != $table) {
        $sql = "CREATE TABLE $table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            email varchar(255) NOT NULL UNIQUE,
            subscribed_at datetime DEFAULT CURRENT_TIMESTAMP,
            status varchar(50) DEFAULT 'active',
            PRIMARY KEY (id)
        ) $charset_collate;";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
add_action('after_setup_theme', 'racc_create_newsletter_table');

function racc_handle_newsletter_subscription() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'subscribe_newsletter') {
        check_ajax_referer('racc_newsletter_nonce', 'nonce');

        $email = sanitize_email($_POST['email'] ?? '');

        if (!is_email($email)) {
            wp_send_json_error('Please enter a valid email address');
            return;
        }

        global $wpdb;
        $table = $wpdb->prefix . 'racc_newsletter';
        
        // Check if already subscribed
        $existing = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE email = %s", $email));
        if ($existing && $existing->status === 'active') {
            wp_send_json_error('You are already subscribed');
            return;
        }

        // Update or insert
        $wpdb->query($wpdb->prepare(
            "INSERT INTO $table (email, status) VALUES (%s, 'active')
            ON DUPLICATE KEY UPDATE status = 'active'",
            $email
        ));

        wp_send_json_success('Successfully subscribed!');
    }
}
add_action('wp_loaded', 'racc_handle_newsletter_subscription');

// ===== THEME SETTINGS PAGE =====

function racc_register_settings() {
    register_setting('racc_settings', 'racc_razorpay_key');
    register_setting('racc_settings', 'racc_razorpay_secret_key');
    register_setting('racc_settings', 'racc_admin_email');
    register_setting('racc_settings', 'racc_phone');
    register_setting('racc_settings', 'racc_address');
}
add_action('admin_init', 'racc_register_settings');

function racc_options_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    ?>
    <div class="wrap">
        <h1>RACC Theme Settings</h1>
        <form action="options.php" method="post">
            <?php settings_fields('racc_settings'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="racc_razorpay_key">Razorpay Key</label>
                    </th>
                    <td>
                        <input type="text" id="racc_razorpay_key" name="racc_razorpay_key" 
                               value="<?php echo esc_attr(get_option('racc_razorpay_key')); ?>" class="large-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="racc_razorpay_secret_key">Razorpay Secret Key</label>
                    </th>
                    <td>
                        <input type="password" id="racc_razorpay_secret_key" name="racc_razorpay_secret_key" 
                               value="<?php echo esc_attr(get_option('racc_razorpay_secret_key')); ?>" class="large-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="racc_phone">Phone Number</label>
                    </th>
                    <td>
                        <input type="tel" id="racc_phone" name="racc_phone" 
                               value="<?php echo esc_attr(get_option('racc_phone')); ?>" class="large-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="racc_address">Address</label>
                    </th>
                    <td>
                        <textarea id="racc_address" name="racc_address" rows="4" class="large-text"><?php echo esc_textarea(get_option('racc_address')); ?></textarea>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function racc_add_options_page() {
    add_submenu_page('racc-submissions', 'Theme Settings', 'Settings', 'manage_options', 'racc-settings', 'racc_options_page');
}
add_action('admin_menu', 'racc_add_options_page');

// ===== REST API ENDPOINTS =====

function racc_register_rest_routes() {
    // Get all donations
    register_rest_route('racc/v1', '/donations', array(
        'methods' => 'GET',
        'callback' => 'racc_get_donations_rest',
        'permission_callback' => 'racc_check_admin_permission'
    ));

    // Get all contacts
    register_rest_route('racc/v1', '/contacts', array(
        'methods' => 'GET',
        'callback' => 'racc_get_contacts_rest',
        'permission_callback' => 'racc_check_admin_permission'
    ));

    // Get event registrations
    register_rest_route('racc/v1', '/event-registrations', array(
        'methods' => 'GET',
        'callback' => 'racc_get_event_registrations_rest',
        'permission_callback' => 'racc_check_admin_permission'
    ));
}
add_action('rest_api_init', 'racc_register_rest_routes');

function racc_check_admin_permission() {
    return current_user_can('manage_options');
}

function racc_get_donations_rest() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_donations';
    $donations = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC LIMIT 100");
    return rest_ensure_response($donations);
}

function racc_get_contacts_rest() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_contacts';
    $contacts = $wpdb->get_results("SELECT * FROM $table ORDER BY created_at DESC LIMIT 100");
    return rest_ensure_response($contacts);
}

function racc_get_event_registrations_rest() {
    global $wpdb;
    $table = $wpdb->prefix . 'racc_event_registrations';
    $registrations = $wpdb->get_results("SELECT * FROM $table ORDER BY registered_at DESC LIMIT 100");
    return rest_ensure_response($registrations);
}

// ===== HELPER FUNCTION TO GET STATS =====

function racc_get_stats() {
    global $wpdb;
    $stats = array();

    // Total donations
    $donations_table = $wpdb->prefix . 'racc_donations';
    $stats['total_donations'] = $wpdb->get_var("SELECT SUM(amount) FROM $donations_table WHERE status = 'completed'");
    $stats['donation_count'] = $wpdb->get_var("SELECT COUNT(*) FROM $donations_table");

    // Total contacts
    $contacts_table = $wpdb->prefix . 'racc_contacts';
    $stats['contact_count'] = $wpdb->get_var("SELECT COUNT(*) FROM $contacts_table");

    // Total volunteers
    $volunteers_table = $wpdb->prefix . 'racc_volunteers';
    $stats['volunteer_count'] = $wpdb->get_var("SELECT COUNT(*) FROM $volunteers_table");

    // Total event registrations
    $event_table = $wpdb->prefix . 'racc_event_registrations';
    $stats['event_registration_count'] = $wpdb->get_var("SELECT COUNT(*) FROM $event_table");

    // Newsletter subscribers
    $newsletter_table = $wpdb->prefix . 'racc_newsletter';
    $stats['newsletter_count'] = $wpdb->get_var("SELECT COUNT(*) FROM $newsletter_table WHERE status = 'active'");

    return $stats;
}

// ===== SHORTCODES =====

function racc_get_stats_shortcode($atts) {
    $stats = racc_get_stats();
    
    $html = '<div class="racc-stats">';
    $html .= '<div class="stat-item">';
    $html .= '<h3>₹' . number_format($stats['total_donations'] ?? 0, 2) . '</h3>';
    $html .= '<p>Total Donations</p>';
    $html .= '</div>';
    $html .= '<div class="stat-item">';
    $html .= '<h3>' . ($stats['volunteer_count'] ?? 0) . '</h3>';
    $html .= '<p>Active Volunteers</p>';
    $html .= '</div>';
    $html .= '<div class="stat-item">';
    $html .= '<h3>' . ($stats['event_registration_count'] ?? 0) . '</h3>';
    $html .= '<p>Event Registrations</p>';
    $html .= '</div>';
    $html .= '</div>';
    
    return $html;
}
add_shortcode('racc_stats', 'racc_get_stats_shortcode');

// ===== EMAIL TEMPLATES =====

function racc_get_email_template($template_name, $variables = array()) {
    $templates = array(
        'donation_confirmation' => 'Thank you for your donation of ₹{amount}! We appreciate your support.',
        'event_confirmation' => 'Your registration for {event_name} has been confirmed.',
        'volunteer_confirmation' => 'Thank you for your interest in volunteering with us!',
        'contact_confirmation' => 'We have received your message and will get back to you soon.',
    );

    $template = $templates[$template_name] ?? '';
    
    foreach ($variables as $key => $value) {
        $template = str_replace('{' . $key . '}', $value, $template);
    }

    return $template;
}
    }
    echo '</tbody></table></div>';
}
