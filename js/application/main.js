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
  primaryFrameOpen();
});

$('#frame-one').on('click', '#overlay-disable', function(){
  primaryFrameClose();
});

function primaryFrameOpen(){
  $('#frame-one').transition({x: $('#frame-one').width() - 100}, animSpeed, animEasing, function(){
    $('#frame-one-container').prepend('<div id="overlay-disable" class="overlay-disable"></div>');
  });
  $('#frame-two').transition({x: $('#frame-two').width()}, animSpeed, animEasing, function(){
    $(this).add('#sidebar-secondary').toggleClass('frame-active');
    // This forces DOM redraw and calculates correct Document height/shows scrollbars
    $('h1').hide().show(0);
  });
  $('#sidebar-primary').transition({x: $('#frame-one').width() - sidebar * 2}, animSpeed, animEasing);
}

function primaryFrameClose(){
  $('#frame-one').transition({x: 0}, animSpeed, animEasing);
  $('#frame-one #overlay-disable').remove();
  $('#frame-two').transition({x: 0}, animSpeed, animEasing);
  $('#frame-two, #sidebar-secondary').toggleClass('frame-active');
  $('#sidebar-primary').transition({x: 0}, animSpeed, animEasing);
}

// Frame two
// Left magazine sidebar animation
$('#sidebar-secondary').on('click', function(){
  if($(this).hasClass('active')){
    secondaryFrameClose();
  } else {
    secondaryFrameOpen();
  }
});

function secondaryFrameOpen(){
  $('#sub-content-left').transition({x: $('#sub-content-left').width() - sidebar}, animSpeed, animEasing);
  $('#sidebar-secondary').transition({x: $('#sub-content-left').width()}, animSpeed, animEasing);
  $('.main-content').toggleClass('fixed');
}

function secondaryFrameClose(){
  $('#sub-content-left').transition({x: 0}, animSpeed, animEasing);
  $('#sidebar-secondary').transition({x: 0}, animSpeed, animEasing);
  $('.main-content').toggleClass('fixed');
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