<?php
$featured_args = array(
    'category_name' => 'featured-projects',
    'posts_per_page' => 1
    );
$the_query = new WP_Query( $featured_args );
if ( $the_query->have_posts() ):
    while ( $the_query->have_posts() ):
        $the_query->the_post();

// Retreive all of our weather variables
$weatherVars = file_get_contents('http://localhost:3000/wax/wp-content/themes/wax/libs/weather-vars.php');
$weatherVars = json_decode($weatherVars);
// print_r($weatherVars);
$windDirection = $weatherVars->Wind_Direction;
$windSpeed = $weatherVars->Wind_Speed;
$windGust = $weatherVars->Wind_Gust;
$waveHeight = $weatherVars->Significant_Wave_Height;
$dominantWavePeriod = $weatherVars->Dominant_Wave_Period;
$averageWavePeriod = $weatherVars->Average_Period;

?>

<div id="frame-featured-show-overlay" class="show-overlay">
  <a class="ajax overlay-padding" data-request="get_posts/?cat=6&amp;count=-1" data-template="template-featured" data-overlay-disable="true" href="<?php echo the_permalink(); ?>">Info</a>
</div>
<div id="featured-project" class="featured-project" data-url="<?php the_field('iframe_url'); ?>?degrees=<?php echo $windDirection ?>&knots=<?php echo $windSpeed ?>">
    <div class="featured-project-overlay"></div>
    <div class="featured-project-wax-logo">
      <div id="featured-wax1" class="wax-logo wax-logo-1"></div>
      <div id="featured-wax2" class="wax-logo wax-logo-2"></div>
      <div id="featured-wax3" class="wax-logo wax-logo-3"></div>
    </div>
    <div class="featured-project-arrow active"></div>
    <iframe src="<?php the_field('iframe_url'); ?>?degrees=<?php echo $windDirection ?>&knots=<?php echo $windSpeed ?>"></iframe>
</div>
<?php
    endwhile;
endif;
wp_reset_postdata();
?>
