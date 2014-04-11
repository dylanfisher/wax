$(function(){
  var pixels;
  var numboxes;
  $(document).ready(function(){
    waxTempResize();
  });

  $(window).resize(function(){
    waxTempResize();
    //if (Browser.Engine.gecko) setTimeout(waxTempResize, 50);
  });

  function waxTempResize() {
    var viewportwidth;
    var viewportheight;

    if (typeof window.innerWidth != 'undefined') {
      viewportwidth = window.innerWidth;
      viewportheight = window.innerHeight;
    } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth !== 0) {
      viewportwidth = document.documentElement.clientWidth;
      viewportheight = document.documentElement.clientHeight;
    } else {
      viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
      viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }

    numboxes = Math.floor(viewportwidth / 200);

    pixels = Math.floor(viewportwidth / numboxes);
    pixels = pixels +1;

    var wrapperwidth = (numboxes*pixels);

    $('.colorbox').css('width',pixels);
    $('.external-layout-wrapper.temperature-page').css('width',wrapperwidth);
  }
});