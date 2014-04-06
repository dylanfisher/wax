//
// External facing pages
//

$(function(){
  if($('.external-layout-wrapper .slide-outer-container').length){
    $('.external-layout-wrapper .slideshow').slidesjs({
        width: 840,
        height: 528,
    });
  }

  if($('.external-layout-wrapper .masonry').length){
    $('.external-layout-wrapper .masonry').isotope({
      itemSelector: '.masonry-item',
      layoutMode: 'masonry'
    });
  }
});