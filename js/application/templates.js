//
// Mustache templates
//

$(function(){
  var siteUrl        = 'http://localhost:3000/wax/',
      container      = $('#overlay-container'),
      content        = $('#overlay-content'),
      frameContainer = $('#frame-container'),
      scrollPos      = 0,
      overlayLoaded  = false;

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

      // pushState
      var historyCount = 0,
          url = $(this).attr('href');
      template($(this).data('request'), $(this).data('template'), content);
      History.pushState(null, null, url);
    }
  });

  $(document).on('click', '#nav-issues a, #nav-home a, #nav-store a', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    History.pushState(null, null, url);
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

  function template(request, templateName, $destination){
    getData.api(request, function(x){
      var templateData;
      if(request.indexOf('get_page') != -1){
        templateData = x.page;
      } else {
        templateData = x.post;
      }
      console.log(templateData);
      $('#templates').load('/wax/wp-content/themes/wax/mustache-templates.html #' + templateName, function(){
        console.log('#templates loaded');
        var template = document.getElementById(templateName).innerHTML,
            output   = Mustache.render(template, templateData);
        $destination.html(output);
      });
      overlayLoaded = true;
    });
  }

  function closeOverlay(){
    container.removeClass('active');
    frameContainer.removeClass('overlay-active');
    content.html('');
    $(window).scrollTop(scrollPos);
    overlayLoaded = false;
    History.pushState(null, null, siteUrl);
  }
});

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