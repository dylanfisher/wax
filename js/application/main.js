$(document).ready(function(){
  app();
});

function app(){
  var animSpeed = 800,
      animEasing = 'snap',
      fadeSpeed = 800,
      sidebar = 50;

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
  $('#frame-two').transition({x: $('#frame-two').width()}, animSpeed, animEasing, function(){
    $('#frame-one, #frame-two').toggleClass('fixed');
    // This forces DOM redraw and calculates correct Document height/shows scrollbars
    $('h1').hide().show(0);
    scrollToTop();
  });
  $('#sidebar-primary').transition({x: $('#frame-one').width() - sidebar * 2}, animSpeed, animEasing);
}

function secondaryFrameClose(){
  $('#frame-one').transition({x: 0}, animSpeed, animEasing);
  $('#frame-one #overlay-disable').remove();
  $('#frame-two').transition({x: 0}, animSpeed, animEasing);
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
  $('#frame-three').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing);
  $('#frame-two, #frame-three').toggleClass('fixed');
  $('#sidebar-secondary').transition({x: $('#frame-three').width() - sidebar * 2}, animSpeed, animEasing);
  scrollToTop();
}

function tertiaryFrameClose(){
  $('#frame-three').transition({x: 0}, animSpeed, animEasing);
  $('#frame-two, #frame-three').toggleClass('fixed');
  $('#sidebar-secondary').transition({x: 0}, animSpeed, animEasing);
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

assignDataValues($('#frame-two'), 'originalTop', $('#frame-two').css('top'));

$('#nav-about').on('click', function(){
  positionFixedContent($('#frame-two'));
  $('#about-overlay').toggleClass('hidden');
  $('#main-content, #nav-site-title').toggleClass('blur');
  scrollToTop();
});

//
// Helper functions
//

// Scroll to window top
function scrollToTop(){
  $(window).scrollTop(0);
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

//
// Testing AJAX calls
//

$('#test').on('click', function(){
  loader($(this));
  getData.api('get_page/?id=2', function(data){
    data = data.page;
    $('#ajax-here').html(
      'this post title = ' + data.title +
      '<br/>and CONTENT = ' + data.content +
      '<br/>and a DATE = ' + data.date);
  });
});

var getData = function(){
  var apiUrl = '/wax/api/',
  api = function(method, callback){
    $.getJSON(apiUrl + method, function(data) {
      callback(data);
      $('.loading').remove();
    });
  };
  return {
    api: api
  };
} ();

// AJAX loader
var loader = function(el){
  var animation = '<div class="loading">loading...</div>';
  el.append(animation);
};

} // End App