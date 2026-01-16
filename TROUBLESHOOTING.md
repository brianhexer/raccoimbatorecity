# 🔧 RACC Backend - Troubleshooting Guide

## Common Issues & Solutions

### Forms Not Submitting

#### Issue: Form submits but nothing happens
**Solutions:**
1. Check browser console for JavaScript errors (F12)
2. Verify jQuery is loaded:
   ```html
   <!-- Check Network tab in DevTools -->
   ```
3. Verify nonce is in the HTML:
   ```bash
   Ctrl+F: "wp_nonce_field" or "_wpnonce"
   ```
4. Check if `forms-handler.js` is loaded:
   ```bash
   Look in Network tab for "forms-handler.js"
   ```

#### Issue: "Invalid nonce" error
**Solutions:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Verify nonce function in functions.php:
   ```php
   racc_enqueue_nonces() function exists
   ```
3. Check if WordPress hooks are firing properly
4. Verify `wp_localize_script()` is called

#### Issue: Form validates but doesn't save
**Solutions:**
1. Check MySQL database permissions
2. Verify table exists:
   ```sql
   SHOW TABLES LIKE 'wp_%_racc_%';
   ```
3. Check PHP error log:
   ```
   /public_html/wp-content/debug.log
   ```
4. Test with simpler data (remove special characters)

---

### Payment Issues

#### Issue: Razorpay dialog doesn't open
**Solutions:**
1. Verify Razorpay script is loaded:
   ```html
   <!-- Check for: https://checkout.razorpay.com/v1/checkout.js -->
   ```
2. Check browser console for errors
3. Verify API key in Theme Settings:
   ```
   WordPress Admin → RACC Submissions → Settings
   ```
4. Test with different donation amount
5. Check if API key is correct:
   ```bash
   Should start with: "rzp_" (test) or "rzp_live_" (live)
   ```

#### Issue: Payment fails silently
**Solutions:**
1. Check Razorpay account status
2. Verify account is in "LIVE" mode if using live keys
3. Check payment method enabled in Razorpay
4. Test with test card: `4111 1111 1111 1111`
5. Check browser console for JavaScript errors

#### Issue: "Invalid payment ID" error
**Solutions:**
1. Verify Razorpay signature verification in functions.php
2. Check Secret Key is correct in Settings
3. Make sure timestamp is synchronized
4. Try clearing Razorpay cookies
5. Test in different browser

#### Issue: Payment success but status not updated
**Solutions:**
1. Check if nonce verification is failing
2. Verify admin-ajax.php is accessible:
   ```bash
   https://yoursite.com/wp-admin/admin-ajax.php
   ```
3. Check database for donation record:
   ```sql
   SELECT * FROM wp_racc_donations WHERE donor_email = 'email@example.com';
   ```
4. Check PHP error log
5. Enable debug logging in config.php

---

### Email Issues

#### Issue: Emails not sending
**Solutions:**
1. Test with basic WordPress email:
   ```php
   wp_mail('your@email.com', 'Test', 'This is a test');
   ```
2. Check Hostinger email settings
3. Verify admin email in Settings → General
4. Check server mail logs:
   ```bash
   /var/log/exim_mainlog or /var/log/mail.log
   ```
5. Verify sender domain matches hosting domain

#### Issue: Emails going to spam
**Solutions:**
1. Add SPF record:
   ```
   v=spf1 include:hostinger.com ~all
   ```
2. Add DKIM records (Hostinger support can help)
3. Change email from address to domain email
4. Add unsubscribe link (for newsletters)
5. Avoid spam trigger words
6. Test with mail-tester.com

#### Issue: Emails have broken formatting
**Solutions:**
1. Verify email template uses HTML:
   ```php
   $headers = array('Content-Type: text/html; charset=UTF-8');
   wp_mail($to, $subject, $message, $headers);
   ```
2. Check for special characters in template
3. Test with plain text first, then add HTML
4. Verify line breaks are correct
5. Check email client rendering

#### Issue: Variables not replacing in emails
**Solutions:**
1. Verify function syntax:
   ```php
   racc_get_email_template('donation_confirmation', 
       array('amount' => '5000')
   );
   ```
2. Check placeholder format: `{variable_name}`
3. Debug with error_log():
   ```php
   error_log('Email template: ' . print_r($template, true));
   ```

---

### Database Issues

#### Issue: "Table doesn't exist" error
**Solutions:**
1. Manually create tables (see BACKEND_ARCHITECTURE.md)
2. Re-activate theme:
   ```
   Appearance → Themes → Activate RACC Theme
   ```
3. Check table prefix:
   ```bash
   Most common: wp_ or custom_
   Check wp-config.php: $table_prefix
   ```
4. Verify database user has CREATE TABLE permission
5. Check MySQL error log

#### Issue: "Access denied" to database
**Solutions:**
1. Verify database credentials in wp-config.php
2. Check database user has all permissions:
   ```sql
   GRANT ALL PRIVILEGES ON wordpress.* TO 'user'@'localhost';
   ```
