//
// Control the animations/transitions of the frame container
//

$(document).ready(function(){
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
        navOffset     = 20,
        easing        = 'easeInOutQuad';

    //
    // All frames
    //

    nav.on('click', function(){
        logo.addClass('transition');
    });

    //
    // Frame One
    //

    $('#nav-issues').on('click', function(e){
        $('html').css({'overflow-x': 'hidden'});
        $('#nav-site-title .wax-logo').removeClass('active');
        $('#wax1').addClass('active');
        frames.transition({x: frameOnePos}, easing, function(){
            redraw();
            scrollToTop();
            $('html').css({overflow: ''});
            logo.removeClass('transition');
        });
        frames.data('active', false);
        frameOne.data('active', true);
        frameOne.removeClass('fixed');
        $('#frame-two, #frame-three').addClass('fixed');
        e.preventDefault();
    });

    //
    // Frame Two
    //

    $('#nav-home').on('click', function(e){
        $('html').css({'overflow-x': 'hidden'});
        $('#nav-site-title .wax-logo').removeClass('active');
        $('#wax2').addClass('active');
        frames.transition({x: frameTwoPos}, easing, function(){
            redraw();
            scrollToTop();
            $('html').css({overflow: ''});
            logo.removeClass('transition');
        });
        frames.data('active', false);
        frameTwo.data('active', true);
        frameTwo.removeClass('fixed');
        $('#frame-one, #frame-three').addClass('fixed');
        e.preventDefault();
    });

    //
    // Frame Three
    //

    $('#nav-store').on('click', function(e){
        $('html').css({'overflow-x': 'hidden'});
        $('#nav-site-title .wax-logo').removeClass('active');
        $('#wax3').addClass('active');
        frames.transition({x: frameThreePos}, easing, function(){
            redraw();
            scrollToTop();
            $('html').css({overflow: ''});
            logo.removeClass('transition');
        });
        frames.data('active', false);
        frameThree.data('active', true);
        frameThree.removeClass('fixed');
        $('#frame-one, #frame-two').addClass('fixed');
        e.preventDefault();
    });

    function scrollToTop(){
        $('html, body').animate({scrollTop: winY - navOffset}, 'fast', easing);
        // This allows user input to cancel the scroll to top
        $viewport = $('html, body');
        $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
            if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
                 $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
            }
        });
    }

    function redraw(){
        // This forces DOM redraw and calculates correct Document height/shows scrollbars
        // avoids some strange behavior with translate and fixed posiioned elements
        $('body').append('<div class="force-redraw"></div>');
        setTimeout(function(){
            $('.force-redraw').remove();
        }, 10);
    }
});