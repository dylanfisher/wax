//
// Mustache templates
//

var overlayLoaded  = false,
    secondaryOverlayLoaded = false,
    scrollPos      = 0,
    siteUrl        = 'http://localhost:3000/wax/';

if (document.location.hostname == 'localhost'){
  siteUrl = 'http://localhost:3000/wax/';
} else {
  siteUrl = 'http://readwax.com/dev/';
}

$(function(){
  $(document).on('click', 'a.ajax', function(e){
    // Check for pushState support, otherwise follow the link like normal
    if (typeof History.pushState !== "undefined") {
      e.preventDefault();
      showOverlay($(this));

      if($(this).attr('data-temp')){
        $('.overlay-container').css({backgroundColor: $('html').attr('data-temp')});
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
            $('.overlay-content .slideshow').slidesjs({
                width: 840,
                height: 528
            });
          });
        }

        if($('.overlay-container .overlay-footer').length){
          $('.overlay-container .overlay-footer').show();
        }

        if($('.overlay-content .masonry').length){
          $('.overlay-content .masonry').isotope({
            itemSelector: '.masonry-item',
            layoutMode: 'masonry'
          });
        }

        if($('.image-module').length){
          SetCaptionWidths();
        }

        if($('.video-module iframe').length){
          SetVideoModuleHeights();
        }

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
      console.log('template function request type failed');
    }
    console.log(templateData);

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