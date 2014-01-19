<?php
/*
Template Name: Page - Application
*/
?>

<?php get_header() ?>
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

	<div id="sidebar-primary" class="sidebar sidebar-primary">
		<h2>WAX</h2>
	</div>

	<div id="frame-two" class="frame-two fixed">
		<div id="main-content" class="main-content">
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
	</div>

	<div id="sidebar-secondary" class="sidebar sidebar-secondary">
		<h2>MAGAZINE</h2>
	</div>

	<div id="frame-three" class="frame-three fixed">
		<h2>Issue 3: Territories</h2>
		<img src="https://hhhhold.com/400x600">
		<p>&larr; &rarr;</p>
		<p>Featuring some cool people.</p>
		<h2>Issue 4: Places</h2>
		<img src="https://hhhhold.com/400x600?1">
		<p>&larr; &rarr;</p>
		<p>Featuring some other cool people.</p>
	</div>
	<?php // Fixed position elements must be outside frames due to transform issue ?>
	<div class="fixed-nav-elements">
		<h2 class="nav-tagline">A Magazine for Urban Surfers</h2>
		<h1 id="nav-site-title" class="nav-site-title">WAX</h1>
		<h3 id="nav-about" class="nav-about">About</h3>
		<h3 id="nav-finds" class="nav-finds">Finds</h3>
	</div>
	<div id="about-overlay" class="about-overlay overlay hidden">
		<p>WAX is a bi-annual print publication exploring the intersection of art, culture and surfing in and around New York City. We believe that beauty and meaning can be found on sidewalks, boardwalks, skyscrapers and beaches alike. We’re interested in exploring the rich history of New York surfing, its beaches and residents and in finding a pathway of cultural creativity on and off the break. WAX shares the stories of area surfers who are also artists, designers, authors and auteurs. Each issue is organized around a unique theme, debuting with Issue #1: Dialogues in Spring 2012.</p>
		<div>
			<h3>Mailing List</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus libero mauris, eget tempor ligula tristique sed. Nullam sed tellus eu tellus aliquet porta. Vivamus ut sodales neque. Cras aliquam libero sit amet magna gravida, lobortis rhoncus lacus ultrices. Nam pretium libero eget lacus ullamcorper, non accumsan lacus varius.</p>
		</div>
		<div>
			<h3>Stockist</h3>
			<p>Quisque eu odio eget ligula dictum auctor. Phasellus consequat massa ac risus dapibus, a semper eros hendrerit. Nunc hendrerit nibh nec sem tempor dignissim.</p>
		</div>
		<div>
			<h3>Contact Us</h3>
			<p>WAX Magazine<br>
				145 Calyer St, 4th Floor<br>
				Brooklyn, NY 11222<br>
				info@readwax.com</p>
			<p>Advertising<br>
				Contact ads@readwax.com</p>
			<p>Visit WAX Magazine on Facebook<br>
				Follow us on Twitter</p>
		</div>
	</div>

<?php get_footer() ?>

</body>
</html>