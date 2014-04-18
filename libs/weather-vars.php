<?php

// Start Cache Head
$dir = 'cache';
 if ( !file_exists($dir) ) {
  mkdir ($dir, 0744);
 }
$cachefile = 'cache/'.basename($_SERVER['REQUEST_URI']);
$cachetime = 60 * 10;
// Serve from the cache if it is younger than $cachetime
if (file_exists($cachefile) && (time() - $cachetime < filemtime($cachefile))) {
    include($cachefile);
    exit;
}
ob_start(); // start the output buffer
// End Cache Head


include '../private/api-keys.php';

// LAT/LONG = NEW YORK HARBOR ENTRANCE - 15 NM SE OF BREEZY POINT , NY
// $marine_weather = file_get_contents('http://api.worldweatheronline.com/free/v1/marine.ashx?q=40.442603%2C-73.867264&format=json&includelocation=yes&key=' . $worldWeatherApi);
$local_weather = file_get_contents('http://api.worldweatheronline.com/free/v1/weather.ashx?q=40.442603%2C-73.867264&format=json&includelocation=yes&key=' . $worldWeatherApi);

echo $local_weather;


// Start Cache Footer
$fp = fopen($cachefile, 'w'); // open the cache file for writing
fwrite($fp, ob_get_contents()); // save the contents of output buffer to the file
fclose($fp); // close the file
ob_end_flush(); // Send the output to the browser
// End Cache Footer

?>