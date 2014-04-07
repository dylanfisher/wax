<?php // Application global variables

require_once getcwd() . '/wp-content/themes/wax/libs/temp/global_fns.php';
require_once getcwd() . '/wp-content/themes/wax/libs/temp/global_vars.php';

$temp = getTemp($buoys);
$temp = round($temp,0);
$saturation = .6;
$brightness = .9;
global $bgcolor;
$bgcolor = get_color($temp,$saturation,$brightness);

?>