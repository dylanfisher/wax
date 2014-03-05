<?php
/*
Template Name: Page - Front Page
*/
?>
<?php get_header() ?>
        <div class="content">
<?php the_post() ?>
            <div id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
                <div class="frame-one front-page">
                    <div class="featured-project">
                        <iframe src="http://www.intotime.org/"></iframe>
                    </div>
<?php the_content() ?>
                </div>
            </div><!-- .post -->
        </div><!-- .content -->
<?php get_footer() ?>
</body>
</html>