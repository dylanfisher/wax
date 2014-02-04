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
      navOffset           = 20;

  $('#frame-container').css({y: winY});

  // Scroll to top of page when WAX logo is clicked
  $('#nav-site-title').on('click', function(e){
    $('html, body').animate({scrollTop: $('#frame-featured').height() - Math.abs( $('#frame-featured').offset().top ) - navOffset});
    e.preventDefault();
  });

  // Move the featured frame and frame containers while scrolling down,
  // then fix the featured frame after scrolling past a certain point
  var fixedPoint = frameFeatured.height() - navOffset,
      featureOpen = true;
  $(window).scroll(function() {
    if(featureOpen === true){
      if( $(window).scrollTop() >= fixedPoint){
        featureOpen = false;
        frameFeatured.addClass('featured-fix').css({y: -winY + navOffset});
        frameContainer.css({y: navOffset});
        $('html, body').scrollTop(0);
        redraw();
      }
    }
  });

  // Clicking on the featured frame when it is fixed opens it back up
  // and  pushes the container frame back down
  $('body').on('click','.featured-fix', function(){
    featureOpen = true;
    frameFeatured.transition({y: 0}, function(){
      frameFeatured.removeClass('featured-fix');
      redraw();
    });
    frameContainer.transition({y: winY});
  });

  // If a frame is shorter than the window height, set it to equal the window height
  $('#frame-container .frame').each(function(){
    if($(this).height() < winY){
      $(this).css({minHeight: winY});
    }
  });

  // Responsive WAX logo
  $(window).scroll(function(){
    var st     = $(this).scrollTop() - winY,
        sl     = $(this).scrollLeft() - winX,
        ratioY,
        ratioX,
        posY,
        posX;
    // When the featured frame is active, scrolling begins at navOffset instead of winY
    if(frameFeatured.hasClass('featured-fix')){
      st = $(this).scrollTop() - navOffset;
    }
    // Recalculate the store height to account for the ajaxed content
    $('#nav-store').one('click', function(){
      frameThreeHeight = frameThree.height() - winY;
    });
    if(frameOne.data('active') === true){
      ratioY = st / frameOneHeight * 100;
    } else if (frameTwo.data('active') === true){
      ratioY = st / frameTwoHeight * 100;
    } else {
      ratioY = st / frameThreeHeight * 100;
    }
    posY     = Math.max( 0, ratioY );
    if(posY >= 100){
      posY = 100;
    }
    $('#wax2').css({marginTop  : posY / 2 + '%'});
    $('#wax2').css({marginLeft : posX / 2 + '%'});
    $('#wax3').css({marginTop  : posY     + '%'});
    $('#wax3').css({marginLeft : posX / 2 + '%'});
  });
});