//
// Mustache templates
//

var overlayLoaded  = false,
    scrollPos      = 0,
    siteUrl        = 'http://localhost:3000/wax/';

$(function(){
  var container      = $('#overlay-container'),
      content        = $('#overlay-content'),
      frameContainer = $('#frame-container');

  $(document).on('click', 'a.ajax', function(e){
    // Check for pushState support, otherwise follow the link like normal
    if (typeof History.pushState !== "undefined") {
      e.preventDefault();
      scrollPos = $(window).scrollTop();
      container.addClass('active');
      frameContainer.addClass('overlay-active');
      showLoader(container);

      // ajax call to our API and appropriate mustache template
      console.log($(this).data('template'));
      template($(this).data('request'), $(this).data('template'), content, function(){
        if($('#overlay-content .slide-outer-container').length){
          $('#overlay-content .slideshow').slidesjs({
              width: 940,
              height: 528,
              navigation: {
                  active: false
              }
          });
        }
      });
    }
  });

  $(document).on('click', 'a.ajax-store', function(e){
    var container = $('.product-viewer-content');
    e.preventDefault();
    scrollPos = $(window).scrollTop();
    showLoader(container);

    // ajax call to our API and appropriate mustache template
    console.log($(this).data('template'));
    template($(this).data('request'), $(this).data('template'), container);
  });

  // window.addEventListener('popstate', function(event) {
  //   var href = window.location.href;

  //   if(href == siteUrl){
  //     if(!$('#frame-featured').length){
  //       href = siteUrl;
  //     }
  //     if(History.getCurrentIndex() !== 0){
  //       closeOverlay();
  //     }
  //   } else if ($('#frame-container a[href*="' + location.pathname + '"]').length && window.location.hash !== ''){
  //     link = $('a[href*="' + location.pathname + '"]');
  //     console.log(link);
  //     scrollPos = $(window).scrollTop();
  //     container.addClass('active');
  //     frameContainer.addClass('overlay-active');
  //     showLoader(container);
  //     // ajax call to our API and appropriate mustache template
  //     console.log($(this).data('template'));

  //     // pushState
  //     template(link.data('request'), link.data('template'), content);
  //     var url = $(this).attr('href');
  //     History.pushState(null, null, url);
  //   }
  // }, false);
});

// Close the overlay when the X is clicked
$(document).on('click', '#overlay-close', function(){
  closeOverlay();
});

// Close the overlay when escape key is pressed
$(document).keydown(function(e) {
  if(overlayLoaded === true) {
    if (e.keyCode == 27) {
      closeOverlay();
    }
  }
});

function template(request, templateName, $destination, callback){
  getData.api(request, function(x){
    var templateData;
    if(request.indexOf('get_page') != -1){
      templateData = x.page;
    } else if (request.indexOf('get_post') != -1) {
      templateData = x.post;
    } else if (request.indexOf('store_products') != -1) {
      // product data from shopify
      templateData = StoreData;
    } else if (request.indexOf('store_cart') != -1) {
      // cart data from shopify
      templateData = CartData;
    } else {
      console.log('template function request type failed');
    }
    console.log(templateData);
    $('#templates').load('/wax/wp-content/themes/wax/mustache-templates.html #' + templateName, function(){
      console.log('#templates loaded');
      var template = document.getElementById(templateName).innerHTML,
          output   = Mustache.render(template, templateData);
      $destination.html(output);
      if (typeof(callback) === 'function') {
          callback();
      }
    });
    overlayLoaded = true;
  });
}

function closeOverlay(){
  $('#overlay-container').removeClass('active');
  $('#frame-container').removeClass('overlay-active');
  $('#overlay-content').html('');
  $(window).scrollTop(scrollPos);
  console.log(scrollPos);
  overlayLoaded = false;
  History.pushState(null, null, siteUrl);
}

var getData = function(){
  var apiUrl = '/wax/api/',
      api    = function(method, callback){
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
  var animation = '<div class="loading">loading...</div>';
  el.prepend(animation);
};
