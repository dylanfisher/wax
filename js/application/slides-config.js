//
// Slides.js configurations
//

(function(){
    $('#project-slides').slidesjs({
        width: 840,
        height: 528,
        start: function(number) {
            $(window).trigger('scroll'); // Dirty fix to force lazy loaded images
        }
    });

    $('.issue .issue-slides').slidesjs({
        width: 862,
        height: 574,
        callback: {
            start: function(number) {
                $(window).trigger('scroll');
            }
        }
    });
})();
