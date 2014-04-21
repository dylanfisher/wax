<?php // FRAME ONE - ISSUES ?>
<?php
// Query the Issues category
$issue_args = array(
    'category_name' => 'issues',
    'posts_per_page' => -1
    );
$the_query = new WP_Query( $issue_args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
<div class="issue product" data-id="<?php the_field('product_id'); ?>">
    <div id="<?php echo basename(get_permalink()); ?>" class="jump-link"></div>
        <?php if( have_rows('slideshow') ): ?>
    <div class="slide-outer-container">
        <div class="issue-slides">
            <?php while( have_rows('slideshow') ): the_row();
                // vars
                $image = get_sub_field('image');
            ?>
            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['title'] ?>">
            <?php endwhile; ?>
        </div>
    </div>
        <?php endif; ?>

    <div class="issue-head">
        <div>
            <a class="accordion-head more-info" href="#">More Info</a>
        </div>
        <div>
            <div class="issue-title">
                <span><?php the_title(); ?></span><br>
                <?php if( get_field('sub_title') ) { echo the_field('sub_title'); } ?>
            </div>
        </div>
        <div>
            <a class="add-to-cart" href="#"></a>
        </div>
    </div>

    <div class="accordion-container">
        <div class="accordion-content">
        <?php the_field('content'); ?>
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
        </div>
    </div>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
