<?php
/*
Template Name: Page - Application
*/
?>

<?php get_header() ?>

<div class="main-content-fixed">
	<h2>A Magazine for Urban Surfers</h2>
	<h1>WAX</h1>
</div>

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
	<div id="sidebar-primary" class="sidebar sidebar-primary">
		<h2>WAX</h2>
	</div>
	<div id="frame-one" class="frame-one">
		<div id="frame-one-container" class="frame-one-container">
			<div id="frame-one-show-overlay" class="show-overlay">(EYE)</div>
			<div id="frame-one-overlay" class="overlay hidden">
				<ul>
					<li>Current</li>
					<li>Past</li>
				</ul>
				<div id="project-slides" class="project-slides">
					<div class="project-current">
						<div class="project-info">Description about this space goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis, lacus in commodo euismod, nibh mauris viverra libero, id tempus nulla magna a quam. Aenean et nibh fermentum, dignissim mauris ac, blandit est.</div>
						<div>Current Project</div>
						<h2>Into Time by Rafael Rozendaal</h2>
						<div>Share This Project</div>
					</div>
					<div class="project-past">
						<ul>
							<li>
								<ul>
									<li>Into Time</li>
									<li>by Rafael Rozendaal</li>
								</ul>
							</li>
							<li>
								<ul>
									<li>All Watched Over By Machines</li>
									<li>by Pascual Sisto</li>
								</ul>
							</li>
							<li>
								<ul>
									<li>Canopy</li>
									<li>by Rick Silva</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="featured-project" class="featured-project">
				<iframe src="http://www.randomfear.com/" frameborder="0"></iframe>
			</div>
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
	<div id="sidebar-secondary" class="sidebar sidebar-secondary">
		<h2>MAGAZINE</h2>
	</div>
	<div id="frame-two" class="frame-two">
		<div class="main-content">
			<div class="story" style="background: url(https://hhhhold.com/xl/w/b?1) no-repeat center center;">
				<div class="container">
					<h2>Derek Hynd in conversation with Tyler Breuer</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story dark" style="background: url(https://hhhhold.com/xl/w/d?2) no-repeat center center;">
				<div class="container">
					<h2>Lorem Ipsum Dolor Sit Amet</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story" style="background: url(https://hhhhold.com/xl/w/b?3) no-repeat center center;">
				<div class="container">
					<h2>Catching Big Waves at the Beach in 'Jersey</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story dark" style="background: url(https://hhhhold.com/xl/w/d?4) no-repeat center center;">
				<div class="container">
					<h2>An Interview with this Really Amazing Dude</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
		</div>

		<div id="sub-content-left" class="sub-content sub-content-left">
			<h2>Issue 3: Territories</h2>
			<img src="https://hhhhold.com/400x600">
			<p>&larr; &rarr;</p>
			<p>Featuring some cool people.</p>
		</div>
	</div>
<?php
	endwhile;
endif;
wp_reset_postdata(); 
?>

<?php get_footer() ?>

</body>
</html>