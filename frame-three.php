<?php // FRAME THREE - STORE ?>
<div id="product-container" class="product-container">
<?php
// Query the Products category
$issue_args = array(
    'category_name' => 'products',
    'posts_per_page' => -1
    );
$the_query = new WP_Query( $issue_args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
  <div class="product" data-id="<?php the_field('product_id'); ?>">
    <h2><?php the_title(); ?></h2>
    <h3 class="price">$18.95 <a class="add-to-cart" href="#">Add to Cart</a></h3>
    <a href="#" class="image-container ajax-store" data-request="get_post/?id=<?php echo get_the_ID(); ?>" data-template="template-store-product"></a>
  </div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
</div>