    <?php include 'mustache-templates.html' ?><?php //  Container for the mustache templates ?>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php echo get_bloginfo('template_url'); ?>/js/jquery-1.10.1.min.js"><\/script>')</script>
    <script src="<?php echo get_bloginfo('template_url'); ?>/js/build/application.js"></script>
    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-27225017-1');ga('send','pageview');
    </script>
    <script src="<?php echo get_bloginfo('template_url'); ?>/private/mint/?js" type="text/javascript"></script>
<?php wp_footer() ?>

</body>
</html>
