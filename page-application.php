<?php
/*
Template Name: Page - Application
*/
?>

<?php get_header() ?>

<?php // Create first loop for frame-one
$args = array(
	'post_type' => 'page',
	'post__in' => array(19)
);
$query_one = new WP_Query($args);
if ($query_one->have_posts()) :
	while($query_one->have_posts()) :
		$query_one->the_post();
?>
	<div id="frame-one" class="frame-one">
		<div class="tester" style="position: absolute;">
			<?php the_content() ?>
		</div>
		<div class="featured-project">
			<iframe src="http://www.intotime.org/" frameborder="0"></iframe>
		</div>
	</div>
<?php
	endwhile;
endif;
wp_reset_postdata(); 
?>

<?php // Create second loop for frame two
$args2 = array(
	'post_type' => 'page',
	'post__in' => array(6)
);
$query_two = new WP_Query($args2);
if ($query_two->have_posts()) :
	while($query_two->have_posts()) :
		$query_two->the_post();
?>
	<div id="frame-two" class="frame-two">
		<h2 class="sidebar menu-right">WAX</h2>
		<div class="tester" style="position: absolute;">
			<?php the_content() ?>
		</div>
	</div>
<?php
	endwhile;
endif;
wp_reset_postdata(); 
?>

<?php the_post() ?>

			<div id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
<?php the_content() ?>
			</div>

<?php get_footer() ?>

</body>
</html>