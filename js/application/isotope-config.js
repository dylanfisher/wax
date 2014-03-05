//
// Isotope config
//

$(function(){
  var easing = 'easeInOutQuad',
      speed = 400;

  // Grid and list view on Frame Two with Isotope
  $('#frame-two-content img').imagesLoaded(function(){
    $('#frame-two-content').isotope({
      itemSelector: '.story',
      layoutMode: 'vertical',
      vertical: {
        horizontalAlignment: 0.5
      }
    });
    $('#frame-two-content').isotope('on', 'layoutComplete', function(){
      $('body').removeClass('overflow-x-hidden');
    });
  });
  $('#list-view').click(function(){
    $('#frame-two-content')
    .fadeTo(speed, 0, easing, function(){
      $('body').addClass('overflow-x-hidden');
      $('#frame-two-content')
      .fadeTo(speed, 1, easing)
      .removeClass('grid-view')
      .isotope({
        itemSelector: '.story',
        layoutMode: 'vertical',
        vertical: {
          horizontalAlignment: 0.5
        }
      });
    });
  });
  $('#grid-view').click(function(){
    $('#frame-two-content')
    .fadeTo(speed, 0, easing, function(){
      $('body').addClass('overflow-x-hidden');
      $('#frame-two-content')
      .fadeTo(speed, 1, easing)
      .addClass('grid-view')
      .isotope({
        itemSelector: '.story',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 40
        }
      });
    });
  });
});