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

    nav.on('click', function(e){
        logo.addClass('transition').removeClass('active');
        $('html').css({'overflow-x': 'hidden'});
        frames.data('active', false);
        e.preventDefault();
    });

    // Set frame two active by default
    frameTwo.data('active', true);

    //
    // Frame One
    //

    $('#nav-issues').on('click', function(e){
        $('#wax1').addClass('active');
        frames.transition({x: frameOnePos}, easing, function(){
            frameAnimationComplete();
        });
        frameOne.data('active', true);
        frameOne.removeClass('fixed');
        $('#frame-two, #frame-three').addClass('fixed');
    });

    //
    // Frame Two
    //

    $('#nav-home').on('click', function(e){
        $('#wax2').addClass('active');
        frames.transition({x: frameTwoPos}, easing, function(){
            frameAnimationComplete();
        });
        frameTwo.data('active', true);
        frameTwo.removeClass('fixed');
        $('#frame-one, #frame-three').addClass('fixed');
    });

    //
    // Frame Three
    //

    $('#nav-store').on('click', function(e){
        $('#wax3').addClass('active');
        frames.transition({x: frameThreePos}, easing, function(){
            frameAnimationComplete();
        });
        frameThree.data('active', true);
        frameThree.removeClass('fixed');
        $('#frame-one, #frame-two').addClass('fixed');
    });

    function frameAnimationComplete(){
        redraw();
        scrollToTop();
        $('html').css({overflow: ''});
        logo.removeClass('transition');
    }

    function scrollToTop(){
        $('html, body').animate({scrollTop: $('#frame-featured').height() - Math.abs( $('#frame-featured').offset().top ) - navOffset}, 'fast', easing);
        // This allows user input to cancel the scroll to top
        $viewport = $('html, body');
        $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
            if( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
                 $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
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