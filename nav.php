<?php // Navigation

// Check if we are running locally
$localHost = array(
    '127.0.0.1',
    '::1'
);
$stagingURL = 'dev';
if(in_array($_SERVER['REMOTE_ADDR'], $localHost)){
    $stagingURL = 'wax';
}

$about_post = get_posts( array('posts_per_page' => 1, 'category' => 5 ) );
$about_id = $about_post[0]->ID;
$about_permalink = get_permalink($about_id);
?>
<h1 id="nav-site-title" class="nav-site-title">
    <a href="/<?php echo $stagingURL; ?>" class="wax-logo-container">
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
        <h3 id="nav-about" class="nav-about"><a class="ajax" data-request="get_post/?id=<?php echo $about_post[0]->ID; ?>" data-template="template-about" href="<?php echo $about_permalink; ?>">About</a></h3>
        <h3 id="nav-email" class="nav-email"><a href="#">&#9993;</a></h3>
        <div id="mailing-list-form" class="mailing-list-form">
            <p>Subscribe to our mailing list</p>
            <form id="email" action="" method="post">
                <input type="text" name="email" id="input-email" value="">
                <input type="submit" name="submit" id="submit" onmouseover="this.style.color='#5c7ce6'" onmouseout="this.style.color='#000'" style="color: rgb(0, 0, 0);">
            </form>
        </div>
    </div>
    <div id="tertiary" class="tertiary">
        <h3><a id="list-view" class="active" href="#">List</a> &#47; <a id="grid-view" href="#">Grid</a> : </h3>
        <h3><a class="filter-button active" data-filterby="*" href="#">All</a></h3>
        <h3><a class="filter-button" data-filterby="events" href="#">Events</a></h3>
        <h3><a class="filter-button" data-filterby="news" href="#">News</a></h3>
        <h3><a class="filter-button" data-filterby="stories" href="#">Stories</a></h3>
    </div>
</div>