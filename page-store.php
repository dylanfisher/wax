<?php
/*
Template Name: Page - Store
*/
?>
<?php get_header() ?>
        <div class="content">
<?php the_post() ?>
            <section id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
                <h2 class="entry-title"><?php the_title() ?></h2>
                <div class="entry-content">
                    <a id="cart-count" href="#"><b>Get Cart Item Count</b></a>
                    <br>
                    <a id="cart-permalink" href="#" target="_blank">Check out DIRECTLY (with cart permalink)</a>
                    <br>
                    <a id="cart-permalink" href="http://store.readwax.com/cart" target="_blank">Check out by going to CART first</a>
                    <br>
                    <a id="clear" href="#">Clear Cart with hidden iframe</a>
                    <br>
                    <a id="update" href="#">Update "WAX Magazine, Issue #2, #3, #4 Promo" to 10 items (must have 1 in your cart already)</a>
                    <br>
                    <iframe id="test-iframe" src="" width="400" height="150"></iframe>
                    <p>Cart item count = <span id="cart-item-count"></span></p>
                    <div id="product-container" class="product-container"></div>
<?php the_content() ?>
                </div>
            </section><!-- .post -->
        </div><!-- .content -->
<?php get_footer() ?>
</body>
</html>