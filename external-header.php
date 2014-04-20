<?php get_header(); ?>
<?php the_post(); ?>
<div class="external-layout">
  <?php include 'nav.php'; ?>
</div>
<div id="frame-container" class="frame-container hide">
    <?php // FRAME ONE - ISSUES ?>
    <div id="frame-one" class="frame-one frame fixed">
        <div id="frame-one-content" class="content"></div>
    </div>
    <?php // FRAME TWO - FEATURES ?>
    <div id="frame-two" class="frame-two frame">
        <div id="frame-two-content" class="content"></div>
    </div>
    <?php // FRAME THREE - STORE ?>
    <div id="frame-three" class="frame-three frame fixed">
        <div id="frame-three-content" class="content"></div>
    </div>
</div>
<div class="external-layout-wrapper">
