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
			<div class="story lazy" data-original="https://hhhhold.com/xl/w/b?1">
				<div class="container">
					<h2>Derek Hynd in conversation with Tyler Breuer</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?2">
				<div class="container">
					<h2>Lorem Ipsum Dolor Sit Amet</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story lazy" data-original="https://hhhhold.com/xl/w/b?3">
				<div class="container">
					<h2>Catching Big Waves at the Beach in 'Jersey</h2>
					<div class="button style-1">View Story</div>
				</div>
			</div>
			<div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?4">
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
		<div class="issue">
			<h2>Issue 3: Territories</h2>
			<div id="issue-slides-1" class="issue-slides">
				<img class="lazy" data-original="http://hhhhold.com/400x450" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?1" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?2" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?3" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?4" width="400" height="450">
			</div>
			<p>Featuring some cool people.</p>
			<div class="button style-1">Buy or Subscribe</div>
		</div>
		<div class="issue">
			<h2>Issue 4: Places</h2>
			<div id="issue-slides-2" class="issue-slides">
				<img class="lazy" data-original="http://hhhhold.com/400x450?5" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?6" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?7" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?8" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?9" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?10" width="400" height="450">
				<img class="lazy" data-original="http://hhhhold.com/400x450?11" width="400" height="450">
			</div>
			<p>Featuring some other cool people.</p>
			<div class="button style-1">Buy or Subscribe</div>
		</div>
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
	<div id="finds-overlay" class="finds-overlay overlay hidden">
		<img class="lazy" data-original="http://25.media.tumblr.com/tumblr_mdjyy4VZD61qkbo6bo1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/7316fc267f0ef94944b22f2f51806598/tumblr_my2per5EmL1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/4fee5b489a71866a629e1687861e74af/tumblr_mxjplw9S8y1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/6a9467de092435b6bf0aab20fb2b4eba/tumblr_mxkrhnfvxX1r24dd9o1_500.png" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/e8f604c6f1022bfa82f924e92990643d/tumblr_mxjpknpahr1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/21e4f67402a0d490f7a85c8eaa7e1fe1/tumblr_mxahqxQ3Xy1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/a7ffb312fc22d934841b7c3869b12769/tumblr_mvx12m1CJY1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/2063c9579e112f6b43045810290bdc97/tumblr_mvww1dcSwB1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/c83b2dd36166f960a0cf6f73e042b539/tumblr_mvlsafwyly1r24dd9o1_500.jpg" width="500" height="600">
		<img class="lazy" data-original="http://25.media.tumblr.com/931245fe4ce0e681de41c0cee179fd95/tumblr_mvl915K2Pn1r24dd9o1_500.jpg" width="500" height="600">
	</div>

<?php get_footer() ?>

</body>
</html>