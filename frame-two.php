<?php // FRAME TWO - FEATURES ?>
<?php
// Query the Features category
$features_args = array(
    'category_name' => 'features',
    'posts_per_page' => -1
    );
$the_query = new WP_Query( $features_args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
<div class="features-item" data-filter="<?php the_field('category'); ?>">
    <h2>
        <a class="ajax" data-request="get_post/?id=<?php echo get_the_ID(); ?>" data-template="template-story" href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a>
    </h2>
        <?php if( get_field('sub_title') ) { ?>
    <h3><?php echo the_field('sub_title'); ?></h3>
        <?php } ?>
    <a class="ajax" data-request="get_post/?id=<?php echo get_the_ID(); ?>" data-template="template-story" href="<?php echo get_permalink(); ?>">
        <?php
        $image = get_field('featured_image');
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
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>