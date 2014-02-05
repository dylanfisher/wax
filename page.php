<?php get_header() ?>
<?php the_post() ?>
    <div id="overlay-container" class="overlay-container active">
        <div id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
            <div id="overlay-close-single" class="overlay-close"><a href="<?php echo home_url() ?>">X</a></div>
            <div id="overlay-content" class="overlay-content">
                <h2 class="entry-title"><?php the_title() ?></h2>
                <h3><?php the_permalink() ?></h3>
<?php the_content() ?>
            </div>
        </div><!-- .post -->
    </div>
<?php get_footer() ?>
</body>
</html>