var sitePath      = '/wax/';
if (document.location.hostname == 'localhost'){
  sitePath = '/wax/';
} else {
  sitePath = '/dev/';
}

var PrimaryNavHeight = $('#primary').height() + ($('#fixed-nav').position().top * 2);

var ExternalLayout;
if($('.external-layout').length){
  ExternalLayout = true;
} else {
  ExternalLayout = false;
}

$(document).ready(function(){
  var docY                = $(document).height(),
      docX                = $(document).width(),
      winY                = $(window).height(),
      winX                = $(window).width(),
      docHeight           = docY - winY,
      docWidth            = docX - winX,
      frameFeatured       = $('#frame-featured'),
      frameContainer      = $('#frame-container'),
      frameOne            = $('#frame-one'),
      frameTwo            = $('#frame-two'),
      frameThree          = $('#frame-three'),
      frameOneHeight      = frameOne.height() - winY,
      frameTwoHeight      = frameTwo.height() - winY,
      frameThreeHeight    = frameThree.height() - winY,
      animSpeed           = 800,
      animEasing          = 'snap',
      fadeSpeed           = 800,
      sidebar             = 50,
      navOffset           = 10,
      transitEase         = 'easeInOutQuad';

  $(window).resize(function(){
    docY                = $(document).height();
    docX                = $(document).width();
    winY                = $(window).height();
    winX                = $(window).width();
    docHeight           = docY - winY;
    docWidth            = docX - winX;
    frameFeatured       = $('#frame-featured');
    frameContainer      = $('#frame-container');
    frameOne            = $('#frame-one');
    frameTwo            = $('#frame-two');
    frameThree          = $('#frame-three');
    frameOneHeight      = frameOne.height() - winY;
    frameTwoHeight      = frameTwo.height() - winY;
    frameThreeHeight    = frameThree.height() - winY;
    animSpeed           = 800;
    animEasing          = 'snap';
    fadeSpeed           = 800;
    sidebar             = 50;
    navOffset           = 10;
    transitEase         = 'easeInOutQuad';

    $('#frame-container').css({y: winY});

    fixedPoint = frameFeatured.height() - navOffset;

    if(featureOpen === false){
        frameFeatured.addClass('featured-fix').css({y: -winY + navOffset});
        $('.featured-project-overlay').show();
        $('#featured-project > iframe').fadeOut(animSpeed, function(){
          $('#featured-project iframe').attr('src', '');
        });
        frameContainer.css({y: navOffset});
        $('html, body').scrollTop(0);
        redraw();
    }
  });

  $('#frame-container').css({y: winY});

  // Move the featured frame and frame containers while scrolling down,
  // then fix the featured frame after scrolling past a certain point
  fixedPoint = frameFeatured.height() - navOffset;
      featureOpen = true;
  $(window).scroll(function() {
    if(featureOpen === true){
      if( $(window).scrollTop() >= fixedPoint){
        featureOpen = false;
        frameFeatured.addClass('featured-fix').css({y: -winY + navOffset});
        $('.featured-project-overlay').show();
        $('#featured-project > iframe').fadeOut(animSpeed, function(){
          $('#featured-project iframe').attr('src', '');
        });
        frameContainer.css({y: navOffset});
        $('html, body').scrollTop(0);
        redraw();
      }
    }
  });

  // Set featured frame to temperature background color
  // $('#frame-featured').css({background: $('html').attr('data-temp')});

  // Fade the iframe in on page load
  // showLoader($('#featured-project'));
  // $('#featured-project iframe').load(function(){
  //   $('#featured-project iframe').show();
  //   $('#featured-project .loading').remove();
  // });

  // Fade out the featured down arrow after a short delay
  var logoDelay = window.setTimeout(function(){
    $('.featured-project-arrow').removeClass('active');
  }, 5000);

  // Show the arrow when you hover over the bottom portion
  $('.featured-project-wax-logo, .featured-project-arrow').hover(function(){
    $('.featured-project-arrow').addClass('active');
    clearTimeout(logoDelay);
  }, function(){
    $('.featured-project-arrow').removeClass('active');
  });

  // Scroll down when you click the bottom portion
  $('.featured-project-wax-logo, .featured-project-arrow').click(function(){
    var featuredHeight = $('#frame-featured').height();
    $('html, body').animate({scrollTop: featuredHeight}, 'fast', transitEase, function(){
      $('html, body').scrollTop(0);
    });
  });

  // Clicking on the featured frame when it is fixed opens it back up
  // and  pushes the container frame back down
  $('body').on('click','.featured-fix, .featured-project-overlay', function(){
    featureOpen = true;
    $('#fixed-nav, #nav-site-title').removeClass('show-more');
    frameFeatured.removeClass('featured-fix fixed');
    frameFeatured.transition({y: 0}, function(){
      redraw();
    });
    frameContainer.transition({y: winY});
    $('html, body').scrollTop(0);
    $('.featured-project-overlay').hide();
    $('#featured-project iframe').attr('src', $('#featured-project').attr('data-url'));
    $('#featured-project > iframe').fadeIn(animSpeed);
  });

  $('#frame-featured').hover(function(){
    if( ! $(this).hasClass('show-more') && featureOpen === false){
      $('#fixed-nav, #nav-site-title').addClass('show-more');
    }
  }, function(){
    if( ! $(this).hasClass('show-more') && featureOpen === false){
      $('#fixed-nav, #nav-site-title').removeClass('show-more');
    }
  });


  // If a frame is shorter than the window height, set it to equal the window height
  $('#frame-container .frame').each(function(){
    if($(this).height() < winY){
      $(this).css({minHeight: winY});
    }
  });

  var lastScrollTop = 0;
  var compactPoint = 40;
  $(window).scroll(function(event){
    // When overlay is NOT active
    if ( ! $('#frame-container.overlay-active').length ){
      var st = $(this).scrollTop();
      if (st > lastScrollTop && st > 0){
         // Down scroll
         if ($('#frame-featured.featured-fix').length){
           $('#frame-featured').addClass('not-fixed');
         }
         // External layout pages
         if(ExternalLayout === true){
           if (st > compactPoint){
              $('#fixed-nav, #nav-site-title').addClass('compact');
           }
         } else {
          if (st > compactPoint && $('#frame-featured.featured-fix').length){
              $('#fixed-nav, #nav-site-title').addClass('compact');
              if ($('#frame-container').data('activeFrame') == 'two' && ExternalLayout === false){
                $('#tertiary').fadeOut();
              }
          }
         }
      } else {
         // Up scroll
         if (st <= compactPoint){
            $('#fixed-nav, #nav-site-title').removeClass('compact');
            // Featured project frame gets a little bigger here and fixed nav moves down
            if ($('#frame-container').data('activeFrame') == 'two' && ExternalLayout === false){
              $('#tertiary').fadeIn();
            }
         }
         if ($('#frame-featured.featured-fix').length){
           $('#frame-featured').addClass('fixed').removeClass('not-fixed');
         } else {
           $('#frame-featured').removeClass('fixed');
         }
      }
      lastScrollTop = st;
    }
  });

  // When overlay IS active
  // var overlayLastScrollTop = 0;
  // $('#overlay-container').scroll(function(){
  //   var ost = $(this).scrollTop();
  //   if (ost > overlayLastScrollTop && ost > 0 && ost > compactPoint){
  //     // Down scroll
  //     $('#overlay-nav-site-title').addClass('compact');
  //   } else if (ost <= compactPoint){
  //     // Up scroll
  //     $('#overlay-nav-site-title').removeClass('compact');
  //   }
  //   overlayLastScrollTop = ost;
  // });

  $('#nav-email a').click(function(e){
    e.preventDefault();
    $('#mailing-list-form').stop().slideToggle(400, transitEase);
  });

  // Close the mailing list form when clicking outside of the box
  $('html').click(function(e){
    if($(e.target).closest('#mailing-list-form, #nav-email').length === 0){
      $('#mailing-list-form').stop().slideUp(400, transitEase);
    }
  });

  // Submit form when button is clicked
  $(document).on('click', '.email-button', function(){
    $(this).closest('form').submit();
    $('#mailing-list-form').stop().slideUp(400, transitEase);
  });

  //
  // UI interactions
  //

  // Accordion
  $('.accordion-head').click(function(e){
    e.preventDefault();
    var container = $(this).closest('.issue-head').nextAll('.accordion-container').first();
    var content = container.find($('.accordion-content'));
    var contentHeight = content.outerHeight(true);
    if($(this).data('accordionOpen') !== true){
      $(this).addClass('active').data('accordionOpen', true);
      container.stop().transition({height: contentHeight, opacity: 1}, 600, 'easeOutQuart');
    } else {
      $(this).removeClass('active').data('accordionOpen', false);
      container.stop().transition({height: 0, opacity: 0}, 600, 'easeOutQuart');
    }
  });

});


//
// Featured content
//

SetCaptionWidths();
SetVideoModuleHeights();

$(window).resize(function(){
  if($('.image-module .image-wrapper').length){
    SetCaptionWidths();
  }
  if($('.video-module iframe').length){
    SetVideoModuleHeights();
  }
});

function SetCaptionWidths(){
  $('.image-module .image-wrapper').each(function(){
    var that = this;
    $(that).imagesLoaded(function(){
      var image = $(that).find('img');
      var caption = $(that).find('.caption');
      var width = image.width();
      caption.css({width: width});
    });
  });
}

function SetVideoModuleHeights(){
  // Set correct ratio for video module iframes
  $('.video-module iframe').each(function(){
    var width = $(this).attr('width');
    var actualWidth = $(this).width();
    var height = $(this).attr('height');
    var ratio = width / height;
    var newHeight = actualWidth / ratio;
    $(this).css('height', newHeight);
  });
}
