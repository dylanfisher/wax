//
// Slides.js configurations
//

(function(){
    $('#project-slides').slidesjs({
        width: 940,
        height: 528,
        navigation: {
            active: false
        },
        start: function(number) {
            $(window).trigger('scroll'); // Dirty fix to force lazy loaded images
        }
    });

    $('.issue .issue-slides').slidesjs({
        width: 400,
        height: 450,
        navigation: {
            active: false
        },
        callback: {
            start: function(number) {
                $(window).trigger('scroll');
            }
        }
    });
})();