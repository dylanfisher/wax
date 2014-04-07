<?php include 'external-header.php'; ?>
<?php 
$args = array(
    'category_name' => 'about',
    'posts_per_page' => 1
    );
$the_query = new WP_Query( $args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
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
        <li><?php the_sub_field('city'); ?></li>
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
    </div>
    <h3>Distribution</h3>
    <div class="masonry">
    <?php if( have_rows('distribution') ): ?>
      <?php while( have_rows('distribution') ): the_row(); ?>
      <ul class="masonry-item">
        <li><?php the_sub_field('city'); ?></li>
        <?php if( have_rows('distributor') ): ?>
          <li>
            <ul>
              <?php while( have_rows('distributor') ): the_row(); ?>
                <li><?php the_sub_field('distributor'); ?></li>
              <?php endwhile; ?>
            </ul>
          </li>
        <?php endif; ?>
      </ul>
      <?php endwhile; ?>
    <?php endif; ?>
    </div>
    <div class="content-wrapper">
      <h3>Contact</h3>
      <?php the_field('contact'); ?>
    </div>
  </div>
</div>
  <?php endwhile; ?>
<?php endif; ?>
<?php include 'external-footer.php'; ?>