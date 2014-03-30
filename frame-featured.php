<?php
$featured_args = array(
    'category_name' => 'featured-projects',
    'posts_per_page' => 1
    );
$the_query = new WP_Query( $featured_args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();
?>
<div id="frame-featured-show-overlay" class="show-overlay"><a class="ajax" data-request="get_posts/?cat=6&amp;count=-1" data-template="template-featured" href="<?php echo the_permalink(); ?>">Info</a></div>
<div id="featured-project" class="featured-project">
    <div class="featured-project-overlay"></div>
    <iframe src="<?php the_field('iframe_url'); ?>"></iframe>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>



<!-- <div id="frame-featured-overlay" class="overlay hidden">
    <ul>
        <li>Current</li>
        <li>Past</li>
    </ul>
    <div id="project-slides" class="project-slides">
        <div class="project-current">
            <div class="project-info">Description about this space goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis, lacus in commodo euismod, nibh mauris viverra libero, id tempus nulla magna a quam. Aenean et nibh fermentum, dignissim mauris ac, blandit est.</div>
            <div>Current Project</div>
            <h2>Into Time by Rafael Rozendaal</h2>
            <div>Share This Project</div>
        </div>
        <div class="project-past">
            <ul>
                <li>
                    <ul>
                        <li>Into Time</li>
                        <li>by Rafael Rozendaal</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>All Watched Over By Machines</li>
                        <li>by Pascual Sisto</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>Canopy</li>
                        <li>by Rick Silva</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div> -->