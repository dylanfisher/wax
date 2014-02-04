<?php get_header() ?>
<?php the_post() ?>
			<div id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<h2 class="entry-title"><?php the_title() ?></h2>
                <?php the_content() ?>
			</div><!-- .post -->
<?php get_footer() ?>
</body>
</html>