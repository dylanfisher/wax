//
// Slides.js configurations
//

$(function(){
  var $imgs = $('.lazy');
  // Lazy load images
  $('.lazy').lazyload({
    threshold : 400,
    skip_invisible : true,
    // Set failure limit to be the number of lazy images in the DOM (since images are non sequential)
    failure_limit: Math.max($imgs.length - 1, 0)
  });
});