<?php
/**
 * RACC Content Management Portal
 * Admin interface for easy content management
 */

// ===== ADD CONTENT MANAGEMENT MENU =====

function racc_cmp_menu() {
    add_menu_page(
        'Content Manager',
        'Content Manager',
        'manage_options',
        'racc-content-manager',
        'racc_cmp_dashboard',
        'dashicons-edit-large',
        3
    );

    add_submenu_page(
        'racc-content-manager',
        'Dashboard',
        'Dashboard',
        'manage_options',
        'racc-content-manager',
        'racc_cmp_dashboard'
    );

    add_submenu_page(
        'racc-content-manager',
        'Pages & Posts',
        'Pages & Posts',
        'manage_options',
        'racc-cmp-pages',
        'racc_cmp_pages'
    );

    add_submenu_page(
        'racc-content-manager',
        'Events',
        'Events',
        'manage_options',
        'racc-cmp-events',
        'racc_cmp_events'
    );

    add_submenu_page(
        'racc-content-manager',
        'Projects',
        'Projects',
        'manage_options',
        'racc-cmp-projects',
        'racc_cmp_projects'
    );

    add_submenu_page(
        'racc-content-manager',
        'Donations',
        'Donations',
        'manage_options',
        'racc-cmp-donations',
        'racc_cmp_donations'
    );

    add_submenu_page(
        'racc-content-manager',
        'Team Members',
        'Team Members',
        'manage_options',
        'racc-cmp-team',
        'racc_cmp_team'
    );

    add_submenu_page(
        'racc-content-manager',
        'Site Settings',
        'Site Settings',
        'manage_options',
        'racc-cmp-settings',
        'racc_cmp_settings'
    );
}
add_action('admin_menu', 'racc_cmp_menu');

// ===== DASHBOARD =====

