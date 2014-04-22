//
// Slides.js configurations
//

$(function(){

    $('#project-slides').slidesjs({ // What is this?
        width: 840,
        height: 528,
        start: function(number) {
            $(window).trigger('scroll'); // Dirty fix to force lazy loaded images
        }
    });

    $('.issue .issue-slides').slick({
        slide: 'img',
        arrows: false,
        dots: true,
        draggable: false,
        easing: 'easeInOutQuad',
        lazyLoad: 'ondemand'
    });

    // Advance to next slide on click
    $(document).on('click', '.slick-slide', function(){
        $(this).closest('.slick-slider').slickNext();
    });

});
