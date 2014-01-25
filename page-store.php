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
					<a id="cart-permalink" href="#" target="_blank">Check out DIRECTLY (with cart permalink)</a>
					<br>
					<a id="cart-permalink" href="http://store.readwax.com/cart" target="_blank">Check out by going to CART first</a>
					<div id="cart-item-count"></div>
					<div id="product-container" class="product-container"></div>
<?php the_content() ?>
				</div>
			</section><!-- .post -->
		</div><!-- .content -->
<?php get_footer() ?>
</body>
</html>