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

    //
    // All frames
    //

    // Check to see if issues or store is active based on the pathname
    var url = window.location.pathname;
    if(url.indexOf('issues') != -1){
        $('html').css('overflow-x', 'hidden');
        setFrameOneActive();
        $('html, body').animate({scrollTop: winY}, 100, 'linear');
    } else if(url.indexOf('store') != -1){
        $('html').css('overflow-x', 'hidden');
        setFrameThreeActive();
        $('html, body').animate({scrollTop: winY}, 100, 'linear');
    } else {
        frameTwo.data('active', true);
        container.data('activeFrame', 'two');
    }

    nav.on('click', function(e){
        e.preventDefault();
    });

    // pushState
    window.addEventListener('popstate', function(event) {
        if(History.getCurrentIndex() !== 0){ // skip the first popstate event
          var path = window.location.pathname;
          if(path.indexOf('issues') != -1){
            setFrameOneActive(redraw);
          }
          if(path == sitePath){ // Home
            setFrameTwoActive(redraw);
          }
          if(path.indexOf('store') != -1){
            setFrameThreeActive(redraw);
          }
        }
    }, false);

    //
    // Frame One
    //

    $(document).on('click', '#nav-issues, a[href="issues"]', function(e){
        setFrameOneActive(redraw);
        e.preventDefault();
    });

    function setFrameOneActive(redraw){
        if(frameOne.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            $('#wax1').addClass('active');
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
        setFrameTwoActive(redraw);
    });

    function setFrameTwoActive(redraw){
        if(frameTwo.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            $('#wax2').addClass('active');
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
        setFrameThreeActive(redraw);
        e.preventDefault();
    });

    function setFrameThreeActive(redraw){
        if(frameThree.data('active') === true){
            $('html, body').animate({scrollTop: 0}, 'fast', easing);
        } else {
            activeFrameTransition();
            $('#wax3').addClass('active');
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
        logo.addClass('transition').removeClass('active');
        $('html').css({'overflow-x': 'hidden'});
        frames.data('active', false);
    }
    function frameAnimationComplete(){
        $('html').css({overflow: ''});
        logo.removeClass('transition');
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