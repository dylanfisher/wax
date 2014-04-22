//
// External facing pages
//

$(function(){
  if($('.external-layout-wrapper .slide-outer-container').length){
    $('.external-layout-wrapper .slideshow').slick({
        arrows: false,
        dots: true,
        draggable: false,
        easing: 'easeInOutQuad',
        lazyLoad: 'ondemand'
    });
  }

  if($('.external-layout-wrapper .masonry').length){
    $('.external-layout-wrapper .masonry').isotope({
      itemSelector: '.masonry-item',
      layoutMode: 'masonry'
    });
  }
});
