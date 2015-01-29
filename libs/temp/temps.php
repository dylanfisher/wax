<?php
require_once 'global_fns.php';
$colorboxes = writeBoxes("oceantemps.txt");
?>
<html><head><title>W  A  X  Magazine &mdash; NYC Ocean Temp</title> 
<link rel="stylesheet" type="text/css" href="CSS/style.css" /> 
<link rel="stylesheet" href="font/stylesheet.css" type="text/css" charset="utf-8" />
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery-1.7.min.js"></script>
	<script language="javascript">

			  var pixels;
			  var numboxes;
			  
			$(document).ready(function () {
				resize();
							
				});
				
				$(window).resize(function () {
				resize();
				//if (Browser.Engine.gecko) setTimeout(resize, 50);
				});
				
			function resize() {
				 var viewportwidth;
				 var viewportheight;

				 if (typeof window.innerWidth != 'undefined') {
				      viewportwidth = window.innerWidth,
				      viewportheight = window.innerHeight
				 } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
				       viewportwidth = document.documentElement.clientWidth,
				       viewportheight = document.documentElement.clientHeight
				 } else {
				       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
				       viewportheight = document.getElementsByTagName('body')[0].clientHeight
				 }
				 
				 numboxes = Math.floor(viewportwidth / 200);
				 
				 pixels = Math.floor(viewportwidth / numboxes);
				 pixels = pixels +1;
				 				 
				 var wrapperwidth = (numboxes*pixels);

				$('.colorbox').css('width',pixels);
				$('#wrapper').css('width',wrapperwidth);
			}
		</script>
		<script src="/mint/?js" type="text/javascript"></script>
</head>
<body id="temppage" style="overflow-x:hidden;">
<div id="tempheader">W  A  X  Magazine - NYC Ocean Temp</div>
<div id="return"><a href="http://readwax.com/">Return</a></div>
<div id="wrapper"><? echo $colorboxes; ?></div>
<script>
$('.colorbox').bind('hover', function(){
	$(this).attr('id');
	var div = $(this).children("div");
	$(div).toggle();
	});
</script>
</body>
</html>