3. Test connection directly with MySQL client
4. Check if firewall is blocking database
5. Restart MySQL service

#### Issue: Slow database queries
**Solutions:**
1. Add database indexes:
   ```sql
   ALTER TABLE wp_racc_donations ADD INDEX (created_at);
   ```
2. Archive old records:
   ```sql
   DELETE FROM wp_racc_contacts WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
   ```
3. Enable query caching
4. Optimize tables:
   ```sql
   OPTIMIZE TABLE wp_racc_donations;
   ```
5. Check Hostinger resource usage

---

### Admin Dashboard Issues

#### Issue: Admin pages show no data
**Solutions:**
1. Check if user has "manage_options" capability
2. Verify tables exist (as above)
3. Check if data is actually in database:
   ```sql
   SELECT COUNT(*) FROM wp_racc_contacts;
   ```
4. Clear cache if using caching plugin
5. Check browser console for errors

#### Issue: Can't access Settings page
**Solutions:**
1. Verify user is admin
2. Check if page is registered:
   ```bash
   Appearance → RACC Submissions → Settings
   ```
3. Disable plugins temporarily to rule out conflicts
4. Check PHP error log
5. Verify WordPress is up to date

#### Issue: Statistics showing 0 or wrong numbers
**Solutions:**
1. Check racc_get_stats() function in functions.php
2. Verify SQL query syntax
3. Check database for actual data:
   ```sql
   SELECT COUNT(*) FROM wp_racc_donations WHERE status = 'completed';
   ```
4. Check if donation status is being set correctly
5. Verify table names match functions

---

### Performance Issues

#### Issue: Website loading slowly
**Solutions:**
1. Enable Hostinger caching:
   ```
   Hostinger Dashboard → Performance → Cache
   ```
2. Install WordPress caching plugin:
   ```
   WP Super Cache or W3 Total Cache
   ```
3. Optimize images:
   ```
   Use ShortPixel or compress before upload
   ```
4. Minimize CSS/JavaScript
5. Check server resources:
   ```
   Hostinger Dashboard → Server Status
   ```

#### Issue: Forms submit slowly
**Solutions:**
1. Check email sending time:
   ```php
   Start/end timer around wp_mail()
   ```
2. Verify AJAX endpoint responds quickly:
   ```bash
   Check Network tab → XHR → Response time
   ```
3. Check if Razorpay is slow:
   ```bash
   May be API latency (outside your control)
   ```
4. Optimize database queries
5. Increase PHP timeout (if allowed)

#### Issue: Payment verification takes too long
**Solutions:**
1. Verify Razorpay API connection speed
2. Check network latency:
   ```bash
   ping api.razorpay.com
   ```
3. Increase PHP timeout:
   ```php
   set_time_limit(60);
   ```
4. Verify internet connection is stable

---

### JavaScript/Frontend Issues

#### Issue: Forms have styling issues
**Solutions:**
1. Verify Bootstrap is loaded (check Network tab)
2. Check for CSS conflicts with other plugins
3. Verify form IDs match:
   ```html
   id="contactForm" (not contact-form or others)
   ```
4. Clear browser cache
5. Check with multiple browsers

#### Issue: Validation messages not showing
**Solutions:**
1. Verify jQuery is loaded before forms-handler.js
2. Check if notification div is on page
3. Verify JavaScript is enabled in browser
4. Check console for errors
5. Test with simple alert() first:
   ```javascript
   alert('Validation working');
   ```

#### Issue: AJAX requests fail
**Solutions:**
1. Check admin-ajax.php is accessible
2. Verify correct action name in AJAX call:
   ```javascript
   action: 'submit_contact'
   ```
3. Check CORS if cross-domain
4. Verify POST data format is correct
5. Check Network tab for actual error

---

### Security Issues

#### Issue: "Nonce verification failed"
**Solutions:**
1. Check if nonce is being generated
2. Verify nonce matches between form and handler
3. Check nonce expiration (default: 12-24 hours)
4. Clear cookies and try again
5. Check if using HTTPS vs HTTP

#### Issue: Rate limiting blocks legitimate users
**Solutions:**
1. Increase rate limit in config.php:
   ```php
   define('RACC_RATE_LIMIT_PER_HOUR', 20);
   ```
2. Clear transient cache for user:
   ```php
   delete_transient('racc_form_contact_' . $ip);
   ```
3. Add IP whitelist for internal testing
4. Check if multiple users share same IP

#### Issue: Razorpay signature verification failing
**Solutions:**
1. Verify Secret Key is correct:
   ```bash
   Check Settings page
   ```
2. Check signature verification logic:
   ```php
   hash_hmac('sha256', "$order_id|$payment_id", $secret)
   ```
3. Verify both keys are from same environment (test/live)
4. Check if keys got corrupted/copied wrong
5. Verify line breaks/whitespace in keys

---

### WordPress Integration Issues

