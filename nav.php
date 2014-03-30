<?php // Navigation ?>
<?php
$about_post = get_posts( array('posts_per_page' => 1, 'category' => 5 ) );
?>
<h1 id="nav-site-title" class="nav-site-title">
    <a href="#" class="wax-logo-container">
        <div id="wax1" class="wax-logo">W</div>
        <div id="wax2" class="wax-logo active">A</div>
        <div id="wax3" class="wax-logo">X</div>
    </a>
</h1>
<div id="fixed-nav" class="fixed-nav">
    <div id="primary" class="primary">
        <h2 id="nav-issues"><a href="/<?php echo $stagingURL; ?>/issues/">Issues</a></h2>
        <h2 id="nav-home"><a href="/<?php echo $stagingURL; ?>">Features</a></h2>
        <h2 id="nav-store"><a href="/<?php echo $stagingURL; ?>/store/">Store</a></h2>
    </div>
    <div id="secondary" class="secondary">
        <h3 id="nav-cart" class="nav-cart"><a id="nav-cart-permalink" class="cart-permalink" data-request="store_cart" data-template="template-cart" href="http://store.readwax.com/"><span id="cart-item-count"></span></a></h3>
        <h3 id="nav-finds" class="nav-finds"><a href="#">Finds</a></h3>
        <h3 id="nav-about" class="nav-about"><a class="ajax" data-request="get_post/?id=<?php echo $about_post[0]->ID; ?>" data-template="template-about" href="<?php echo $about_post[0]->guid; ?>">About</a></h3>
        <h3 id="nav-email" class="nav-email"><a href="#">&#9993;</a></h3>
    </div>
    <div id="tertiary" class="tertiary">
        <h3><a id="list-view" class="active" href="#">List</a> &#47; <a id="grid-view" href="#">Grid</a> : </h3>
        <h3><a class="filter-button active" data-filterby="*" href="#">All</a></h3>
        <h3><a class="filter-button" data-filterby="events" href="#">Events</a></h3>
        <h3><a class="filter-button" data-filterby="news" href="#">News</a></h3>
        <h3><a class="filter-button" data-filterby="stories" href="#">Stories</a></h3>
    </div>
</div>