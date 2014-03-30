<?php
/*
Template Name: Page - Application
*/

// Check if we are running locally
$localHost = array(
    '127.0.0.1',
    '::1'
);
$stagingURL = 'dev';
if(in_array($_SERVER['REMOTE_ADDR'], $localHost)){
    $stagingURL = 'wax';
}
?>
<?php get_header() ?>
<div id="frame-featured" class="frame-featured">
    <?php include 'frame-featured.php' ?>
</div>
<?php include 'nav.php'; ?>
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
<div id="overlay-container" class="overlay-container">
    <div id="overlay-close" class="overlay-close">X</div>
    <div id="overlay-content" class="overlay-content"></div>
</div>
<?php get_footer() ?>
</body>
</html>