#### Issue: Theme not showing up
**Solutions:**
1. Verify folder is in correct location:
   ```bash
   /wp-content/themes/racc/ (or your name)
   ```
2. Verify folder permissions: 755
3. Check if style.css exists in root
4. Verify theme header comment in style.css:
   ```css
   /*
   Theme Name: RACC
   Theme URI: ...
   */
   ```
5. Refresh admin page

#### Issue: Cannot activate theme
**Solutions:**
1. Check PHP error log for errors
2. Verify all required files exist
3. Check for syntax errors:
   ```bash
   php -l wordpress-theme/functions.php
   ```
4. Check if another theme is being forced in code
5. Verify database tables can be created

#### Issue: Plugin conflicts
**Solutions:**
1. Disable all plugins except essential
2. Re-enable one by one to find conflict
3. Check for conflicting form handlers
4. Look for conflicting AJAX actions
5. Check JavaScript console for conflicts

---

### Hostinger-Specific Issues

#### Issue: File permissions error
**Solutions:**
1. Set folders to 755:
   ```bash
   chmod 755 /wp-content/themes/racc
   ```
2. Set files to 644:
   ```bash
   chmod 644 /wp-content/themes/racc/functions.php
   ```
3. Use Hostinger File Manager
4. Contact Hostinger support for help

#### Issue: MySQL connection error
**Solutions:**
1. Check database credentials:
   ```bash
   /public_html/wp-config.php
   ```
2. Verify database exists
3. Check if database server is running
4. Verify firewall isn't blocking port 3306
5. Contact Hostinger support

#### Issue: Mail function not working
**Solutions:**
1. Check Hostinger mail settings
2. Verify sendmail is enabled
3. Check mail logs:
   ```bash
   Hostinger Dashboard → Diagnostics
   ```
4. Use a mail plugin if needed
5. Contact Hostinger support

---

## Debug Mode

### Enable Debug Logging
1. Edit `wordpress-theme/config.php`
2. Change: `define('RACC_DEBUG_LOG', false);`
3. To: `define('RACC_DEBUG_LOG', true);`
4. Check log file: `/wp-content/racc-debug.log`

### WordPress Debug Mode
1. Edit `wp-config.php`
2. Add:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
3. Check: `/wp-content/debug.log`

### MySQL Debugging
```sql
-- Check table structure
DESCRIBE wp_racc_donations;

-- Check recent records
SELECT * FROM wp_racc_donations ORDER BY created_at DESC LIMIT 5;

-- Check status distribution
SELECT status, COUNT(*) FROM wp_racc_donations GROUP BY status;

-- Check donation totals
SELECT SUM(amount) as total FROM wp_racc_donations WHERE status = 'completed';
```

---

## Diagnostic Commands

### Check Theme Files
```bash
# Check if files exist
ls -la /wp-content/themes/racc/
ls -la /wp-content/themes/racc/functions.php
ls -la /wp-content/themes/racc/assets/js/forms-handler.js

# Check file permissions
find /wp-content/themes/racc -type f -exec ls -l {} \;
```

### Check Database
```bash
# Connect to MySQL
mysql -h localhost -u username -p database_name

# List tables
SHOW TABLES LIKE 'wp_%_racc_%';

# Check table structure
DESCRIBE wp_racc_donations;

# Check for errors
SELECT * FROM wp_racc_contacts LIMIT 1;
```

### Check PHP
```bash
# Check syntax
php -l /wp-content/themes/racc/functions.php

# Check loaded extensions
php -m | grep "json|curl|pdo"
```

---

## Quick Fix Checklist

- [ ] Clear WordPress cache
- [ ] Clear browser cache
- [ ] Disable plugins (test one by one)
- [ ] Check error logs
- [ ] Verify database connection
- [ ] Check file permissions
- [ ] Verify all API keys
- [ ] Test with simplest form
- [ ] Check browser console
- [ ] Verify HTTPS/SSL certificate

---

## When to Contact Support

Contact Hostinger support if:
- Database connection error (not your credentials)
- File permissions reset to default
- Server mail not working
- Resource limits exceeded
- Hardware failures
- DDoS attacks

Contact WordPress community if:
- Plugin incompatibility
- WordPress core issues
- Theme conflicts

Check Razorpay docs if:
- Payment gateway integration
- API errors
- Account setup

---

## Emergency Recovery

### Database Backup
```sql
-- Export all RACC tables
mysqldump -u username -p database_name wp_racc_* > backup.sql
```

### Theme Rollback
```bash
# Keep previous version:
mv /wp-content/themes/racc /wp-content/themes/racc-backup
# Restore old version
cp -r /wp-content/themes/racc-old /wp-content/themes/racc
```

### Database Recovery
```sql
-- Restore from backup
mysql -u username -p database_name < backup.sql

-- Or drop and recreate tables
DROP TABLE wp_racc_donations;
-- Then reactivate theme to recreate
```

---

**Last Updated:** January 4, 2026  
**Coverage:** Common issues & solutions  
**Status:** Comprehensive guide ✅
