<?php if ($_REQUEST['pg']) {
  $page = "page/" . $_REQUEST['pg'];
} else {
  $page = "";
}

$url = "http://waxmag.tumblr.com/" . $page;
$raw = file_get_contents($url);
$newlines = array("\t","\n","\r","\x20\x20","\0","\x0B");
$content = str_replace($newlines, "", html_entity_decode($raw));
$start = strpos($content,'<div class = "autopagerize_page_element" >');
$end = strpos($content,'</div>',$start) + 8;
$table = substr($content,$start,$end-$start);
preg_match_all("|<a(.*)/a>|U",$table,$rows);

foreach ($rows[0] as $row){ 
  print("<div class='image'>");
  print($row); 
  print("</div>");
}

?>