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
<div class="issue" data-variantID="<?php the_field('product_id'); ?>">
    <h2><?php the_title(); ?></h2>
        <?php if( get_field('sub_title') ) { ?>
    <h3><?php echo the_field('sub_title'); ?></h3>
        <?php } ?>

        <?php if( have_rows('slideshow') ): ?>
    <div class="slide-outer-container">
        <div class="issue-slides">
            <?php while( have_rows('slideshow') ): the_row();
                // vars
                $image = get_sub_field('image');
            ?>
            <img class="lazy" data-original="<?php echo $image['url']; ?>" alt="<?php echo $image['title'] ?>">
            <?php endwhile; ?>
        </div>
    </div>
        <?php endif; ?>
    <h3>
        <a class="accordion-head more-info" href="#">More Information</a>
        <a class="add-to-cart" href="#">Add to Cart</a>
    </h3>
    <div class="accordion-container">
        <div class="accordion-content">
        <?php the_field('content'); ?>
        <?php if( have_rows('related_issues') ): ?>
            <h3 class="title center upper">Related Features</h3>
            <ul>
            <?php while( have_rows('related_issues') ): the_row();
                // vars
                $image = get_sub_field('image');
            ?>
                <li>
                    <h2><?php the_sub_field('title'); ?></h2>
                    <h3>[Add Subtitle Here]</h3>
                    <img class="lazy" data-original="<?php echo $image['url']; ?>" alt="<?php echo $image['title'] ?>">
                </li>
            <?php endwhile; ?>
            </ul>
        <?php endif; ?>
        </div>
    </div>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>