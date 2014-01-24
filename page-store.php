<?php
/*
Template Name: Page - Store
*/
?>
<?php get_header() ?>

		<div class="content"><?php the_post() ?>
			<section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<h2 class="entry-title"><?php the_title() ?></h2>
				<div class="entry-content">

					<a id="cart-permalink" href="#" target="_blank">Check out with CART PERMALINK</a>

					<ul id="product-container" class="product-container"></ul>

<?php the_content() ?>

				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>