<?php

//getWeatherData ("http://www.ndbc.noaa.gov/data/latest_obs/44065.rss");
//echo getTemp ("http://www.ndbc.noaa.gov/data/latest_obs/44065.rss");

function is_odd($num){
    return (is_numeric($num)&($num&1));
}

// Checks each buoy
// pulls weather description
// parses for temp and returns number
function getTemp($noaaBuoys)
{
	foreach ($noaaBuoys as $key => $URL) {
		$temp = parseTemp(getWeatherData($URL));
		if (isset($temp)) return $temp;
	}
}

// Searches $string - description text from the NOAA
// for temp - using a regular expression match
// for two integers plus decimal plus one integer
// returns temp!
function parseTemp($string)
{
	// Parse the buoy description for the line containing "Water Temperature"
	$watertemp = strstr($string, 'Water Temperature:'); 
	//$temp = substr($string, -3, 1);
	$pattern = '/[0-9][0-9]\.[0-9]/';
	preg_match($pattern, $watertemp, $matches);
	return $matches[0];
}


// Takes the buoy RSS feed and passes back the description line, 
// which contains all the data read by the buoy
function getWeatherData($URL)
{
		// Get the requested URL data		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $URL);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$data = curl_exec($ch);
		curl_close($ch);
		
		libxml_use_internal_errors(true);
		
		try {
			// get the root node
			$xml = new SimpleXmlElement($data, LIBXML_NOCDATA);
		}
		
		catch (Exception $e) { return false; }
		
		if (!$xml) { return false; }
		
		// Parse the Xml
		// Get the description node from the item, channel node within that
		$description = $xml->channel->item->description;
			
	return $description;
}


function parseWeatherData($data)
{
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

	return $test;
}


function writeDate()
{
	return date(j . " " . M . " ".Y);
}


// input temp,
// returns rgb array
// and hex
function get_color($temp,$saturation,$brightness)
{

	// Calculate the color Hue
	// based on ocean temp
	// 
	// Range = 32 (low) -> 78 (high)
	// 46 color values
	// 78 should be 1 (red)
	// 32 should be 270 (blue)
	
	$temp_mod = 49 - ($temp - 32);
	$hue = round((270 * $temp_mod)/49);
	if ($hue <= 0) $hue = 1;
	//$saturation = .75;
	// Set brightness to 100%
	//$brightness = .75;
	
	// echo "Hue:" . $hue . "<br>";
	
	// Calculate the HEX color
	$hex =  hsv2hex ($hue, $saturation, $brightness);

	return $hex;

}


/** 
  * This function converts HSV (Hue, Saturation, Value) color values 
  * to hexidecimal color values for use in html, css, and other applications
  *
  * Input HUE ($H) as a number from 1 to 359,
  * SATURATION ($S) as percentage from 0 to 1 (eg, .1 = 10% Saturation),
  * and VALUE ($V) as percentage from 0 to 1 (eg, .1 = 10% Value)
  * 
  * The function will return a string containing the hex value
  */ 
function hsv2hex ( $H , $S , $V )
{
	$rgb = hsv2rgb($H,$S,$V);
	
	// print_r($rgb);

    return rgb2hex($rgb);
}



/** 
  * This function converts HSV (Hue, Saturation, Value) color values to RGB integers
  *
  * Input HUE ($H) as a number from 1 to 359,
  * SATURATION ($S) as percentage from 0 to 1 (eg, .1 = 10% Saturation),
  * and VALUE ($V) as percentage from 0 to 1 (eg, .1 = 10% Value)
  * 
  * The function will return an array containing the rgb values,
  * eg, $arrayColors = array (red_integer, green_integer, blue_integer)
  * or, $arrayColors[0] = red_integer,$arrayColors[1] = green_integer,$arrayColors[2] = blue_integer, 
  */ 
