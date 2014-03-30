//
// Mustache templates
//

var overlayLoaded  = false,
    scrollPos      = 0,
    siteUrl        = 'http://localhost:3000/wax/';

if (document.location.hostname == 'localhost'){
  siteUrl = 'http://localhost:3000/wax/';
} else {
  siteUrl = 'http://readwax.com/dev/';
}

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
      // console.log($(this).data('template'));
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

});

function template(request, templateName, $destination, callback){
  getData.api(request, function(x){
    var templateData;
    var singleCatData;
    if(request.indexOf('get_page') != -1){
      templateData = x.page;
    } else if (request.indexOf('get_posts') != -1) {
      templateData = x.posts;
      // templateData.most_recent = x.posts[0];
      // templateData.other_posts = x.posts;
      // templateData.other_posts.splice(0,1);
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

    $('#templates').load(sitePath + 'wp-content/themes/wax/mustache-templates.html #' + templateName, function(){
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

var getData = function(){
  var apiUrl = sitePath + 'api/',
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
