<?php get_header();
$args = array(
    'category_name' => 'about',
    'posts_per_page' => 1
    );
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
<div class="external-layout">
  <?php include 'nav.php'; ?>
</div>
<div id="frame-container" class="frame-container">
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
<div class="external-layout-wrapper">
</div>
<?php // CONTENT ENDS HERE ?>
<div id="overlay-container" class="overlay-container external-layout">
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