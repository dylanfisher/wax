<?php
/*
Template Name: Page - Application
*/
?>
<?php get_header() ?>
    <div id="frame-featured" class="frame-featured">
<?php include 'frame-featured.php' ?>
    </div>
<?php include 'nav.php'; ?>
<?php // Begin frame-container ?>
    <div id="frame-container" class="frame-container">
    <?php // FRAME ONE - ISSUES ?>
        <div id="frame-one" class="frame-one frame fixed">
            <div id="frame-one-content" class="content">
<?php include 'frame-one.php'; ?>
            </div>
        </div>
    <?php // FRAME TWO - FEATURES ?>
        <div id="frame-two" class="frame-two frame">
            <div id="frame-two-content" class="content">
<?php include 'frame-two.php'; ?>
            </div>
        </div>
    <?php // FRAME THREE - STORE ?>
        <div id="frame-three" class="frame-three frame fixed">
            <div id="frame-three-content" class="content">
<?php include 'frame-three.php'; ?>
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
<?php get_footer() ?>
</body>
</html>