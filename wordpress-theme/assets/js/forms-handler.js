/**
 * RACC Forms Handler
 * Handles all AJAX form submissions
 */

jQuery(document).ready(function($) {
    'use strict';

    // Contact Form Handler
    $(document).on('submit', '#contactForm', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();

        // Validation
        const name = form.find('input[name="name"]').val().trim();
        const email = form.find('input[name="email"]').val().trim();
        const message = form.find('textarea[name="message"]').val().trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        submitBtn.prop('disabled', true).text('Sending...');

        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'submit_contact',
                nonce: racc_data.contact_nonce,
                name: name,
                email: email,
                phone: form.find('input[name="phone"]').val(),
                subject: form.find('input[name="subject"]').val(),
                message: message
            },
            success: function(response) {
                if (response.success) {
                    showNotification(response.data, 'success');
                    form[0].reset();
                } else {
                    showNotification(response.data, 'error');
                }
            },
            error: function() {
                showNotification('Something went wrong. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });

        return false;
    });

    // Donation Form Handler
    $(document).on('submit', '#donationForm', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();

        const donorName = form.find('input[name="donor_name"]').val().trim();
        const donorEmail = form.find('input[name="donor_email"]').val().trim();
        const amount = parseFloat(form.find('input[name="amount"]').val());

        if (!donorName || !donorEmail || amount <= 0) {
            showNotification('Please fill in all required fields with valid values', 'error');
            return false;
        }

        if (!isValidEmail(donorEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        submitBtn.prop('disabled', true).text('Processing...');

        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'submit_donation',
                nonce: racc_data.donation_nonce,
                donor_name: donorName,
                donor_email: donorEmail,
                amount: amount,
                donation_type: form.find('select[name="donation_type"]').val() || 'one-time',
                message: form.find('textarea[name="message"]').val()
            },
            success: function(response) {
                if (response.success) {
                    // Initialize Razorpay payment
                    initializeRazorpay(response.data, form);
                } else {
                    showNotification(response.data, 'error');
                }
            },
            error: function() {
                showNotification('Something went wrong. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });

        return false;
    });

    // Razorpay Payment Integration
    function initializeRazorpay(donationData, form) {
        const amount = parseFloat(form.find('input[name="amount"]').val()) * 100; // Convert to paise

        const options = {
            key: racc_data.razorpay_key,
            amount: amount,
            currency: 'INR',
            name: 'RACC Coimbatore',
            description: 'Donation to Rotaract Club of Coimbatore City',
            image: racc_data.logo_url,
            order_id: donationData.donation_id,
            prefill: {
                name: form.find('input[name="donor_name"]').val(),
                email: form.find('input[name="donor_email"]').val(),
                contact: form.find('input[name="phone"]').val()
            },
            handler: function(response) {
                verifyPayment(response, donationData);
            },
            theme: {
                color: '#3399cc'
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    }

    // Verify Razorpay Payment
    function verifyPayment(response, donationData) {
        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'verify_payment',
                nonce: racc_data.donation_nonce,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                donation_id: donationData.donation_id
            },
            success: function(response) {
                if (response.success) {
                    showNotification('Payment successful! Thank you for your donation.', 'success');
                    $('#donationForm')[0].reset();
                } else {
                    showNotification('Payment verification failed. Please contact support.', 'error');
                }
            },
            error: function() {
                showNotification('Payment verification error. Please try again.', 'error');
            }
        });
    }

    // Event Registration Handler
    $(document).on('submit', '#eventRegistrationForm', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();

        const name = form.find('input[name="name"]').val().trim();
        const email = form.find('input[name="email"]').val().trim();

        if (!name || !email) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        submitBtn.prop('disabled', true).text('Registering...');

        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'register_event',
                nonce: racc_data.event_nonce,
                event_id: form.find('input[name="event_id"]').val(),
                name: name,
                email: email,
                phone: form.find('input[name="phone"]').val()
            },
            success: function(response) {
                if (response.success) {
                    showNotification(response.data, 'success');
                    form[0].reset();
                } else {
                    showNotification(response.data, 'error');
                }
            },
            error: function() {
                showNotification('Registration failed. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });

        return false;
    });

    // Volunteer Application Handler
    $(document).on('submit', '#volunteerForm', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();

        const name = form.find('input[name="name"]').val().trim();
        const email = form.find('input[name="email"]').val().trim();
        const skills = form.find('textarea[name="skills"]').val().trim();

        if (!name || !email || !skills) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        submitBtn.prop('disabled', true).text('Submitting...');

        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'apply_volunteer',
                nonce: racc_data.volunteer_nonce,
                name: name,
                email: email,
                phone: form.find('input[name="phone"]').val(),
                skills: skills,
                interest_area: form.find('select[name="interest_area"]').val()
            },
            success: function(response) {
                if (response.success) {
                    showNotification(response.data, 'success');
                    form[0].reset();
                } else {
                    showNotification(response.data, 'error');
                }
            },
            error: function() {
                showNotification('Submission failed. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });

        return false;
    });

    // Newsletter Subscription Handler
    $(document).on('submit', '#newsletterForm', function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();
        const email = form.find('input[name="newsletter_email"]').val().trim();

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }

        submitBtn.prop('disabled', true).text('Subscribing...');

        $.ajax({
            url: racc_data.ajax_url,
            type: 'POST',
            data: {
                action: 'subscribe_newsletter',
                nonce: racc_data.newsletter_nonce,
                email: email
            },
            success: function(response) {
                if (response.success) {
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                    form[0].reset();
                } else {
                    showNotification(response.data, 'error');
                }
            },
            error: function() {
                showNotification('Subscription failed. Please try again.', 'error');
            },
            complete: function() {
                submitBtn.prop('disabled', false).text(originalText);
            }
        });

        return false;
    });

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-info';
        const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        $('body').append(alertHtml);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            $('.alert').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }
});

