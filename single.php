<?php // This single.php template is used for all external facing pages
include 'external-header.php';
?>
<div class="features-wrapper">
  <div class="content-wrapper">
    <h2><?php the_title(); ?></h2>
    <?php if(get_field('byline')): ?>
      <h3><?php the_field('byline'); ?></h3>
    <?php endif; ?>
    <?php if(get_field('sub_title')): ?>
      <h3><?php the_field('sub_title'); ?></h3>
    <?php endif; ?>
  </div>


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
          $url = $image['url'];
          $alt = $image['alt'];
          $size = 'features-overlay';
          $features_img = $image['sizes'][ $size ];
          $width = $image['sizes'][ $size . '-width' ];
          $height = $image['sizes'][ $size . '-height' ];

          if( !empty($image) ): ?>
            <img src="<?php echo $features_img; ?>" alt="<?php echo $alt; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>">
            <?php if( get_sub_field('caption') ): ?>
              <div class="caption hide"><?php the_sub_field('caption'); ?></div>
            <?php endif; ?>
          <?php endif; ?>
          </div>
        <?php endwhile; ?>
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

      <?php
      // check for Text Module (sub repeater)
      if( have_rows('text_module') ): ?>
        <div class="content-wrapper">
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
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

      <?php
      // check for Video Module (sub repeater)
      if( have_rows('video_module') ): ?>
        <div class="content-wrapper">
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
        </div>
      <?php endif; //if( get_sub_field('sub_module') ): ?>

  <?php endwhile; // while( has_sub_field('to-do_lists') ): ?>

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
            <?php
            $image_column = get_sub_field('image');
            $url = $image_column['url'];
            $size = 'features-overlay-two-column';
            $features_img_two_column = $image_column['sizes'][ $size ];
            $width = $image_column['sizes'][ $size . '-width' ];
            $height = $image_column['sizes'][ $size . '-height' ];

            if( !empty($image_column) ): ?>
              <img src="<?php echo $features_img_two_column; ?>" alt="<?php echo $image_column['alt']; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>">
              <?php if( get_sub_field('caption') ): ?>
                <div class="caption hide"><?php the_sub_field('caption'); ?></div>
              <?php endif; ?>
            <?php endif; ?>
          </div>
        <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
<?php endif; ?>

<div class="content-wrapper">

  <?php if( have_rows('related_issues') ): ?>
    <div class="related-features">
      <h3 class="title center upper">Related Features</h3>
      <ul>
        <?php while( have_rows('related_issues') ): the_row(); ?>

          <?php
          $posts = get_sub_field('related_issue');
          if( $posts ): ?>
          <?php foreach( $posts as $p ): // variable must NOT be called $post (IMPORTANT) ?>
            <li>
              <h2>
                <a class="ajax" data-request="get_post/?id=<?php echo $p->ID; ?>" data-template="template-story" href="<?php echo get_permalink($p->ID); ?>">
                  <?php echo get_the_title($p->ID); ?>
                </a>
              </h2>
              <a class="ajax" data-request="get_post/?id=<?php echo $p->ID; ?>" data-template="template-story" href="<?php echo get_permalink($p->ID); ?>">
                <?php
                $image = get_field('featured_image', $p->ID);
                if( !empty($image) ):
                                      // vars
                  $url = $image['url'];
                $title = $image['title'];
                                      // Set image size
                $size = 'large';
                $imageSize = $image['sizes'][ $size ];
                $width = $image['sizes'][ $size . '-width' ];
                $height = $image['sizes'][ $size . '-height' ];
                ?>
                <img src="<?php echo $imageSize; ?>" alt="<?php echo $title; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" />
              <?php endif; ?>
            </a>
          </li>
        <?php endforeach; ?>
      <?php endif; ?>

      <?php endwhile; ?>
    </ul>
  </div>
  <?php endif; ?>

  <div class="mailing-list-form feature-mailing-list">
      <form action="http://waxmag.createsend.com/t/j/s/nwtd/" method="post">
          <input name="cm-nwtd-nwtd" type="email" placeholder="Join our mailing list" required />
          <div class="email-button">Submit</div>
          <button class="visuallyhidden" type="submit"></button>
      </form>
  </div>
</div>

<?php include 'external-footer.php'; ?>
