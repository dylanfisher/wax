//
// Control the animations/transitions of the frame container
//

$(function(){
    var frames        = $('#frame-one, #frame-two, #frame-three'),
        frameOne      = $('#frame-one'),
        frameTwo      = $('#frame-two'),
        frameThree    = $('#frame-three'),
        nav           = $('#nav-issues, #nav-home, #nav-store'),
        logo          = $('.wax-logo'),
        container     = $('#frame-container'),
        winX          = $(window).width(),
        winY          = $(window).height(),
        frameOnePos   = '100%',
        frameTwoPos   = 0,
        frameThreePos = '-100%',
        containerTop  = container.offset().top,
        oneOffset     = containerTop - frameOne.offset().top,
        twoOffset     = containerTop - frameTwo.offset().top,
        threeOffset   = containerTop - frameThree.offset().top,
        navOffset     = 10,
        easing        = 'easeInOutQuad';

    // Scroll to top of page when WAX logo is clicked
    $('#nav-site-title').on('click', function(e){
      if(ExternalLayout === false){
        if($(this).hasClass('compact')){
          $('html, body').animate({scrollTop: 0});
        } else {
          $('#primary a').removeClass('active');
          setFrameTwoActive();
        }
        e.preventDefault();
      } else {
        if($(this).hasClass('compact')){
          $('html, body').animate({scrollTop: 0});
          e.preventDefault();
        } else {
          // Go to home page
        }
      }
    });

    $('#overlay-nav-site-title').on('click', function(e){
        e.preventDefault();
        if($(this).hasClass('compact')){
          $('#overlay-container').animate({scrollTop: 0});
        } else {
          closeOverlay();
        }
    });

    //
    // All frames
    //

    // Check to see if issues or store is active based on the pathname.
    // Also do our cookie check to see if visitor has been to the site
    // before, and if they have, skip the net art frame.
    var url = window.location.pathname;
    if(url.indexOf('issues') != -1){
        // FRAME ONE
        $('html').css('overflow-x', 'hidden');
        nav.find('a').removeClass('active');
        setFrameOneActive();
        $('html, body').animate({scrollTop: winY}, 100, 'linear');
    } else if(url.indexOf('features') != -1 || getCookie('WAX_passport') === "true"){
        // FRAME TWO
        $('html').css('overflow-x', 'hidden');
        nav.find('a').removeClass('active');
        setFrameTwoActive();
        $('html, body').animate({scrollTop: winY}, 100, 'linear');
    } else if(url.indexOf('store') != -1){
        // FRAME THREE
        $('html').css('overflow-x', 'hidden');
        nav.find('a').removeClass('active');
        setFrameThreeActive();
        $('html, body').animate({scrollTop: winY}, 100, 'linear');
    } else {
        frameTwo.data('active', true);
        container.data('activeFrame', 'two');
        $('#frame-one, #frame-three').addClass('visuallyhidden');
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        var end;
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;
        }
        else
        {
            begin += 2;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }

    nav.on('click', function(e){
        nav.find('a').removeClass('active');
    });

    // pushState
    window.addEventListener('popstate', function(event) {
        if(History.getCurrentIndex() !== 0){ // skip the first popstate event
          var path = window.location.pathname;
          if(path.indexOf('issues') != -1){
            setFrameOneActive(redraw);
          }
          if(path.indexOf('features') != -1){
            setFrameTwoActive(redraw);
          }
          if(path.indexOf('store') != -1){
            setFrameThreeActive(redraw);
          }
          if(path == sitePath){
            // Home
            setFrameTwoActive(redraw);
          }
        }
    }, false);

    //
    // Frame One
    //

    $(document).on('click', '#nav-issues, a[href="issues"]', function(e){
        if(ExternalLayout === false){
            setFrameOneActive(redraw);
            e.preventDefault();
        } else {
            window.location = sitePath + 'issues';
        }
    });

    function setFrameOneActive(redraw){
        $('#primary a').removeClass('active');
        $('#nav-issues a').addClass('active');
        $('#primary').removeClass('left center right').addClass('left');
        if(frameOne.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            frameOne.data('active', true);
            container.data('activeFrame', 'one');
            frameOne.removeClass('fixed');
            $('#frame-two, #frame-three').addClass('fixed');
            $('#tertiary').fadeOut();
            frames.transition({x: frameOnePos}, easing, function(){
                frameAnimationComplete();
                if(redraw){ // don't redraw if this is an initial page load
                    frameAnimationCompleteRedraw();
                }
            });
        }
    }

    //
    // Frame Two
    //

    $('#nav-home').on('click', function(e){
        if(ExternalLayout === false){
            setFrameTwoActive(redraw);
            e.preventDefault();
        } else {
            window.location = sitePath + 'features';
        }
    });

    function setFrameTwoActive(redraw){
        $('#nav-home a').addClass('active');
        $('#primary').removeClass('left center right').addClass('center');
        if(frameTwo.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            frameTwo.data('active', true);
            container.data('activeFrame', 'two');
            frameTwo.removeClass('fixed');
            $('#frame-one, #frame-three').addClass('fixed');
            frames.transition({x: frameTwoPos}, easing, function(){
                $('#tertiary').fadeIn();
                frameAnimationComplete();
                if(redraw){ // don't redraw if this is an initial page load
                    frameAnimationCompleteRedraw();
                }
            });
        }
    }

    //
    // Frame Three
    //

    $(document).on('click', '#nav-store, a[href="store"]', function(e){
        if(ExternalLayout === false){
            setFrameThreeActive(redraw);
            e.preventDefault();
        } else {
            window.location = sitePath + 'store';
        }
    });

    function setFrameThreeActive(redraw){
        $('#nav-store a').addClass('active');
        $('#primary').removeClass('left center right').addClass('right');
        if(frameThree.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            frameThree.data('active', true);
            container.data('activeFrame', 'three');
            frameThree.removeClass('fixed');
            $('#frame-one, #frame-two').addClass('fixed');
            $('#tertiary').fadeOut();
            frames.transition({x: frameThreePos}, easing, function(){
                frameAnimationComplete();
                if(redraw){ // don't redraw if this is an initial page load
                    frameAnimationCompleteRedraw();
                }
            });
        }
    }

    //
    // Helper functions
    //

    function activeFrameTransition(){
        frames.removeClass('visuallyhidden');
        logo.addClass('transition').removeClass('active');
        $('html').css({'overflow-x': 'hidden'});
        frames.data('active', false);
    }
    function frameAnimationComplete(){
        $('html').css({overflow: ''});
        logo.removeClass('transition');
        var currentFrame = $('#frame-container').data().activeFrame;
        if(currentFrame == 'one'){
            $('#frame-two, #frame-three').addClass('visuallyhidden');
        } else if(currentFrame == 'two') {
            $('#frame-one, #frame-three').addClass('visuallyhidden');
        } else {
            $('#frame-one, #frame-two').addClass('visuallyhidden');
        }

        if(window.location.hash.length){
            var jumpLinkPos = $(window.location.hash).offset().top;
            $('html, body').animate({scrollTop: jumpLinkPos}, 'fast', easing);
        }
    }
    function frameAnimationCompleteRedraw(){
        redraw();
        scrollToTop();
        $(window).trigger('scroll');
    }

    function scrollToTop(){
        $('html, body').animate({scrollTop: 0}, 'fast', easing);
        // This allows user input to cancel the scroll to top
        $viewport = $('html, body');
        $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
            if( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
                // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
                 $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
            }
        });
    }
});

function redraw(){
    // This forces DOM redraw, which calculates correct document height and shows proper scrollbars.
    // Also avoids some strange behavior with translate and fixed posiioned elements
    $('body').append('<div class="force-redraw"></div>');
    setTimeout(function(){
        $('.force-redraw').remove();
    }, 10);
}
