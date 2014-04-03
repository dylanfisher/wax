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
        width: 400,
        height: 450,
        callback: {
            start: function(number) {
                $(window).trigger('scroll');
            }
        }
    });
})();