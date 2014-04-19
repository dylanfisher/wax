<?php
/*
Template Name: Page - Application
*/
?>
<?php get_header() ?>
<div id="frame-featured" class="frame-featured" style="background: <?php echo $bgcolor ?>;">
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
    <div id="overlay-close" class="overlay-close"></div>
    <h1 id="overlay-nav-site-title" class="overlay-nav-site-title nav-site-title">
        <a href="/<?php echo $stagingURL; ?>" class="wax-logo-container">
            <div id="wax1" class="wax-logo wax-logo-1"></div>
            <div id="wax2" class="wax-logo wax-logo-2"></div>
            <div id="wax3" class="wax-logo wax-logo-3"></div>
        </a>
    </h1>
    <div class="overlay-wrapper">
        <div id="overlay-content" class="overlay-content"></div>
        <div id="overlay-footer" class="overlay-footer">
            <?php include 'overlay-footer.php'; ?>
        </div>
    </div>
</div>
<?php get_footer() ?>