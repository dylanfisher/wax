</div>
<?php // Overlay container primary ?>
<div id="overlay-container" class="overlay-container">
    <div id="overlay-close" class="overlay-close"></div>
    <h1 id="overlay-nav-site-title" class="overlay-nav-site-title nav-site-title">
        <a href="/<?php echo $stagingURL; ?>" class="wax-logo-container">
            <div class="wax-logo wax-logo-1"></div>
            <div class="wax-logo wax-logo-2"></div>
            <div class="wax-logo wax-logo-3"></div>
        </a>
    </h1>
    <div class="overlay-wrapper">
        <div id="overlay-content" class="overlay-content"></div>
        <div class="overlay-footer">
            <?php include 'overlay-footer.php'; ?>
        </div>
    </div>
</div>
<?php // Overlay container secondary ?>
<div id="overlay-container-two" class="overlay-container overlay-container-two">
    <div id="overlay-close-two" class="overlay-close"></div>
    <h1 id="overlay-nav-site-title-two" class="overlay-nav-site-title nav-site-title">
        <a href="/<?php echo $stagingURL; ?>" class="wax-logo-container">
            <div class="wax-logo wax-logo-1"></div>
            <div class="wax-logo wax-logo-2"></div>
            <div class="wax-logo wax-logo-3"></div>
        </a>
    </h1>
    <div class="overlay-wrapper">
        <div id="overlay-content-two" class="overlay-content"></div>
        <div class="overlay-footer">
            <?php include 'overlay-footer.php'; ?>
        </div>
    </div>
</div>
<?php get_footer() ?>
