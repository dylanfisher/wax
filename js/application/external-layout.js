//
// External facing pages
//

$(function(){
  if($('#overlay-content .slide-outer-container').length){
    $('#overlay-content .slideshow').slidesjs({
        width: 840,
        height: 528,
    });
  }

  if($('#overlay-content .masonry').length){
    $('#overlay-content .masonry').isotope({
      itemSelector: '.masonry-item',
      layoutMode: 'masonry'
    });
  }
});