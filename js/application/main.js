$(document).ready(function(){
  var docY                = $(document).height(),
      docX                = $(document).width(),
      winY                = $(window).height(),
      winX                = $(window).width(),
      docHeight           = docY - winY,
      docWidth            = docX - winX,
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
      featuredProjectOpen = false,
      aboutOpen           = false,
      findsOpen           = false,
      mainContentBlur     = $('#main-content, #nav-site-title'),
      navOffset           = 20;

  // Scroll snap config
  // $(document).scrollsnap({
  //   snaps       : 'body',
  //   proximity   : winY / 3,
  //   offset      : -20
  // });

  $('#frame-container').css({y: winY});

  // Scroll to top of page when WAX logo is clicked
  $('#nav-site-title').on('click', function(e){
    $('html, body').animate({scrollTop: winY - navOffset});
    e.preventDefault();
  });

  // Responsive WAX logo
  $(window).scroll(function(){
    var st     = $(this).scrollTop() - winY,
        sl     = $(this).scrollLeft() - winX,
        ratioY = st / docHeight * 100,
        ratioX = sl / docWidth * 100,
        posY   = Math.max( 0, ratioY ),
        posX   = Math.max( 0, parseInt(ratioX) );
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
    posY   = Math.max( 0, ratioY );
    if(posY >= 100){
      posY = 100;
    }
    $('#wax2').css({marginTop  : posY / 2 + '%'});
    $('#wax2').css({marginLeft : posX / 2 + '%'});
    $('#wax3').css({marginTop  : posY     + '%'});
    $('#wax3').css({marginLeft : posX / 2 + '%'});
  });

  // If a frame is shorter than the window height, set it to equal the window height
  $('#frame-container .frame').each(function(){
    if($(this).height() < winY){
      $(this).css({minHeight: winY});
    }
  });
});

// This sets the vertical position of content when toggling between absolute and fixed positioning
function positionFixedContent(el){
  var offset = el.offset();
  var posY = offset.top - $(window).scrollTop();
  var originalTop = parseInt(el.data('originalTop'));
  if(el.hasClass('fixed')){
    el.css({top: originalTop});
    el.removeClass('fixed');
    setTimeout(function(){
      $('html, body').scrollTop(Math.abs(posY - originalTop));
    }, 1);
  } else {
    el.css({top: posY});
    el.addClass('fixed');
    scrollToTop();
  }
}
