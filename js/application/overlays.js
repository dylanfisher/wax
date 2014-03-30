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
      console.log(newProjUrl);
      $('#featured-project iframe').attr('src', newProjUrl);
      closeOverlay();
    });

    // Add class to featured frame
    $('#frame-featured-show-overlay a').click(function(){
      $('#frame-featured').addClass('overlay-active');
    });
});

// Get the original values of elements before we change them
function assignDataValues(el, key, value){
  el.data(key, value);
}

function showOverlay(){
  $('#overlay-container').addClass('active');
  $('#frame-container').addClass('overlay-active');
}

function closeOverlay(){
  $('#overlay-container').removeClass('active');
  $('#frame-container, #frame-featured').removeClass('overlay-active');
  $('#overlay-content').html('');
  $(window).scrollTop(scrollPos);
  console.log(scrollPos);
  overlayLoaded = false;
  History.pushState(null, null, siteUrl);
}