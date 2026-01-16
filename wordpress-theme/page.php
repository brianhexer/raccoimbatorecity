<?php get_header(); ?>

<main>
    <!-- BREADCRUMBS SECTION START -->
    <section class="ul-breadcrumb ul-section-spacing">
        <div class="ul-container">
            <h2 class="ul-breadcrumb-title"><?php the_title(); ?></h2>
            <ul class="ul-breadcrumb-nav">
                <li><a href="<?php echo home_url(); ?>">Home</a></li>
                <li><span class="separator"><i class="flaticon-right"></i></span></li>
                <li><?php the_title(); ?></li>
            </ul>
        </div>
    </section>
    <!-- BREADCRUMBS SECTION END -->

    <!-- PAGE CONTENT START -->
    <section class="ul-section-spacing">
        <div class="ul-container">
            <?php
            while (have_posts()):
                the_post();
                the_content();
            endwhile;
            ?>
        </div>
    </section>
    <!-- PAGE CONTENT END -->
</main>

<?php get_footer(); ?>