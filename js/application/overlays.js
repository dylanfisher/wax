//
// Toggle hiding and showing of overlays, and blurring of background
//

var CurrentOverlay;

$(function(){
  var featuredProjectOpen = false,
      aboutOpen           = false,
      findsOpen           = false,
      mainContentBlur     = $('#main-content, #nav-site-title');

    // Save the original top value when closing the overlays
    assignDataValues($('#frame-two'), 'originalTop', $('#frame-two').css('top'));

    // Close the overlay when the X is clicked
    $(document).on('click', '.overlay-close', function(){
      closeOverlay();
    });

    // Close the overlay when escape key is pressed
    $(document).keydown(function(e) {
      if(overlayLoaded === true || secondaryOverlayLoaded === true) {
        if (e.keyCode == 27) {
          e.preventDefault();
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
      // $('#featured-project').fadeOut();
      $('#overlay-close').addClass('featured-overlay-close');
    });
});

// Get the original values of elements before we change them
function assignDataValues(el, key, value){
  el.data(key, value);
}

function showOverlay(el){
  var container      = $('#overlay-container');
  var content        = $('#overlay-content');

  var containerTwo      = $('#overlay-container-two');
  var contentTwo        = $('#overlay-content-two');

  var frameContainer = $('#frame-container');

  if(overlayLoaded === true && secondaryOverlayLoaded === false){
    // Secondary overlay pushes up the first

    CurrentOverlay = containerTwo;

    // scrollPos = $(window).scrollTop();
    // frameContainer.css({top: $(window).scrollTop() * -1});
    containerTwo.addClass('active');
    // frameContainer.addClass('overlay-active');

    // Slide the first overlay up and out of view
    container.transition({top: '-100%'}, 400, 'easeInOutQuad', function(){
      secondaryOverlayLoaded = true;
      container.css({top: '100%'});
      content.html('');
    });

    containerTwo.find('.overlay-footer').hide();

    // Slide the second overlay into view
    containerTwo.transition({top: '0%'}, 400, 'easeInOutQuad', function(){
      overlayLoaded = false;
    });

    containerTwo.css({overflow: 'auto'});
    containerTwo.scrollTop(0);
    showLoader(containerTwo);

  } else {
    // First overlay

    CurrentOverlay = container;

    if(secondaryOverlayLoaded === true){
      secondaryOverlayLoaded = false;

      container.find('.overlay-footer').hide();

      containerTwo.transition({top: '-100%'}, 400, 'easeInOutQuad', function(){
        overlayLoaded = true;
        containerTwo.css({top: '100%'});
        contentTwo.html('');
      });
    } else {
      scrollPos = $(window).scrollTop();
      frameContainer.css({top: $(window).scrollTop() * -1});
      container.addClass('active');
      frameContainer.addClass('overlay-active');
    }

    if(el === undefined){
      container.transition({top: '0%'}, 400, 'easeInOutQuad', function(){
        overlayLoaded = true;
      });
    } else if(el.hasClass('overlay-padding')){
      container.addClass('overlay-padding');
      container.transition({top: '10%'}, 400, 'easeInOutQuad', function(){
        overlayLoaded = true;
      });
    } else {
      container.transition({top: '0%'}, 400, 'easeInOutQuad', function(){
        overlayLoaded = true;
      });
    }

    container.css({overflow: 'auto'});
    container.scrollTop(0);
    showLoader(container);
  }
}

function closeOverlay(){
  var container      = $('.overlay-container');
  var content        = $('.overlay-content');
  var frameContainer = $('#frame-container');
  $('#frame-container, #frame-featured').removeClass('overlay-active');
  container.transition({top: '100%'}, 400, 'easeInOutQuad', function(){
    content.html('');
    container.removeClass('active overlay-padding');
    $('.overlay-container').css({backgroundColor: ''});
    overlayLoaded = false;
    secondaryOverlayLoaded = false;
  });
  container.css({overflow: 'hidden'});
  frameContainer.css({top: 0});
  $(window).scrollTop(scrollPos);
  History.pushState(null, null, siteUrl);
  $('#featured-project').fadeIn();
  if($('.overlay-container .overlay-footer').length){
    $('.overlay-container .overlay-footer').hide();
  }

}