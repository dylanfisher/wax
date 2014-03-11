//
// Isotope config
//

$(function(){
  var easing = 'easeInOutSine',
      speed = 200,
      $container = $('#frame-two-content');

  // Grid and list view on Frame Two with Isotope
  $('#frame-two-content img').imagesLoaded(function(){
    $container.isotope({
      itemSelector: '.features-item',
      layoutMode: 'vertical',
      vertical: {
        horizontalAlignment: 0.5
      }
    });
    // add/remove classes to hide/revealing items
    var itemReveal = Isotope.Item.prototype.reveal;
    Isotope.Item.prototype.reveal = function() {
      itemReveal.apply( this, arguments );
      $( this.element ).removeClass('isotope-hidden');
    };
    var itemHide = Isotope.Item.prototype.hide;
    Isotope.Item.prototype.hide = function() {
      itemHide.apply( this, arguments );
      $( this.element ).addClass('isotope-hidden');
    };
  });
  $('#list-view').click(function(){
    $('#list-view, #grid-view').removeClass('active');
    $(this).addClass('active');
    $container
    .fadeTo(speed, 0, easing, function(){
      $('#frame-two-content').css({width: 'auto'});
      $container
      .fadeTo(speed, 1, easing)
      .removeClass('grid-view')
      .isotope({
        itemSelector: '.features-item',
        layoutMode: 'vertical',
        vertical: {
          horizontalAlignment: 0.5
        }
      });
    });
  });
  $('#grid-view').click(function(){
    $('#list-view, #grid-view').removeClass('active');
    $(this).addClass('active');
    $container
    .fadeTo(speed, 0, easing, function(){
      $container
      .fadeTo(speed, 1, easing)
      .addClass('grid-view')
      .isotope({
        itemSelector: '.features-item',
        layoutMode: 'masonry',
        masonry: {
          isFitWidth: true,
          gutter: 40
        }
      });
    });
  });

  $('.filter-button').click(function(e){
    $('.filter-button').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    var filterValue = $(this).attr('data-filterby');
    $container
    .fadeTo(speed, 0, easing, function(){
      if(filterValue == '*'){
        $container.fadeTo(speed, 1, easing).isotope({ filter: '*' });
      } else {
        $container.fadeTo(speed, 1, easing).isotope({ filter: '[data-filter="' + filterValue + '"]' });
      }
    });
  });
});