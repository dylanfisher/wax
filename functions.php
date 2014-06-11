<?php

// Set cookie after first visit
add_action( 'init', 'sandbox_daily_cookies' );
function sandbox_daily_cookies(){
    if (!isset($_COOKIE['WAX_passport'])) {
        // If cookie is not set, stamp the visitor's passport
        setcookie('WAX_passport', 'true', strtotime('+1 day'));
    }
}

// URL routing for pushState
add_action( 'template_redirect', 'sandbox_pushState_route' );
function sandbox_pushState_route(){

  // Make the following pages use the default application template
  if( is_page( array('issues', 'store', 'features') ) ){
    include( get_template_directory() . '/page-application.php' );
    exit;
  }

  $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
  if(is_front_page() && isset($_COOKIE['WAX_passport']) && strpos($url,'features') === false){
    header("LOCATION:" . get_home_url() . "/features");
  } else {
    // Don't change location
  }
}

// Increase default image compression level
add_filter( 'jpeg_quality', 'sandbox_jpeg_full_quality' );
function sandbox_jpeg_full_quality( $quality ) { return 98; }

///////////////////////////////////
//    BEGIN SANDBOX FUNCTIONS    //
///////////////////////////////////

// Produces a list of pages in the header without whitespace
function sandbox_globalnav() {
    if ( $menu = str_replace( array( "\r", "\n", "\t" ), '', wp_list_pages('title_li=&sort_column=menu_order&echo=0') ) )
        $menu = '<ul>' . $menu . '</ul>';
    $menu = '<div id="menu">' . $menu . "</div>\n";
    echo apply_filters( 'globalnav_menu', $menu ); // Filter to override default globalnav: globalnav_menu
}

// Generates semantic classes for BODY element
function sandbox_body_class( $print = true ) {
    global $wp_query, $current_user;

    // Generic semantic classes for what type of content is displayed
    is_front_page()  ? $c[] = 'home'       : null; // For the front page, if set
    is_home()        ? $c[] = 'blog'       : null; // For the blog posts page, if set
    is_archive()     ? $c[] = 'archive'    : null;
    is_date()        ? $c[] = 'date'       : null;
    is_search()      ? $c[] = 'search'     : null;
    is_paged()       ? $c[] = 'paged'      : null;
    is_attachment()  ? $c[] = 'attachment' : null;
    is_404()         ? $c[] = 'four04'     : null; // CSS does not allow a digit as first character

    // Special classes for BODY element when a single post
    if ( is_single() ) {
        $postID = $wp_query->post->ID;
        the_post();

        // Adds 'single' class and class with the post ID
        $c[] = 'single postid-' . $postID;

        // Adds category classes for each category on single posts
        if ( $cats = get_the_category() )
            foreach ( $cats as $cat )
                $c[] = 's-category-' . $cat->slug;

        // Adds tag classes for each tags on single posts
        if ( $tags = get_the_tags() )
            foreach ( $tags as $tag )
                $c[] = 's-tag-' . $tag->slug;

        // Adds MIME-specific classes for attachments
        if ( is_attachment() ) {
            $mime_type = get_post_mime_type();
            $mime_prefix = array( 'application/', 'image/', 'text/', 'audio/', 'video/', 'music/' );
                $c[] = 'attachmentid-' . $postID . ' attachment-' . str_replace( $mime_prefix, "", "$mime_type" );
        }

        // Adds author class for the post author
        $c[] = 's-author-' . sanitize_title_with_dashes(strtolower(get_the_author_meta('login')));
        rewind_posts();
    }

    // Author name classes for BODY on author archives
    elseif ( is_author() ) {
        $author = $wp_query->get_queried_object();
        $c[] = 'author';
        $c[] = 'author-' . $author->user_nicename;
    }

    // Category name classes for BODY on category archvies
    elseif ( is_category() ) {
        $cat = $wp_query->get_queried_object();
        $c[] = 'category';
        $c[] = 'category-' . $cat->slug;
    }

    // Tag name classes for BODY on tag archives
    elseif ( is_tag() ) {
        $tags = $wp_query->get_queried_object();
        $c[] = 'tag';
        $c[] = 'tag-' . $tags->slug;
    }

    // Page author for BODY on 'pages'
    elseif ( is_page() ) {
        $pageID = $wp_query->post->ID;
        $page_children = wp_list_pages("child_of=$pageID&echo=0");
        the_post();
        $c[] = 'page pageid-' . $pageID;
        $c[] = 'page-author-' . sanitize_title_with_dashes(strtolower(get_the_author()));
        // Checks to see if the page has children and/or is a child page; props to Adam
        if ( $page_children )
            $c[] = 'page-parent';
        if ( $wp_query->post->post_parent )
            $c[] = 'page-child parent-pageid-' . $wp_query->post->post_parent;
        if ( is_page_template() ) // Hat tip to Ian, themeshaper.com
            $c[] = 'page-template page-template-' . str_replace( '.php', '-php', get_post_meta( $pageID, '_wp_page_template', true ) );
        rewind_posts();
    }

    // Search classes for results or no results
    elseif ( is_search() ) {
        the_post();
        if ( have_posts() ) {
            $c[] = 'search-results';
        } else {
            $c[] = 'search-no-results';
        }
        rewind_posts();
    }

    // For when a visitor is logged in while browsing
    if ( $current_user->ID )
        $c[] = 'loggedin';

    // Paged classes; for 'page X' classes of index, single, etc.
    if ( ( ( $page = $wp_query->get('paged') ) || ( $page = $wp_query->get('page') ) ) && $page > 1 ) {
        // Thanks to Prentiss Riddle, twitter.com/pzriddle, for the security fix below.
        $page = intval($page); // Ensures that an integer (not some dangerous script) is passed for the variable
        $c[] = 'paged-' . $page;
        if ( is_single() ) {
            $c[] = 'single-paged-' . $page;
        } elseif ( is_page() ) {
            $c[] = 'page-paged-' . $page;
        } elseif ( is_category() ) {
            $c[] = 'category-paged-' . $page;
        } elseif ( is_tag() ) {
            $c[] = 'tag-paged-' . $page;
        } elseif ( is_date() ) {
            $c[] = 'date-paged-' . $page;
        } elseif ( is_author() ) {
            $c[] = 'author-paged-' . $page;
        } elseif ( is_search() ) {
            $c[] = 'search-paged-' . $page;
        }
    }

    // Separates classes with a single space, collates classes for BODY
    $c = join( ' ', apply_filters( 'body_class',  $c ) ); // Available filter: body_class

    // And tada!
    return $print ? print($c) : $c;
}

