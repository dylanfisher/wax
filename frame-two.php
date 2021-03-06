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

        // Get associated posts data for mustache template
        $related_issues = array();
        if( have_rows('related_issues') ):
            while( have_rows('related_issues') ): the_row();
                $posts = get_sub_field('related_issue');
                if( $posts ):
                    foreach( $posts as $p ):
                        $related_issues[] = $p->ID;
                    endforeach;
                endif;
            endwhile;
        endif;
        $related_issues = implode('&', $related_issues);
?>
<div class="features-item" data-filter="<?php the_field('category'); ?>">
    <h2>
        <a class="ajax" data-request="get_post/?id=<?php echo get_the_ID(); ?>" data-related-issues="<?php echo $related_issues; ?>" data-template="template-story" href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a>
    </h2>
        <?php if( get_field('byline') ) { ?>
    <h3><?php echo the_field('byline'); ?></h3>
        <?php } ?>
        <?php // Featured image
        $image = get_field('featured_image');
        if( !empty($image) ):
            // vars
            $url = $image['url'];
            $title = $image['title'];
            // Set image size
            $size = 'features-list';
            $imageSize = $image['sizes'][ $size ];
            $width = $image['sizes'][ $size . '-width' ];
            $height = $image['sizes'][ $size . '-height' ];
        ?>
    <a class="ajax" data-request="get_post/?id=<?php echo get_the_ID(); ?>" data-template="template-story" href="<?php echo get_permalink(); ?>">
        <img src="<?php echo $imageSize; ?>" alt="<?php echo $title; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" />
    </a>
        <?php endif; ?>
    <?php // Featured video
    $video = get_field('featured_video');
    if( !empty($video) ):
    ?>
    <div class="video-module featured-video">
      <iframe src="//player.vimeo.com/video/<?php echo $video ?>?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="700" height="393" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    <?php endif; ?>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
