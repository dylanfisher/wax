//
// Mustache templates
//

var overlayLoaded  = false,
    secondaryOverlayLoaded = false,
    scrollPos      = 0,
    siteUrl        = 'http://readwax.com/';

if (document.location.hostname == 'localhost'){
  siteUrl = 'http://localhost:8888/wax/';
} else {
  siteUrl = 'http://readwax.com/';
}

$(function(){
  $(document).on('click', 'a.ajax', function(e){
    // Check for pushState support, otherwise follow the link like normal
    if (typeof History.pushState !== "undefined") {
      e.preventDefault();
      showOverlay($(this));

      if($(this).attr('data-temp')){
        $('.overlay-container .overlay-close').after('<div class="temp-degrees"><a href="http://readwax.com/temps.php" target="_blank">' + $('html').attr('data-temp-degrees') + '<span>&#176;</span>F</a></div>');
        CurrentOverlay.css({backgroundColor: $('html').attr('data-temp')});
      }

      if($(this).attr('data-overlay-disable')){
        // console.log('true');
        $('#frame-featured').addClass('disable-mouse');
      }

      // ajax call to our API and appropriate mustache template
      // console.log($(this).data('template'));
      var templateContentEl;
      if(overlayLoaded === true){
        templateContentEl = $('#overlay-content-two');
      } else {
        templateContentEl = $('#overlay-content');
      }

      template($(this).data('request'), $(this).data('template'), templateContentEl, function(){
        if($('.overlay-content .slide-outer-container').length){
          showLoader($('.overlay-content .slide-outer-container'));
          $('.overlay-content .slideshow').imagesLoaded(function(){
            $('.overlay-content .slide-outer-container').find('.loading').remove();
            $('.overlay-content .slideshow').slick({
                arrows: false,
                dots: true,
                draggable: false,
                easing: 'easeInOutQuad',
                lazyLoad: 'ondemand'
            });
          });
        }

        if($('.overlay-container .overlay-footer').length){
          $('.overlay-container .overlay-footer').show();
        }

        if($('.overlay-content .masonry').length){
          $('.overlay-content .masonry').isotope({
            itemSelector: '.masonry-item',
            layoutMode: 'masonry',
            transitionDuration: 0
          });
        }

        if($('.image-module').length){
          SetCaptionWidths();
        }

        if($('.video-module iframe').length){
          SetVideoModuleHeights();
        }

        // Check if the footer is being pushed off the screen
        // var overlayHeight = CurrentOverlay.find('.overlay-content').height();
        // CurrentOverlay.imagesLoaded(function(){
        //   if(overlayHeight < CurrentOverlay.height()){
        //     CurrentOverlay.find('.overlay-footer').addClass('extended-space');
        //   }
        // });

      });
    }
  });

});

function template(request, templateName, $destination, callback){
  getData.api(request, function(x){
    var templateData;
    var singleCatData;
    if(request.indexOf('get_page') != -1){
      templateData = x.page;
    } else if (request.indexOf('get_posts') != -1) {
      templateData = x.posts;
    } else if (request.indexOf('get_post') != -1) {
      templateData = x.post;
    } else if (request.indexOf('store_products') != -1) {
      // product data from shopify
      templateData = StoreData;
    } else if (request.indexOf('store_cart') != -1) {
      // cart data from shopify
      templateData = CartData;
    } else {
      templateData = x;
      console.log('template function request type unknown');
    }
    // console.log(templateData);

    var template = document.getElementById(templateName).innerHTML,
        output   = Mustache.render(template, templateData);
    $destination.html(output);

    if (typeof(callback) === 'function') {
        callback();
    }

  });
}

var getData = function(){
  var apiUrl = sitePath + 'api/';
  var api = function(method, callback){
    $.getJSON(apiUrl + method, function(data) {
      callback(data);
      $('.loading').remove();
    });
  };
  return {
    api: api
  };
} ();

// AJAX loader
var showLoader = function(el){
  var animation = '<div class="loading"></div>';
  el.prepend(animation);
};
