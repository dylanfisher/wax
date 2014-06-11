//
// Slides.js configurations
//

$(function(){

    $('.issue .issue-slides').slick({
        arrows: false,
        dots: true,
        draggable: false,
        easing: 'easeInOutQuad',
        lazyLoad: 'progressive'
    });

    // Advance to next slide on click
    $(document).on('click', '.slick-slide', function(){
        $(this).closest('.slick-slider').slickNext();
    });

});

// Initiate slides
function StoreSlideshowSlick(){
    $('.product-viewer-content .slideshow').slick({
        arrows: false,
        dots: true,
        draggable: false,
        easing: 'easeInOutQuad',
        lazyLoad: 'ondemand'
    });
}
