$(document).ready(function(){
  app();
});

function app(){
  var animSpeed = 800,
      animEasing = 'snap',
      fadeSpeed = 800,
      sidebar = 50,
      $imgs = $('.lazy');

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
  $('#frame-one').transition({x: $('#frame-one').width() - 100}, animSpeed, animEasing, function(){
    $('#frame-one-container').prepend('<div id="overlay-disable" class="overlay-disable"></div>');
  });
  $('#sidebar-secondary').transition({x: $('#frame-two').width()}, animSpeed, animEasing);
  $('#frame-two').transition({x: $('#frame-two').width()}, animSpeed, animEasing, function(){
    // This forces DOM redraw and calculates correct Document height/shows scrollbars
    $('h1').hide().show(0);
    triggerScroll();
  });
  $('#sidebar-primary').transition({x: $('#frame-one').width() - sidebar * 2}, animSpeed, animEasing);
  $('#frame-one, #frame-two').toggleClass('fixed');
  scrollToTop();
}

function secondaryFrameClose(){
  $('#frame-one').transition({x: 0}, animSpeed, animEasing);
  $('#frame-one #overlay-disable').remove();
  $('#frame-two').transition({x: 0}, animSpeed, animEasing);
  $('#sidebar-secondary').transition({x: $('#frame-two').width() * -1}, animSpeed, animEasing);
  $('#frame-one, #frame-two').toggleClass('fixed');
  $('#sidebar-primary').transition({x: 0}, animSpeed, animEasing);
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
  $('#frame-three').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing, function(){
    triggerScroll();
  });
  $('#frame-two, #frame-three').toggleClass('fixed');
  $('#sidebar-secondary').transition({x: $('#frame-three').width() * 2 - sidebar * 4}, animSpeed, animEasing);
  scrollToTop();
}

function tertiaryFrameClose(){
  $('#frame-three').transition({x: 0}, animSpeed, animEasing, function(){
    $('#frame-three').toggleClass('fixed');  
  });
  $('#sidebar-secondary').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing);
  $('#frame-two').toggleClass('fixed');
  scrollToTop();
}

// Sidebar class toggle
$('.sidebar').on('click', function(){
  $(this).toggleClass('active').not(this).remove('active');
});

//
// Frame one various functions
//

$('#frame-one-show-overlay').on('click', function(){
  $('#frame-one-overlay').toggleClass('hidden');
  $('#featured-project').toggleClass('blur');
});

//
// Frame two various functions
//

// Save the original top value when closing the overlays
assignDataValues($('#frame-two'), 'originalTop', $('#frame-two').css('top'));

// Open the About and Find overlays and set background content to fixed
$('#nav-about, #nav-finds').on('click', function(){
  positionFixedContent($('#frame-two'));
  $('#main-content, #nav-site-title').toggleClass('blur');
  scrollToTop();
});
$('#nav-about').on('click', function(){
  $('#about-overlay').toggleClass('hidden');
});
$('#nav-finds').on('click', function(){
  $('#finds-overlay').toggleClass('hidden');
});


//
// Helper functions
//

// Scroll to window top
function scrollToTop(){
  $(window).scrollTop(0);
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
    el.toggleClass('fixed');
    setTimeout(function(){
      $(window).scrollTop(Math.abs(posY - originalTop));
    }, 1);
  } else {
    el.css({top: posY});
    el.toggleClass('fixed');
  }
}

} // End App