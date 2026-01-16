<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS and Scripts are enqueued in functions.php -->
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div class="preloader" id="preloader">
        <div class="loader"></div>
    </div>

    <!-- SIDEBAR SECTION START -->
    <div class="ul-sidebar">
        <!-- header -->
        <div class="ul-sidebar-header">
            <div class="ul-sidebar-header-logo">
                <a href="<?php echo home_url(); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="logo" class="logo">
                </a>
            </div>
            <!-- sidebar closer -->
            <button class="ul-sidebar-closer"><i class="flaticon-close"></i></button>
        </div>

        <div class="ul-sidebar-header-nav-wrapper d-block d-lg-none"></div>


        <!-- sidebar footer -->
        <div class="ul-sidebar-footer">
            <span class="ul-sidebar-footer-title">Follow us</span>

            <div class="ul-sidebar-footer-social">
                <a href="https://www.facebook.com/share/gh8cNttSyKGxhVuC/"><i class="flaticon-facebook"></i></a>
                <a href="https://x.com/raccbecity"><i class="flaticon-twitter-1"></i></a>
                <a href="https://www.instagram.com/raccoimbatorecity"><i class="flaticon-instagram"></i></a>
                <a href="https://www.linkedin.com/company/raccoimbatorecity"><i
                        class="flaticon-linkedin-big-logo"></i></a>
                <a href="https://www.youtube.com/@raccoimbatorecity"><i class="flaticon-youtube"></i></a>
                <a href="https://www.threads.net/@raccoimbatorecity"><i class="fa-brands fa-threads"></i></a>
                <a href="https://t.me/raccoimbatorecity"><i class="fa-brands fa-telegram"></i></a>
                <a href="https://whatsapp.com/channel/0029Vadde0RBPzjUzrY55x3P"><i
                        class="fa-brands fa-whatsapp"></i></a>
            </div>
        </div>
    </div>
    <!-- SIDEBAR SECTION END -->

    <!-- SEARCH MODAL SECTION START -->
    <div class="ul-search-form-wrapper flex-grow-1 flex-shrink-0">
        <button class="ul-search-closer"><i class="flaticon-close"></i></button>

        <form action="<?php echo home_url('/'); ?>" class="ul-search-form">
            <div class="ul-search-form-right">
                <input type="search" name="s" id="ul-search" placeholder="Search Here">
                <button type="submit"><span class="icon"><i class="flaticon-search"></i></span></button>
            </div>
        </form>
    </div>
    <!-- SEARCH MODAL SECTION END -->

    <!-- HEADER SECTION START -->
    <header class="ul-header">
        <div class="ul-header-bottom to-be-sticky">
            <div class="ul-header-bottom-wrapper ul-header-container">
                <div class="logo-container">
                    <a href="<?php echo home_url(); ?>" class="d-inline-block"><img
                            src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="logo"
                            class="logo"></a>
                </div>

                <!-- header nav -->
                <div class="ul-header-nav-wrapper">
                    <div class="to-go-to-sidebar-in-mobile">
                        <nav class="ul-header-nav">
                            <div class="has-sub-menu">
                                <a role="button">Home</a>

                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="<?php echo home_url(); ?>">Home</a></li>
                                    </ul>
                                </div>
                            </div>
                            <a href="<?php echo site_url('/about-us'); ?>">About</a>
                            <div class="has-sub-menu">
                                <a role="button">Organisations</a>
                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="https://www.rotary.org/" target="_blank">Rotary International</a>
                                        </li>
                                        <li><a href="https://rotaract3206.org/" target="_blank">Rotaract District
                                                Organisation 3206</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="has-sub-menu">
                                <a role="button">Pages</a>

                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="<?php echo site_url('/our-services'); ?>">Services</a></li>
                                        <li><a href="<?php echo site_url('/our-projects'); ?>">Projects</a></li>
                                        <li><a href="<?php echo site_url('/our-team'); ?>">Team</a></li>
                                        <li><a href="<?php echo site_url('/pricing'); ?>">Pricing Plans</a></li>
                                        <li><a href="<?php echo site_url('/frequently-asked-questions'); ?>">FAQs</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="has-sub-menu">
                                <a role="button">Donation</a>

                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="<?php echo site_url('/donations'); ?>">Donation Listing</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="has-sub-menu">
                                <a role="button">Event</a>

                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="<?php echo site_url('/upcoming-events'); ?>">Events</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="has-sub-menu">
                                <a role="button">Blog</a>

                                <div class="ul-header-submenu">
                                    <ul>
                                        <li><a href="<?php echo site_url('/blog'); ?>">Blogs</a></li>
                                    </ul>
                                </div>
                            </div>
                            <a href="<?php echo site_url('/contact-us'); ?>">Contact</a>
                        </nav>
                    </div>
                </div>

                <!-- actions -->
                <div class="ul-header-actions">
                    <button class="ul-header-search-opener"><i class="flaticon-search"></i></button>

                    <a href="<?php echo site_url('/contact-us'); ?>" class="ul-btn d-sm-inline-flex d-none"><i
                            class="flaticon-fast-forward-double-right-arrows-symbol"></i> Join With us </a>
                    <button class="ul-header-sidebar-opener d-lg-none d-inline-flex"><i
                            class="flaticon-menu"></i></button>
                </div>
            </div>
        </div>
    </header>
    <!-- HEADER SECTION END -->