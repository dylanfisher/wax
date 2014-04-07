<?php
/*
Template Name: Page - Temperature
*/
?>
<?php get_header();
// Temperature
require_once getcwd() . '/wp-content/themes/wax/libs/temp/global_fns.php';
$colorboxes = writeBoxes(getcwd() . '/wp-content/themes/wax/libs/temp/oceantemps.txt');
$args = array(
  'page_id' => '103'
);
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
<div class="external-layout hide">
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
<?php // CONTENT GOES HERE ?>
<div class="external-layout-wrapper temperature-page">
  <div class="temp-header">
    <span>W  A  X  Magazine - NYC Ocean Temp</span>
    <a href="/<?php echo $stagingURL; ?>/features/">Return</a>
  </div>
<?php echo $colorboxes; ?>
</div>
<?php // CONTENT ENDS HERE ?>
<div id="overlay-container" class="overlay-container external-layout hide">
  <div id="overlay-close" class="overlay-close"></div>
  <div id="overlay-content" class="overlay-content">
  </div>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
<?php get_footer() ?>