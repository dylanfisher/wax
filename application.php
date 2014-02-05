<?php if($singlePage === true){echo '$singlePage is true';} ?>
<div id="frame-featured" class="frame-featured">
        <div id="frame-featured-show-overlay" class="show-overlay">(EYE)</div>
        <div id="frame-featured-overlay" class="overlay hidden">
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
        </div>
    </div>
    <h1 id="nav-site-title" class="nav-site-title">
        <a href="#" class="wax-logo-container">
            <div id="wax1" class="wax-logo">W</div>
            <div id="wax2" class="wax-logo active">A</div>
            <div id="wax3" class="wax-logo">X</div>
        </a>
    </h1>
    <div id="fixed-nav" class="fixed-nav">
        <h3 id="nav-issues"><a href="#">Issues</a></h3>
        <h3 id="nav-home"><a href="#">Home</a></h3>
        <h3 id="nav-store"><a href="#">Store</a></h3>
        <h3 id="nav-cart" class="nav-cart"><a id="cart-permalink" href="http://store.readwax.com/" target="_blank"><span id="cart-item-count"></span></a></h3>
        <br>
        <h3 id="nav-about" class="nav-about show-overlay"><a href="#">About</a></h3>
        <h3 id="nav-finds" class="nav-finds show-overlay"><a href="#">Finds</a></h3>
    </div>
<?php // Begin frame-container ?>
    <div id="frame-container" class="frame-container">
    <?php // FRAME ONE ?>
        <div id="frame-one" class="frame-one frame fixed">
            <div id="frame-one-content" class="content">
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
        </div>
    <?php // FRAME TWO ?>
        <div id="frame-two" class="frame-two frame">
            <div id="frame-two-content" class="content">
<?php 
/*
$args = array(
    'post_type' => 'page',
    'page_id'   => '2'
);
$the_query = new WP_Query( $args );

// The Loop
if ( $the_query->have_posts() ) {
        echo '<ul>';
    while ( $the_query->have_posts() ) {
        $the_query->the_post();
        echo '<li>' . get_the_title() . the_permalink() . '</li>';
    }
        echo '</ul>';
} else {
    // no posts found
}
*/
wp_reset_postdata();
 ?>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?1">
                    <div class="container">
                        <h2>Derek Hynd in conversation with Tyler Breuer (light image)</h2>
                        <div class="button style-1"><a class="ajax" data-request="get_page/?id=2" data-template="template1" href="http://localhost:3000/wax/sample-page/">View Story</a></div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?2">
                    <div class="container">
                        <h2>Lorem Ipsum Dolor Sit Amet (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?3">
                    <div class="container">
                        <h2>Catching Big Waves at the Beach in 'Jersey (light image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?4">
                    <div class="container">
                        <h2>An Interview with this Really Amazing Dude (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?5">
                    <div class="container">
                        <h2>Derek Hynd in conversation with Tyler Breuer (light image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?6">
                    <div class="container">
                        <h2>Lorem Ipsum Dolor Sit Amet (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?7">
                    <div class="container">
                        <h2>Catching Big Waves at the Beach in 'Jersey (light image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?8">
                    <div class="container">
                        <h2>An Interview with this Really Amazing Dude (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?9">
                    <div class="container">
                        <h2>Derek Hynd in conversation with Tyler Breuer (light image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?10">
                    <div class="container">
                        <h2>Lorem Ipsum Dolor Sit Amet (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story lazy" data-original="https://hhhhold.com/xl/w/b?11">
                    <div class="container">
                        <h2>Catching Big Waves at the Beach in 'Jersey (light image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
                <div class="story dark lazy" data-original="https://hhhhold.com/xl/w/d?12">
                    <div class="container">
                        <h2>An Interview with this Really Amazing Dude (dark image)</h2>
                        <div class="button style-1">View Story</div>
                    </div>
                </div>
            </div>
        </div>
    <?php // FRAME THREE ?>
        <div id="frame-three" class="frame-three frame fixed">
            <div id="frame-three-content" class="content">
                <a id="cart-count" href="#"><b>Get Cart Item Count</b></a>
                <br>
                <a id="cart-permalink" href="http://store.readwax.com/cart" target="_blank">Check out by going to CART first</a>
                <br>
                <a id="clear-cart" href="#">Clear Cart with hidden iframe</a>
                <br>
                <a id="update" href="#">Update "WAX Magazine, Issue #2, #3, #4 Promo" to 10 items (must have 1 in your cart already)</a>
                <br>
                <iframe id="test-iframe" src="" width="400" height="150"></iframe>
                <div id="product-container" class="product-container"></div>
            </div>
        </div>
    </div>
<?php // End frame-container ?>
    <div id="overlay-container" class="overlay-container">
        <div id="overlay-close" class="overlay-close">X</div>
        <div id="overlay-content" class="overlay-content"></div>
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