// Generates semantic classes for each post DIV element
function sandbox_post_class( $print = true ) {
    global $post, $sandbox_post_alt;

    // hentry for hAtom compliace, gets 'alt' for every other post DIV, describes the post type and p[n]
    $c = array( 'hentry', "p$sandbox_post_alt", $post->post_type, $post->post_status );

    // Author for the post queried
    $c[] = 'author-' . sanitize_title_with_dashes(strtolower(get_the_author()));

    // Category for the post queried
    foreach ( (array) get_the_category() as $cat )
        $c[] = 'category-' . $cat->slug;

    // Tags for the post queried; if not tagged, use .untagged
    if ( get_the_tags() == null ) {
        $c[] = 'untagged';
    } else {
        foreach ( (array) get_the_tags() as $tag )
            $c[] = 'tag-' . $tag->slug;
    }

    // For password-protected posts
    if ( $post->post_password )
        $c[] = 'protected';

    // If it's the other to the every, then add 'alt' class
    if ( ++$sandbox_post_alt % 2 )
        $c[] = 'alt';

    // Separates classes with a single space, collates classes for post DIV
    $c = join( ' ', apply_filters( 'post_class', $c ) ); // Available filter: post_class

    // And tada!
    return $print ? print($c) : $c;
}

// Define the num val for 'alt' classes (in post DIV and comment LI)
$sandbox_post_alt = 1;

// Generates semantic classes for each comment LI element
function sandbox_comment_class( $print = true ) {
    global $comment, $post, $sandbox_comment_alt;

    // Collects the comment type (comment, trackback),
    $c = array( $comment->comment_type );

    // Counts trackbacks (t[n]) or comments (c[n])
    if ( $comment->comment_type == 'comment' ) {
        $c[] = "c$sandbox_comment_alt";
    } else {
        $c[] = "t$sandbox_comment_alt";
    }

    // If the comment author has an id (registered), then print the log in name
    if ( $comment->user_id > 0 ) {
        $user = get_userdata($comment->user_id);
        // For all registered users, 'byuser'; to specificy the registered user, 'commentauthor+[log in name]'
        $c[] = 'byuser comment-author-' . sanitize_title_with_dashes(strtolower( $user->user_login ));
        // For comment authors who are the author of the post
        if ( $comment->user_id === $post->post_author )
            $c[] = 'bypostauthor';
    }

    // If it's the other to the every, then add 'alt' class; collects time- and date-based classes
    sandbox_date_classes( mysql2date( 'U', $comment->comment_date ), $c, 'c-' );
    if ( ++$sandbox_comment_alt % 2 )
        $c[] = 'alt';

    // Separates classes with a single space, collates classes for comment LI
    $c = join( ' ', apply_filters( 'comment_class', $c ) ); // Available filter: comment_class

    // Tada again!
    return $print ? print($c) : $c;
}

// For category lists on category archives: Returns other categories except the current one (redundant)
function sandbox_cats_meow($glue) {
    $current_cat = single_cat_title( '', false );
    $separator = "\n";
    $cats = explode( $separator, get_the_category_list($separator) );
    foreach ( $cats as $i => $str ) {
        if ( strstr( $str, ">$current_cat<" ) ) {
            unset($cats[$i]);
            break;
        }
    }
    if ( empty($cats) )
        return false;

    return trim(join( $glue, $cats ));
}

// For tag lists on tag archives: Returns other tags except the current one (redundant)
function sandbox_tag_ur_it($glue) {
    $current_tag = single_tag_title( '', '',  false );
    $separator = "\n";
    $tags = explode( $separator, get_the_tag_list( "", "$separator", "" ) );
    foreach ( $tags as $i => $str ) {
        if ( strstr( $str, ">$current_tag<" ) ) {
            unset($tags[$i]);
            break;
        }
    }
    if ( empty($tags) )
        return false;

    return trim(join( $glue, $tags ));
}