function racc_cmp_dashboard() {
    $stats = racc_get_stats();
    ?>
    <div class="wrap racc-cmp-wrap">
        <div class="racc-cmp-header">
            <h1>📊 Content Management Dashboard</h1>
            <p>Manage all your website content in one place</p>
        </div>

        <div class="racc-cmp-grid">
            <!-- Quick Stats -->
            <div class="racc-cmp-card">
                <h2>Quick Stats</h2>
                <div class="stats-grid">
                    <div class="stat">
                        <span class="stat-number"><?php echo ($stats['donation_count'] ?? 0); ?></span>
                        <span class="stat-label">Total Donations</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">₹<?php echo number_format($stats['total_donations'] ?? 0, 0); ?></span>
                        <span class="stat-label">Amount Raised</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number"><?php echo ($stats['volunteer_count'] ?? 0); ?></span>
                        <span class="stat-label">Volunteers</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number"><?php echo ($stats['event_registration_count'] ?? 0); ?></span>
                        <span class="stat-label">Event Registrations</span>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="racc-cmp-card">
                <h2>Quick Actions</h2>
                <div class="action-list">
                    <a href="<?php echo admin_url('post-new.php?post_type=event'); ?>" class="action-btn">
                        📅 Create Event
                    </a>
                    <a href="<?php echo admin_url('post-new.php?post_type=project'); ?>" class="action-btn">
                        🎯 Create Project
                    </a>
                    <a href="<?php echo admin_url('post-new.php'); ?>" class="action-btn">
                        📝 Write Blog Post
                    </a>
                    <a href="<?php echo admin_url('admin.php?page=racc-cmp-team'); ?>" class="action-btn">
                        👥 Add Team Member
                    </a>
                </div>
            </div>

            <!-- Recent Submissions -->
            <div class="racc-cmp-card">
                <h2>Recent Form Submissions</h2>
                <?php
                global $wpdb;
                $contacts = $wpdb->get_results(
                    "SELECT * FROM {$wpdb->prefix}racc_contacts ORDER BY created_at DESC LIMIT 5"
                );
                if ($contacts) {
                    echo '<ul class="submission-list">';
                    foreach ($contacts as $contact) {
                        echo '<li>';
                        echo '<strong>' . esc_html($contact->name) . '</strong>';
                        echo '<br><small>' . esc_html($contact->email) . '</small>';
                        echo '<br><small>' . human_time_diff(strtotime($contact->created_at), current_time('timestamp')) . ' ago</small>';
                        echo '</li>';
                    }
                    echo '</ul>';
                } else {
                    echo '<p>No submissions yet</p>';
                }
                ?>
            </div>
        </div>
    </div>

    <style>
        .racc-cmp-wrap { padding: 20px; }
        .racc-cmp-header { margin-bottom: 30px; }
        .racc-cmp-header h1 { color: #333; margin-bottom: 5px; }
        .racc-cmp-header p { color: #666; }
        
        .racc-cmp-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
        }

        .racc-cmp-card {
            background: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .racc-cmp-card h2 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #0073aa;
            padding-bottom: 10px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }

        .stat {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
        }

        .stat-number {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #0073aa;
        }

        .stat-label {
            display: block;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .action-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .action-btn {
            display: block;
            padding: 12px;
            background: #0073aa;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            transition: background 0.3s;
        }

        .action-btn:hover {
            background: #005a87;
            color: white;
        }

        .submission-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .submission-list li {
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: 13px;
        }

        .submission-list li:last-child {
            border-bottom: none;
        }

        .submission-list strong {
            color: #333;
        }

        .submission-list small {
            color: #999;
        }
    </style>
    <?php
}

// ===== PAGES & POSTS MANAGER =====

function racc_cmp_pages() {
    $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : 'list';
    $post_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($action === 'edit' && $post_id) {
        racc_cmp_edit_page($post_id);
    } else {
        racc_cmp_list_pages();
    }
}

function racc_cmp_list_pages() {
    $pages = get_pages(array('number' => 20, 'sort_order' => 'DESC'));
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>📄 Pages & Posts</h1>
        <a href="<?php echo admin_url('post-new.php'); ?>" class="button button-primary">+ New Post</a>
        <a href="<?php echo admin_url('post-new.php?post_type=page'); ?>" class="button button-primary">+ New Page</a>

        <table class="wp-list-table widefat striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $posts = get_posts(array('numberposts' => 50, 'post_type' => array('post', 'page')));
                foreach ($posts as $post) {
                    $author = get_the_author_meta('display_name', $post->post_author);
                    echo '<tr>';
                    echo '<td><strong>' . esc_html($post->post_title) . '</strong></td>';
                    echo '<td>' . esc_html(ucfirst($post->post_type)) . '</td>';
                    echo '<td>' . esc_html($author) . '</td>';
                    echo '<td>' . mysql2date('M d, Y', $post->post_date) . '</td>';
                    echo '<td>';
                    echo '<a href="' . get_edit_post_link($post->ID) . '" class="button button-small">Edit</a> ';
                    echo '<a href="' . get_permalink($post->ID) . '" class="button button-small" target="_blank">View</a>';
                    echo '</td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

// ===== EVENTS MANAGER =====

function racc_cmp_events() {
    $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : 'list';
    $event_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($action === 'new') {
        racc_cmp_event_form(0);
    } elseif ($action === 'edit' && $event_id) {
        racc_cmp_event_form($event_id);
    } else {
        racc_cmp_list_events();
    }
}

function racc_cmp_list_events() {
    $events = get_posts(array('post_type' => 'event', 'numberposts' => 50));
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>📅 Events</h1>
        <a href="<?php echo admin_url('admin.php?page=racc-cmp-events&action=new'); ?>" class="button button-primary">+ Create Event</a>

        <table class="wp-list-table widefat striped">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Registrations</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($events as $event) {
                    global $wpdb;
                    $registrations = $wpdb->get_var($wpdb->prepare(
                        "SELECT COUNT(*) FROM {$wpdb->prefix}racc_event_registrations WHERE event_id = %d",
                        $event->ID
                    ));
                    
                    echo '<tr>';
                    echo '<td><strong>' . esc_html($event->post_title) . '</strong></td>';
                    echo '<td>' . (get_post_meta($event->ID, 'event_date', true) ?: 'Not set') . '</td>';
                    echo '<td>' . ($event->post_status === 'publish' ? '<span style="color: green;">Published</span>' : '<span style="color: orange;">Draft</span>') . '</td>';
                    echo '<td>' . ($registrations ?: 0) . ' registrations</td>';
                    echo '<td>';
                    echo '<a href="' . get_edit_post_link($event->ID) . '" class="button button-small">Edit</a> ';
                    echo '<a href="' . get_permalink($event->ID) . '" class="button button-small" target="_blank">View</a>';
                    echo '</td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

function racc_cmp_event_form($event_id = 0) {
    $event = $event_id ? get_post($event_id) : null;
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1><?php echo $event_id ? 'Edit Event' : 'Create Event'; ?></h1>
        <form method="post" class="racc-cmp-form">
            <div class="form-group">
                <label for="event_title">Event Title *</label>
                <input type="text" id="event_title" name="event_title" required
                       value="<?php echo $event ? esc_attr($event->post_title) : ''; ?>" class="large-text">
            </div>

            <div class="form-group">
                <label for="event_date">Event Date *</label>
                <input type="datetime-local" id="event_date" name="event_date" required
                       value="<?php echo $event ? esc_attr(get_post_meta($event->ID, 'event_date', true)) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="event_location">Location *</label>
                <input type="text" id="event_location" name="event_location" required
                       value="<?php echo $event ? esc_attr(get_post_meta($event->ID, 'event_location', true)) : ''; ?>" class="large-text">
            </div>

            <div class="form-group">
                <label for="event_description">Description *</label>
                <?php
                wp_editor(
                    $event ? $event->post_content : '',
                    'event_description',
                    array('textarea_rows' => 10)
                );
                ?>
            </div>

            <div class="form-group">
                <label for="event_capacity">Max Capacity</label>
                <input type="number" id="event_capacity" name="event_capacity"
                       value="<?php echo $event ? esc_attr(get_post_meta($event->ID, 'event_capacity', true)) : ''; ?>">
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" name="event_published" value="1" 
                           <?php echo $event && $event->post_status === 'publish' ? 'checked' : ''; ?>>
                    Publish this event
                </label>
            </div>

            <button type="submit" class="button button-primary">Save Event</button>
            <a href="<?php echo admin_url('admin.php?page=racc-cmp-events'); ?>" class="button">Cancel</a>
        </form>
    </div>

    <style>
        .racc-cmp-form .form-group {
            margin-bottom: 20px;
        }
        .racc-cmp-form label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .racc-cmp-form input[type="text"],
        .racc-cmp-form input[type="datetime-local"],
        .racc-cmp-form input[type="number"],
        .racc-cmp-form textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    </style>
    <?php
}

// ===== PROJECTS MANAGER =====

function racc_cmp_projects() {
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>🎯 Projects</h1>
        <a href="<?php echo admin_url('post-new.php?post_type=project'); ?>" class="button button-primary">+ Create Project</a>

        <table class="wp-list-table widefat striped">
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $projects = get_posts(array('post_type' => 'project', 'numberposts' => 50));
                foreach ($projects as $project) {
                    echo '<tr>';
                    echo '<td><strong>' . esc_html($project->post_title) . '</strong></td>';
                    echo '<td>' . ($project->post_status === 'publish' ? '<span style="color: green;">Published</span>' : '<span style="color: orange;">Draft</span>') . '</td>';
                    echo '<td>' . mysql2date('M d, Y', $project->post_date) . '</td>';
                    echo '<td>';
                    echo '<a href="' . get_edit_post_link($project->ID) . '" class="button button-small">Edit</a> ';
                    echo '<a href="' . get_permalink($project->ID) . '" class="button button-small" target="_blank">View</a>';
                    echo '</td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

// ===== DONATIONS CAMPAIGNS =====

function racc_cmp_donations() {
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>💝 Donation Campaigns</h1>
        <a href="<?php echo admin_url('post-new.php?post_type=donation'); ?>" class="button button-primary">+ Create Campaign</a>

        <table class="wp-list-table widefat striped">
            <thead>
                <tr>
                    <th>Campaign Name</th>
                    <th>Target Amount</th>
                    <th>Raised</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $campaigns = get_posts(array('post_type' => 'donation', 'numberposts' => 50));
                foreach ($campaigns as $campaign) {
                    $target = get_post_meta($campaign->ID, 'target_amount', true);
                    $raised = get_post_meta($campaign->ID, 'amount_raised', true);
                    
                    echo '<tr>';
                    echo '<td><strong>' . esc_html($campaign->post_title) . '</strong></td>';
                    echo '<td>₹' . number_format($target ?: 0, 0) . '</td>';
                    echo '<td>₹' . number_format($raised ?: 0, 0) . '</td>';
                    echo '<td>' . ($campaign->post_status === 'publish' ? '<span style="color: green;">Active</span>' : '<span style="color: orange;">Inactive</span>') . '</td>';
                    echo '<td>';
                    echo '<a href="' . get_edit_post_link($campaign->ID) . '" class="button button-small">Edit</a> ';
                    echo '<a href="' . get_permalink($campaign->ID) . '" class="button button-small" target="_blank">View</a>';
                    echo '</td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

// ===== TEAM MEMBERS MANAGER =====

function racc_cmp_team() {
    if (isset($_POST['action']) && $_POST['action'] === 'save_team') {
        racc_cmp_save_team_member();
    }

    $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : 'list';
    $member_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($action === 'new') {
        racc_cmp_team_form(0);
    } elseif ($action === 'edit' && $member_id) {
        racc_cmp_team_form($member_id);
    } else {
        racc_cmp_list_team();
    }
}

function racc_cmp_list_team() {
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>👥 Team Members</h1>
        <a href="<?php echo admin_url('admin.php?page=racc-cmp-team&action=new'); ?>" class="button button-primary">+ Add Member</a>

        <table class="wp-list-table widefat striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $members = get_posts(array('post_type' => 'team_member', 'numberposts' => 50));
                foreach ($members as $member) {
                    $position = get_post_meta($member->ID, 'position', true);
                    $email = get_post_meta($member->ID, 'email', true);
                    
                    echo '<tr>';
                    echo '<td><strong>' . esc_html($member->post_title) . '</strong></td>';
                    echo '<td>' . esc_html($position ?: '-') . '</td>';
                    echo '<td>' . esc_html($email ?: '-') . '</td>';
                    echo '<td>';
                    echo '<a href="' . admin_url('admin.php?page=racc-cmp-team&action=edit&id=' . $member->ID) . '" class="button button-small">Edit</a> ';
                    echo '<a href="' . get_permalink($member->ID) . '" class="button button-small" target="_blank">View</a>';
                    echo '</td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
}

function racc_cmp_team_form($member_id = 0) {
    $member = $member_id ? get_post($member_id) : null;
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1><?php echo $member_id ? 'Edit Team Member' : 'Add Team Member'; ?></h1>
        <form method="post" class="racc-cmp-form">
            <input type="hidden" name="action" value="save_team">
            <input type="hidden" name="member_id" value="<?php echo $member_id; ?>">

            <div class="form-group">
                <label for="member_name">Name *</label>
                <input type="text" id="member_name" name="member_name" required
                       value="<?php echo $member ? esc_attr($member->post_title) : ''; ?>" class="large-text">
            </div>

            <div class="form-group">
                <label for="member_position">Position *</label>
                <input type="text" id="member_position" name="member_position" required
                       value="<?php echo $member ? esc_attr(get_post_meta($member->ID, 'position', true)) : ''; ?>" class="large-text">
            </div>

            <div class="form-group">
                <label for="member_email">Email</label>
                <input type="email" id="member_email" name="member_email"
                       value="<?php echo $member ? esc_attr(get_post_meta($member->ID, 'email', true)) : ''; ?>" class="large-text">
            </div>

            <div class="form-group">
                <label for="member_bio">Bio</label>
                <?php
                wp_editor(
                    $member ? $member->post_content : '',
                    'member_bio',
                    array('textarea_rows' => 8)
                );
                ?>
            </div>

            <button type="submit" class="button button-primary">Save Member</button>
            <a href="<?php echo admin_url('admin.php?page=racc-cmp-team'); ?>" class="button">Cancel</a>
        </form>
    </div>

    <style>
        .racc-cmp-form .form-group {
            margin-bottom: 20px;
        }
        .racc-cmp-form label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .racc-cmp-form input[type="text"],
        .racc-cmp-form input[type="email"],
        .racc-cmp-form textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    </style>
    <?php
}

function racc_cmp_save_team_member() {
    $member_id = intval($_POST['member_id'] ?? 0);
    $name = sanitize_text_field($_POST['member_name'] ?? '');
    $position = sanitize_text_field($_POST['member_position'] ?? '');
    $email = sanitize_email($_POST['member_email'] ?? '');
    $bio = wp_kses_post($_POST['member_bio'] ?? '');

    if (!$name || !$position) {
        wp_die('Name and Position are required.');
    }

    if ($member_id) {
        wp_update_post(array(
            'ID' => $member_id,
            'post_title' => $name,
            'post_content' => $bio,
            'post_type' => 'team_member',
        ));
        update_post_meta($member_id, 'position', $position);
        update_post_meta($member_id, 'email', $email);
    } else {
        $member_id = wp_insert_post(array(
            'post_title' => $name,
            'post_content' => $bio,
            'post_type' => 'team_member',
            'post_status' => 'publish',
        ));
        update_post_meta($member_id, 'position', $position);
        update_post_meta($member_id, 'email', $email);
    }

    wp_redirect(admin_url('admin.php?page=racc-cmp-team'));
    exit;
}

// ===== SITE SETTINGS PORTAL =====

function racc_cmp_settings() {
    if (isset($_POST['action']) && $_POST['action'] === 'save_settings') {
        check_admin_referer('racc_cmp_settings_nonce');
        
        update_option('racc_site_title', sanitize_text_field($_POST['site_title'] ?? ''));
        update_option('racc_site_tagline', sanitize_text_field($_POST['site_tagline'] ?? ''));
        update_option('racc_about_text', wp_kses_post($_POST['about_text'] ?? ''));
        update_option('racc_phone', sanitize_text_field($_POST['phone'] ?? ''));
        update_option('racc_address', sanitize_text_field($_POST['address'] ?? ''));
        update_option('racc_email_contact', sanitize_email($_POST['email_contact'] ?? ''));
        
        echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
    }
    ?>
    <div class="wrap racc-cmp-wrap">
        <h1>⚙️ Site Settings</h1>
        
        <form method="post" class="racc-cmp-form">
            <?php wp_nonce_field('racc_cmp_settings_nonce'); ?>
            <input type="hidden" name="action" value="save_settings">

            <h2>Basic Information</h2>
            <div class="form-group">
                <label for="site_title">Site Title</label>
                <input type="text" id="site_title" name="site_title" class="large-text"
                       value="<?php echo esc_attr(get_option('racc_site_title', get_option('blogname'))); ?>">
            </div>

            <div class="form-group">
                <label for="site_tagline">Site Tagline</label>
                <input type="text" id="site_tagline" name="site_tagline" class="large-text"
                       value="<?php echo esc_attr(get_option('racc_site_tagline', get_option('blogdescription'))); ?>">
            </div>

            <div class="form-group">
                <label for="about_text">About Us Text</label>
                <?php
                wp_editor(
                    get_option('racc_about_text', ''),
                    'about_text',
                    array('textarea_rows' => 8)
                );
                ?>
            </div>

            <h2>Contact Information</h2>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" class="large-text"
                       value="<?php echo esc_attr(get_option('racc_phone')); ?>">
            </div>

            <div class="form-group">
                <label for="email_contact">Contact Email</label>
                <input type="email" id="email_contact" name="email_contact" class="large-text"
                       value="<?php echo esc_attr(get_option('racc_email_contact')); ?>">
            </div>

            <div class="form-group">
                <label for="address">Office Address</label>
                <textarea id="address" name="address" rows="4" class="large-text"><?php echo esc_textarea(get_option('racc_address')); ?></textarea>
            </div>

            <button type="submit" class="button button-primary button-large">Save Settings</button>
        </form>
    </div>

    <style>
        .racc-cmp-form {
            max-width: 600px;
            background: white;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        .racc-cmp-form h2 {
            border-bottom: 2px solid #0073aa;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        .racc-cmp-form h2:first-child {
            margin-top: 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="tel"],
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-family: Arial, sans-serif;
        }
        .form-group textarea {
            resize: vertical;
        }
    </style>
    <?php
}
