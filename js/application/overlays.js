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

    $('#frame-featured-show-overlay').on('click', function(){
      if(featuredProjectOpen === false){
        featuredProjectOpen = true;
        showOverlays($('#frame-featured-overlay'), $('#featured-project'));
      } else {
        featuredProjectOpen = false;
        hideOverlays($('#frame-featured-overlay'), $('#featured-project'));
      }
    });

    $('#nav-about').on('click', function(){
      if(findsOpen === true){
        hideOverlays($('#finds-overlay'), mainContentBlur);
        findsOpen = false;
      }
      if(aboutOpen === false){
        aboutOpen = true;
        showOverlays($('#about-overlay'), mainContentBlur);
      } else {
        aboutOpen = false;
        hideOverlays($('#about-overlay'), mainContentBlur);
      }
    });

    $('#nav-finds').on('click', function(){
      if(aboutOpen === true){
        hideOverlays($('#about-overlay'), mainContentBlur);
        aboutOpen = false;
      }
      if(findsOpen === false){
        findsOpen = true;
        showOverlays($('#finds-overlay'), mainContentBlur);
      } else {
        findsOpen = false;
        hideOverlays($('#finds-overlay'), mainContentBlur);
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

    // Get the original values of elements before we change them
    function assignDataValues(el, key, value){
      el.data(key, value);
    }
});