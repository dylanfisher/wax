//
// Toggle hiding and showing of overlays, and blurring of background
//

$(function(){
  var featuredProjectOpen = false,
      aboutOpen           = false,
      findsOpen           = false,
      mainContentBlur     = $('#main-content, #nav-site-title');

    // Save the original top value when closing the overlays
    assignDataValues($('#frame-two'), 'originalTop', $('#frame-two').css('top'));

    // Close the overlay when the X is clicked
    $(document).on('click', '#overlay-close', function(){
      closeOverlay();
    });

    // Close the overlay when escape key is pressed
    $(document).keydown(function(e) {
      if(overlayLoaded === true) {
        if (e.keyCode == 27) {
          closeOverlay();
        }
      }
    });

    // Featured project archive toggle active projects
    $(document).on('click', '.project-toggle', function(e){
      e.preventDefault();
      var newProjUrl = $(this).closest('li').data('source');
      $('#featured-project').attr('data-url', newProjUrl);
      $('#featured-project iframe').attr('src', newProjUrl);
      closeOverlay();
    });

    // Add class to featured frame
    $('#frame-featured-show-overlay a').click(function(){
      $('#frame-featured').addClass('overlay-active');
      $('#featured-project').fadeOut();
      $('#overlay-close').addClass('featured-overlay-close');
    });
});

// Get the original values of elements before we change them
function assignDataValues(el, key, value){
  el.data(key, value);
}

function showOverlay(){
  var container      = $('#overlay-container');
  var content        = $('#overlay-content');
  var frameContainer = $('#frame-container');
  scrollPos = $(window).scrollTop();
  frameContainer.css({top: $(window).scrollTop() * -1});
  container.addClass('active');
  frameContainer.addClass('overlay-active');
  container.transition({top: '0%'}, 400, 'easeInOutQuad');
  container.css({overflow: 'auto'});
  container.scrollTop(0);
  showLoader(container);
}

function closeOverlay(){
  var container      = $('#overlay-container');
  var content        = $('#overlay-content');
  var frameContainer = $('#frame-container');
  $('#frame-container, #frame-featured').removeClass('overlay-active');
  container.transition({top: '100%'}, 400, 'easeInOutQuad', function(){
    content.html('');
    container.removeClass('active');
    overlayLoaded = false;
  });
  container.css({overflow: 'hidden'});
  frameContainer.css({top: 0});
  $(window).scrollTop(scrollPos);
  History.pushState(null, null, siteUrl);
  $('#featured-project').fadeIn();

  if(ExternalLayout === true){
    // TODO: update this to go to the post you landed on
    window.location = sitePath;
  }
}