<?php

// Start Cache Head
$dir = 'cache';
 if ( !file_exists($dir) ) {
  mkdir ($dir, 0744);
 }
$cachefile = 'cache/'.basename($_SERVER['REQUEST_URI']);
$cachetime = 60 * 30; // Checking every 30 minutes (base this off the buoy update interval)
                      // Right now mauntauk is every 60 minutes

require_once 'temp/global_vars.php';
require_once 'temp/global_fns.php';

$data = getWeatherData($buoys[5]);

// Serve from the cache if it is younger than $cachetime OR the buoy data is not empty
if (file_exists($cachefile) && (time() - $cachetime < filemtime($cachefile)) || empty($data)) {
    include($cachefile);
    exit;
}
ob_start(); // start the output buffer
// End Cache Head

echo parseWeatherData($data);

// echo time();

// Start Cache Footer
$fp = fopen($cachefile, 'w'); // open the cache file for writing
fwrite($fp, ob_get_contents()); // save the contents of output buffer to the file
fclose($fp); // close the file
ob_end_flush(); // Send the output to the browser
// End Cache Footer

?>