// Translate, if applicable
load_theme_textdomain('sandbox');

// Adds filters for the description/meta content in archives.php
add_filter( 'archive_meta', 'wptexturize' );
add_filter( 'archive_meta', 'convert_smilies' );
add_filter( 'archive_meta', 'convert_chars' );
add_filter( 'archive_meta', 'wpautop' );

///////////////////////////////////
//     END SANDBOX FUNCTIONS     //
///////////////////////////////////

// Add support for Advanced Custom Fields JSON data in JSON-API plugin
add_filter('json_api_encode', 'sandbox_json_api_encode_acf');
function sandbox_json_api_encode_acf($response)
{
    if (isset($response['posts'])) {
        foreach ($response['posts'] as $post) {
            sandbox_json_api_add_acf($post); // Add specs to each post
        }
    }
    else if (isset($response['post'])) {
        sandbox_json_api_add_acf($response['post']); // Add a specs property
    }

    return $response;
}

function sandbox_json_api_add_acf(&$post)
{
    $post->acf = get_fields($post->id);
}

// Disable Wordpress Generator meta tag for security reasons
function sandbox_version_info() {
     return '';
}
add_filter('the_generator', 'sandbox_version_info');

// Remove unnecessary wp_head items
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);

// Disable Admin Bar
add_filter('show_admin_bar', '__return_false');

// Adds custom menu support
add_theme_support( 'menus' );

// Function to create slug out of text
function sandbox_slugify( $text )
{
    $str = strtolower( trim( $text ) );
    $str = preg_replace( '/[^a-z0-9-]/', '-', $str );
    $str = preg_replace( '/-+/', "-", $str );
    return trim( $str, '-' );
}

// Custom excerpt size
function sandbox_custom_excerpt($limit) {
  $excerpt = explode(' ', get_the_excerpt(), $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  }
  $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
  return $excerpt;
}

function sandbox_content($limit) {
  $content = explode(' ', get_the_content(), $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  }
  $content = preg_replace('/\[.+\]/','', $content);
  $content = apply_filters('the_content', $content);
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}

// Add Custom Image Sizes
// add_image_size( 'custom-image-size-name', 300, 300, true ); // Custom Image - Name, Width, Height, Hard Crop boolean
add_image_size( 'issue-slider', 860, 582, false ); // Issue page carousels
add_image_size( 'features-list', 900, 600, false ); // Features page list of stories
add_image_size( 'features-overlay', 1032, 800, false ); // Individual feature pages (one column template)
add_image_size( 'features-overlay-two-column', 498, 600, false ); // Individual feature pages (two column template)

// Open external links in new windows
/* function sandbox_autoblank($text) {
$return = str_replace('href=', 'target="_blank" href=', $text);
$return = str_replace('target="_blank" href="echo home_url()', 'echo home_url()', $return);
$return = str_replace('target="_blank" href="#', 'href="#', $return);
$return = str_replace(' target = "_blank">', '>', $return);
return $return;
}
add_filter('the_content', 'sandbox_autoblank');
add_filter('comment_text', 'sandbox_autoblank'); */

// Check for custom Single Post templates by category ID. Format for new template names is single-category[ID#].php (ommiting the brackets)
/*
add_filter('single_template', create_function('$t', 'foreach( (array) get_the_category() as $cat ) { if ( file_exists(TEMPLATEPATH . "/single-{$cat->term_id}.php") ) return TEMPLATEPATH . "/single-{$cat->term_id}.php"; } return $t;' ));
 */

// REMOVE META BOXES FROM WORDPRESS DASHBOARD FOR ALL USERS
function sandbox_remove_dashboard_widgets(){
    // Globalize the metaboxes array, this holds all the widgets for wp-admin
    global $wp_meta_boxes;
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);}
add_action('wp_dashboard_setup', 'sandbox_remove_dashboard_widgets' );

//
// Custom TinyMCE styles
//

// Callback function to insert 'styleselect' into the $buttons array
function sandbox_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter('mce_buttons_2', 'sandbox_mce_buttons_2');

// Callback function to filter the MCE settings. Add custom styles to this array
function sandbox_mce_before_init_insert_formats( $init_array ) {
    // Define the style_formats array
    $style_formats = array(
        // Each array child is a format with it's own settings
        array(
            'title' => 'Intro',
            'block' => 'div',
            'classes' => 'intro-text',
            'wrapper' => true,
        ),
        array(
            'title' => 'Section Header',
            'block' => 'div',
            'classes' => 'section-header',
            'wrapper' => true,
        ),
    );
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;
}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'sandbox_mce_before_init_insert_formats' );

// Add a custom style sheet for our TinyMCE styles within the admin editor screen
function sandbox_mce_add_editor_styles() {
    add_editor_style( 'custom-editor-style.css' );
}
add_action( 'init', 'sandbox_mce_add_editor_styles' );

?>
