<?php
/**
 * RACC Forms Template - Include this in your pages
 * All forms are ready to use with the backend handlers
 */

// Contact Form
function racc_contact_form() {
    ?>
    <form id="contactForm" class="racc-form">
        <div class="form-group mb-3">
            <label for="contactName" class="form-label">Name *</label>
            <input type="text" class="form-control" id="contactName" name="name" required>
        </div>
        <div class="form-group mb-3">
            <label for="contactEmail" class="form-label">Email *</label>
            <input type="email" class="form-control" id="contactEmail" name="email" required>
        </div>
        <div class="form-group mb-3">
            <label for="contactPhone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="contactPhone" name="phone">
        </div>
        <div class="form-group mb-3">
            <label for="contactSubject" class="form-label">Subject</label>
            <input type="text" class="form-control" id="contactSubject" name="subject">
        </div>
        <div class="form-group mb-3">
            <label for="contactMessage" class="form-label">Message *</label>
            <textarea class="form-control" id="contactMessage" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
    <?php
}

// Donation Form
function racc_donation_form() {
    ?>
    <form id="donationForm" class="racc-form">
        <div class="form-group mb-3">
            <label for="donorName" class="form-label">Full Name *</label>
            <input type="text" class="form-control" id="donorName" name="donor_name" required>
        </div>
        <div class="form-group mb-3">
            <label for="donorEmail" class="form-label">Email *</label>
            <input type="email" class="form-control" id="donorEmail" name="donor_email" required>
        </div>
        <div class="form-group mb-3">
            <label for="donorPhone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="donorPhone" name="phone">
        </div>
        <div class="form-group mb-3">
            <label for="donationType" class="form-label">Donation Type</label>
            <select class="form-select" id="donationType" name="donation_type">
                <option value="one-time">One Time</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
        </div>
        <div class="form-group mb-3">
            <label for="donationAmount" class="form-label">Amount (₹) *</label>
            <input type="number" class="form-control" id="donationAmount" name="amount" min="1" step="0.01" required>
        </div>
        <div class="form-group mb-3">
            <label for="donationMessage" class="form-label">Message</label>
            <textarea class="form-control" id="donationMessage" name="message" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-success">Proceed to Payment</button>
    </form>
    <?php
}

// Event Registration Form
function racc_event_registration_form($event_id) {
    ?>
    <form id="eventRegistrationForm" class="racc-form">
        <input type="hidden" name="event_id" value="<?php echo intval($event_id); ?>">
        <div class="form-group mb-3">
            <label for="eventName" class="form-label">Full Name *</label>
            <input type="text" class="form-control" id="eventName" name="name" required>
        </div>
        <div class="form-group mb-3">
            <label for="eventEmail" class="form-label">Email *</label>
            <input type="email" class="form-control" id="eventEmail" name="email" required>
        </div>
        <div class="form-group mb-3">
            <label for="eventPhone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="eventPhone" name="phone">
        </div>
        <button type="submit" class="btn btn-primary">Register Now</button>
    </form>
    <?php
}

// Volunteer Application Form
function racc_volunteer_form() {
    ?>
    <form id="volunteerForm" class="racc-form">
        <div class="form-group mb-3">
            <label for="volName" class="form-label">Full Name *</label>
            <input type="text" class="form-control" id="volName" name="name" required>
        </div>
        <div class="form-group mb-3">
            <label for="volEmail" class="form-label">Email *</label>
            <input type="email" class="form-control" id="volEmail" name="email" required>
        </div>
        <div class="form-group mb-3">
            <label for="volPhone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="volPhone" name="phone">
        </div>
        <div class="form-group mb-3">
            <label for="volArea" class="form-label">Area of Interest</label>
            <select class="form-select" id="volArea" name="interest_area">
                <option value="">Select an area</option>
                <option value="Community Service">Community Service</option>
                <option value="Youth Development">Youth Development</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="form-group mb-3">
            <label for="volSkills" class="form-label">Skills & Experience *</label>
            <textarea class="form-control" id="volSkills" name="skills" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit Application</button>
    </form>
    <?php
}

// Newsletter Subscription Form
function racc_newsletter_form() {
    ?>
    <form id="newsletterForm" class="racc-form d-flex gap-2">
        <input type="email" class="form-control" name="newsletter_email" placeholder="Your email address" required>
        <button type="submit" class="btn btn-primary">Subscribe</button>
    </form>
    <?php
}

// Stats Display Shortcode Helper
function racc_stats_display() {
    $stats = racc_get_stats();
    ?>
    <div class="racc-stats-container row">
        <div class="col-md-3">
            <div class="stat-card text-center">
                <h3 class="stat-number">₹<?php echo number_format($stats['total_donations'] ?? 0, 0); ?></h3>
                <p class="stat-label">Total Donations</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card text-center">
                <h3 class="stat-number"><?php echo ($stats['volunteer_count'] ?? 0); ?></h3>
                <p class="stat-label">Active Volunteers</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card text-center">
                <h3 class="stat-number"><?php echo ($stats['event_registration_count'] ?? 0); ?></h3>
                <p class="stat-label">Event Registrations</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card text-center">
                <h3 class="stat-number"><?php echo ($stats['newsletter_count'] ?? 0); ?></h3>
                <p class="stat-label">Newsletter Subscribers</p>
            </div>
        </div>
    </div>
    <?php
}