function hsv2rgb ( $H , $S , $V )
{	

	if ($H > 360) { return array(210,210,210); }

	if ($S == 0) return array($V * 255,$V * 255,$V * 255);

	$Hi = floor($H/60);
	$f  = (($H/60) - $Hi);
	$p  = ($V * (1 - $S));
	$q  = ($V * (1 - ($S * $f)));
	$t  = ($V * (1 - ($S * (1 - $f))));

	switch ( $Hi )
	{
		case 0  : $red = $V; $gre = $t; $blu = $p; break;
		case 1  : $red = $q; $gre = $V; $blu = $p; break;
		case 2  : $red = $p; $gre = $V; $blu = $t; break;
		case 3  : $red = $p; $gre = $q; $blu = $V; break;
		case 4  : $red = $t; $gre = $p; $blu = $V; break;
		case 5  : $red = $V; $gre = $p; $blu = $q; break;
		default : exit("error -- invalid parameters\n\n");
	}

	return array(round($red * 255),round($gre * 255),round($blu * 255));
}

/** 
  * This function converts RGB integers to hex values
  *
  * Input an array containing red, green, and blue integers
  * eg, $arrayColors = array (red_integer, green_integer, blue_integer)
  * 
  * The function will return a string containing an equivalent hex color value
  */ 
function rgb2hex($r, $g=-1, $b=-1)
{
    if (is_array($r) && sizeof($r) == 3)
        list($r, $g, $b) = $r;

    $r = intval($r); $g = intval($g);
    $b = intval($b);

    $r = dechex($r<0?0:($r>255?255:$r));
    $g = dechex($g<0?0:($g>255?255:$g));
    $b = dechex($b<0?0:($b>255?255:$b));

    $color = (strlen($r) < 2?'0':'').$r;
    $color .= (strlen($g) < 2?'0':'').$g;
    $color .= (strlen($b) < 2?'0':'').$b;
    return '#'.$color;
}

// Gets the current temp, formatted date and timestamp
// writes into a textfile
function recordTemp ($buoys)
{

	// Check the temp 5 times
	// or until it gets the temp
	$i=0;
	do {
		$tempF = getTemp($buoys);
		$i++;
	}
	while ($i < 5 && $tempF == "");

	// Check to see if there is a temp
	// if not return nothing
	if ($tempF == "") return null;
	
	// Get the date and convert the temp to C
	$date = writeDate();
	$timestamp = time();
	$tempC = ftoc($tempF);
	$info = $timestamp . "\t" . $date . "\t" . $tempF . "\t" . $tempC . "\n";
	
	// Open the text file and write to it, then close it
	$myFile = getcwd() . '/oceantemps.txt';
	$fh = fopen($myFile, 'a') or die("can't open file");
	if (fwrite($fh, $info)) {
		echo "Wrote file!\n";
		echo $date . "\n";
		echo $tempF . " degrees F\n";
		echo $tempC . " degrees C\n";
	} else {
		echo "Didn't write file!";
	}
	fclose($fh);
}

function getTemps ($tempfile)
{	
	$file = file_get_contents($tempfile);
	$entry = explode ("\n",$file);
	return $entry;
}

// Reads the text file with all the temps
// loops through and writes a div for each line
function writeBoxes($tempfile)
{
	$temps = getTemps($tempfile);
	$temps = array_reverse($temps);
  $boxes = "";
	foreach ($temps as $key => $value) {
		if ($value !== "")
			$data = explode ("\t",$value);
		else continue;
		// 0 = timestamp
		// 1 = formatted date
		// 2 = temp in farenheit
		// 3 = temp in celcius
		if ($data[2] !== "") {
			$hexcolor = get_color($data[2], .6, .9);
			$degreesf = round($data[2],0) . "&#176;F";
			$degreesc = round($data[3],0) . "&#176;C";
			$boxes .= "<div id=".$data[0]." class=\"colorbox\" style=\"background-color:".$hexcolor."\"><div class=\"date\">".$data[1]."</div><div class=\"temp\">".$degreesf." &frasl; ".$degreesc."</div></div>\n";
		} else {
			continue;
		}
	}
	
	return $boxes;
}

// Converts degrees F to degrees C
function ftoc($degreesF)
{
	return round ((($degreesF - 32)*5/9),1);
}

?>