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

  $('#frame-container').css({y: winY});

  // Move the featured frame and frame containers while scrolling down,
  // then fix the featured frame after scrolling past a certain point
  var fixedPoint = frameFeatured.height() - navOffset,
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

  // Clicking on the featured frame when it is fixed opens it back up
  // and  pushes the container frame back down
  $('body').on('click','.featured-fix, .featured-project-overlay', function(){
    featureOpen = true;
    frameFeatured.removeClass('show-more').addClass('feature-open');
    $('#fixed-nav, #nav-site-title').removeClass('show-more');
    frameFeatured.transition({y: 0}, function(){
      frameFeatured.removeClass('featured-fix');
      redraw();
    });
    frameContainer.transition({y: winY});
    $('html, body').scrollTop(0);
    $('.featured-project-overlay').hide();
    $('#featured-project iframe').attr('src', $('#featured-project').attr('data-url'));
    console.log($('#featured-project').attr('data-url'));
    $('#featured-project > iframe').fadeIn(animSpeed);
    // $('html, body').animate({scrollTop: 0}, function(){
    //   featureOpen = true;
    //   frameFeatured.transition({y: 0}, function(){
    //     frameFeatured.removeClass('featured-fix');
    //     redraw();
    //   });
    //   frameContainer.transition({y: winY});
    // });
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
    if ( ! $('#frame-container.overlay-active').length ){
      var st = $(this).scrollTop();
      if (st > lastScrollTop && st > 0){
         // Down scroll
         $('#frame-featured').removeClass('fixed show-more');
         $('#fixed-nav, #nav-site-title').removeClass('show-more');
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
              if ($('#frame-container').data('activeFrame') == 'two'){
                $('#tertiary').fadeOut();
              }
          }
         }
      } else {
         // Up scroll
         if (st <= compactPoint){
            $('#fixed-nav, #nav-site-title').removeClass('compact');
            // Featured project frame gets a little bigger here and fixed nav moves down
            $('#frame-featured').addClass('show-more');
            $('#fixed-nav, #nav-site-title').addClass('show-more');
            if ($('#frame-container').data('activeFrame') == 'two'){
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

  $('#nav-email a').click(function(e){
    e.preventDefault();
    $('#mailing-list-form').stop().slideToggle(400, transitEase);
  });

  //
  // UI interactions
  //

  // Accordion
  $('.accordion-head').click(function(e){
    e.preventDefault();
    var container = $(this).parent().nextAll('.accordion-container').first();
    var content = container.find($('.accordion-content'));
    var contentHeight = content.outerHeight(true);
    if($(this).data('accordionOpen') !== true){
      $(this).data('accordionOpen', true);
      container.transition({height: contentHeight, opacity: 1}, 600, 'easeOutQuart');
    } else {
      $(this).data('accordionOpen', false);
      container.transition({height: 0, opacity: 0}, 600, 'easeOutQuart');
    }
  });
});