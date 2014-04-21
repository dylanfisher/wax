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
      <h3>Contact</h3>
      <?php the_field('contact'); ?>
      <h3>Mailing List</h3>
      <?php the_field('mailing_list'); ?>
      <div class="mailing-list-form feature-mailing-list">
          <form action="http://waxmag.createsend.com/t/j/s/nwtd/" method="post">
              <input name="cm-nwtd-nwtd" type="email" required />
              <div class="email-button">Submit</div>
              <button class="visuallyhidden" type="submit"></button>
          </form>
      </div>
    </div>
    <h3>Stockists</h3>
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
  </div>
</div>
  <?php endwhile; ?>
<?php endif; ?>
<?php include 'external-footer.php'; ?>
