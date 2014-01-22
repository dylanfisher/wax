$(document).ready(function(){
  app();
});

function app(){
  var animSpeed = 800,
      animEasing = 'snap',
      fadeSpeed = 800,
      sidebar = 50,
      $imgs = $('.lazy'),
      featuredProjectOpen = false,
      aboutOpen = false,
      findsOpen = false,
      mainContentBlur = $('#main-content, #nav-site-title');

// Lazy load images
$('.lazy').lazyload({
  threshold : 400,
  skip_invisible : false,
  // Set failure limit to be the number of lazy images in the DOM (since images are non sequential)
  failure_limit: Math.max($imgs.length - 1, 0)
});

//
// Sidebar logic and content pane animations
//

// Frame one
// Main sidebar animation in front page view
$('#sidebar-primary').on('click', function(){
  secondaryFrameOpen();
});

$('#frame-one').on('click', '#overlay-disable', function(){
  secondaryFrameClose();
});

function secondaryFrameOpen(){
  // Close frame one
  $('#frame-one').transition({x: $('#frame-one').width() - 100}, animSpeed, animEasing, function(){
    $('#frame-one-container').prepend('<div id="overlay-disable" class="overlay-disable"></div>');
  }).addClass('fixed');
  $('#sidebar-primary').transition({x: $('#frame-one').width() - sidebar * 2}, animSpeed, animEasing);
  // Open frame two
  $('#frame-two').transition({x: $('#frame-two').width()}, animSpeed, animEasing, function(){
    // This forces DOM redraw and calculates correct Document height/shows scrollbars
    $('h1').hide().show(0);
    triggerScroll();
  }).removeClass('fixed').css({top: 0});
  $('#sidebar-secondary').transition({x: $('#frame-two').width()}, animSpeed, animEasing);
  hideAllOverlays();
  scrollToTop();
}

function secondaryFrameClose(){
  // Open frame one
  $('#frame-one').transition({x: 0}, animSpeed, animEasing).removeClass('fixed');
  $('#sidebar-primary').transition({x: 0}, animSpeed, animEasing);
  $('#frame-one #overlay-disable').remove();
  // Close frame two
  $('#frame-two').transition({x: 0}, animSpeed, animEasing).addClass('fixed');
  $('#sidebar-secondary').transition({x: $('#frame-two').width() * -1}, animSpeed, animEasing);
  hideAllOverlays();
  scrollToTop();
}

// Frame two
// Left magazine sidebar animation
$('#sidebar-secondary').on('click', function(){
  if($(this).hasClass('active')){
    tertiaryFrameClose();
  } else {
    tertiaryFrameOpen();
  }
});

function tertiaryFrameOpen(){
  // Open frame three
  $('#frame-three').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing, function(){
    triggerScroll();
  }).removeClass('fixed');
  $('#sidebar-secondary').transition({x: $('#frame-three').width() * 2 - sidebar * 4}, animSpeed, animEasing);
  $('#frame-two').addClass('fixed');
  hideAllOverlays();
  scrollToTop();
}

function tertiaryFrameClose(){
  // Close frame three
  $('#frame-three').transition({x: 0}, animSpeed, animEasing, function(){
    $('#frame-three').addClass('fixed');  
  });
  $('#sidebar-secondary').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing);
  $('#frame-two').removeClass('fixed').css({top: 0});
  hideAllOverlays();
  scrollToTop();
}

// Sidebar class toggle
$('.sidebar').on('click', function(){
  $(this).toggleClass('active').not(this).remove('active');
});

//
// Toggle hiding and showing of overlays, and blurring of background
//

// Save the original top value when closing the overlays
assignDataValues($('#frame-two'), 'originalTop', $('#frame-two').css('top'));

$('#frame-one-show-overlay').on('click', function(){
  if(featuredProjectOpen === false){
    featuredProjectOpen = true;
    showOverlays($('#frame-one-overlay'), $('#featured-project'));
  } else {
    featuredProjectOpen = false;
    hideOverlays($('#frame-one-overlay'), $('#featured-project'));
  }
});

$('#nav-about').on('click', function(){
  if(findsOpen === true){
    hideOverlays($('#finds-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
    findsOpen = false;
  }
  if(aboutOpen === false){
    aboutOpen = true;
    showOverlays($('#about-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
  } else {
    aboutOpen = false;
    hideOverlays($('#about-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
  }
});

$('#nav-finds').on('click', function(){
  if(aboutOpen === true){
    hideOverlays($('#about-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
    aboutOpen = false;
  }
  if(findsOpen === false){
    findsOpen = true;
    showOverlays($('#finds-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
  } else {
    findsOpen = false;
    hideOverlays($('#finds-overlay'), mainContentBlur);
    positionFixedContent($('#frame-two'));
  }
});

function showOverlays(overlayEl, blurEl){
  $(overlayEl).removeClass('hidden');
  $(blurEl).addClass('blur');
}

function hideOverlays(overlayEl, blurEl){
  $(overlayEl).addClass('hidden');
  $(blurEl).removeClass('blur');
}

function hideAllOverlays(){
  hideOverlays($('#finds-overlay, #about-overlay'), mainContentBlur);
  aboutOpen = false;
  findsOpen = false;
}

//
// Helper functions
//

// Scroll to window top
function scrollToTop(){
  $('html, body').scrollTop(0);
}

// Trigger scroll event (for loading lazy images)
function triggerScroll(){
  $(window).trigger('scroll');
}

// Get the original values of elements before we change them
function assignDataValues(el, key, value){
  el.data(key, value);
}

// This sets the vertical position of content when toggling between absolute and fixed positioning
function positionFixedContent(el){
  var offset = el.offset();
  var posY = offset.top - $(window).scrollTop();
  var originalTop = parseInt(el.data('originalTop'));
  if(el.hasClass('fixed')){
    el.css({top: originalTop});
    el.removeClass('fixed');
    setTimeout(function(){
      $('html, body').scrollTop(Math.abs(posY - originalTop));
    }, 1);
  } else {
    el.css({top: posY});
    el.addClass('fixed');
    scrollToTop();
  }
}

} // End App