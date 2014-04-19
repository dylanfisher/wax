<?php include 'external-header.php'; ?>
<div class="features-wrapper">
  <h3>Features</h3>
  <div class="content-wrapper">
    <h2><?php the_title(); ?></h2>
    <?php if(get_field('sub_title')): ?>
      <h3><?php the_field('sub_title'); ?></h3>
    <?php endif; ?>


<?php // SINGLE COLUMN MODULE ?>

<?php if( have_rows('module') ): ?>
  <?php 
  // loop through rows (parent repeater)
  while( have_rows('module') ): the_row();

      // check for Image Module (sub repeater)
      if( have_rows('image_module') ): ?>
        <div class="image-module">
        <?php 
        // loop through rows (sub repeater)
        while( have_rows('image_module') ): the_row();
        ?>
          <div class="image-wrapper">
        <?php
          // display each item
          $image = get_sub_field('image');
          if( !empty($image) ): ?>
            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
            <?php if( get_sub_field('caption') ): ?>
              <div class="caption"><?php the_sub_field('caption'); ?></div>
            <?php endif; ?>
          <?php endif; ?>
          </div>
        <?php endwhile; ?>
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

      <?php
      // check for Text Module (sub repeater)
      if( have_rows('text_module') ): ?>
        <div class="text-module">
        <?php 
        // loop through rows (sub repeater)
        while( have_rows('text_module') ): the_row();
          // display each item
        ?>
          <div class="text-wrapper">
            <?php the_sub_field('text'); ?>
          </div>
        <?php endwhile; ?>
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

      <?php
      // check for Video Module (sub repeater)
      if( have_rows('video_module') ): ?>
        <div class="video-module">
        <?php 
        // loop through rows (sub repeater)
        while( have_rows('video_module') ): the_row();
          // display each item
        ?>
        <div class="video-wrapper">
        <?php if( get_sub_field('video') ): ?>
          <iframe src="//player.vimeo.com/video/<?php the_sub_field('video'); ?>?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="700" height="393" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        <?php endif; ?>
        </div>
        <?php endwhile; ?>
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

  <?php endwhile; // while( has_sub_field('to-do_lists') ): ?>
  </div>
  <?php endif; // if( get_field('to-do_lists') ): ?>


</div>

<?php // TWO COLUMN MODULE ?>

<?php if (get_field('content') ): ?>
  <div class="two-column-module">
    <div class="column1 column">
      <?php the_field('content'); ?>
    </div>
    <div class="column2 column">
      <?php if( have_rows('image_column') ): ?>
        <?php while( have_rows('image_column') ): the_row(); ?>
          <div class="image-wrapper">
            <?php $image_column = get_sub_field('image');
            if( !empty($image_column) ): ?>
              <img src="<?php echo $image_column['url']; ?>" alt="<?php echo $image_column['alt']; ?>" />
              <?php if( get_sub_field('caption') ): ?>
                <div class="caption"><?php the_sub_field('caption'); ?></div>
              <?php endif; ?>
            <?php endif; ?>
          </div>
        <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
<?php endif; ?>

<div id="overlay-footer" class="overlay-footer">
    <?php include 'overlay-footer.php'; ?>
</div>

<?php include 'external-footer.php'; ?>