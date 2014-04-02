<?php
/*
Template Name: Page - About
*/
?>
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
<div id="overlay-container" class="overlay-container external-layout">
  <div id="overlay-close" class="overlay-close">X</div>
  <div id="overlay-content" class="overlay-content">
    <div id="template-about">
      <div class="about-wrapper">
        <div class="content-wrapper">
          <h3>About</h3>
          <?php the_field('about'); ?>
          <h3>Mailing List</h3>
          <?php the_field('mailing_list'); ?>
          <h3>Submissions</h3>
          <?php the_field('submissions'); ?>
        </div>
        <h3>Stockist</h3>
        <div class="masonry">
        <?php if( have_rows('stockists') ): ?>
          <?php while( have_rows('stockists') ): the_row(); ?>
          <ul class="masonry-item">
            <li><?php the_field('city'); ?></li>
            <?php if( have_rows('stockist') ): ?>
              <li>
                <ul>
                  <?php while( have_rows('stockist') ): the_row(); ?>
                    <li><?php the_sub_field('stockist'); ?></li>
                  <?php endwhile; ?>
                </ul>
              </li>
            <?php endif; ?>
          </ul>
          <?php endwhile; ?>
        <?php endif; ?>
          {{#acf.stockists}}
          <ul class="masonry-item">
            <li>{{city}}</li>
            {{#stockist}}
              <li>
                <ul>
                  <li>{{stockist}}</li>
                </ul>
              </li>
            {{/stockist}}
          </ul>
          {{/acf.stockists}}
        </div>
        <h3>Distribution</h3>
        <div class="masonry">
          {{#acf.distribution}}
          <ul class="masonry-item">
            <li>{{city}}</li>
            {{#distributor}}
              <li>
                <ul>
                  <li>{{distributor}}</li>
                </ul>
              </li>
            {{/distributor}}
          </ul>
          {{/acf.distribution}}
        </div>
        <div class="content-wrapper">
          <h3>Contact</h3>
          {{{acf.contact}}}
        </div>
      </div>
    </div>
  </div>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
<?php get_footer() ?>
</body>
</html>