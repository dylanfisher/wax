<?php include 'external-header.php'; ?>
<div class="features-wrapper">
  <div class="content-wrapper">
    <h2><?php the_title(); ?></h2>
    <?php if(get_field('sub_title')): ?>
      <h3><?php the_field('sub_title'); ?></h3>
    <?php endif; ?>
    <?php if( have_rows('slideshow') ): ?>
      <div class="slide-outer-container">
          <div class="slideshow feature-slideshow">
      <?php while( have_rows('slideshow') ): the_row();
          // vars
          $image = get_sub_field('image');
      ?>
              <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['title'] ?>" data-caption="<?php the_sub_field('caption'); ?>">
      <?php endwhile; ?>
          </div>
          <div class="caption-container"></div>
      </div>
          <?php endif; ?>
    <div class="feature-content"><?php the_field('content'); ?></div>
  </div>
</div>
<?php if( have_rows('related_issues') ): ?>
<div class="related-issues">
  <h3 class="title center upper">Related Features</h3>
  <ul>
  <?php while( have_rows('related_issues') ): the_row();
      // vars
      $image = get_sub_field('image');
  ?>
      <li>
          <h2><?php the_sub_field('title'); ?></h2>
          <h3>[Add Subtitle Here]</h3>
          <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['title'] ?>">
      </li>
  <?php endwhile; ?>
  </ul>
</div>
<?php endif; ?>
<?php include 'external-footer.php'; ?>