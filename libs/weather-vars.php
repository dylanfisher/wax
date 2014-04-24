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

$data = getWeatherData($buoys[1]);

// Serve from the cache if it is younger than $cachetime OR the buoy data is not empty
if (file_exists($cachefile) && (time() - $cachetime < filemtime($cachefile)) || empty($data)) {
    include($cachefile);
    exit;
}
ob_start(); // start the output buffer
// End Cache Head

$test = strstr($data, '<strong>');
$itemsToRemove = array('<strong>', '</strong>', '<br />');
$test = str_replace($itemsToRemove, '', $test);
$test = str_replace('&#176;', ' degrees ', $test);
$test = preg_replace('/^.+\n/', '', $test);
$test = preg_replace('/ {2}/', '', $test);
preg_match_all('/.*(?=:)/', $test, $keys);
preg_match_all('/: (.+)/', $test, $values);
$keys = array_filter($keys[0]);
$keys = str_replace(' ', '_', $keys);
$values = array_filter($values[0]);
// Remove all non numeric characters
$values = preg_replace('/[^0-9,.]/', '', $values);
$test = array_combine($keys, $values);
$test = str_replace(': ', '', $test);
$test = json_encode($test);

echo $test;

// echo time();

// Start Cache Footer
$fp = fopen($cachefile, 'w'); // open the cache file for writing
fwrite($fp, ob_get_contents()); // save the contents of output buffer to the file
fclose($fp); // close the file
ob_end_flush(); // Send the output to the browser
// End Cache Footer

?>
