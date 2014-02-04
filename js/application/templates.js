//
// Mustache templates
//

// template('get_page/?id=2', 'template1', $('#mustache'));

(function(){
  var container      = $('#overlay-container'),
      content        = $('#overlay-content'),
      frameContainer = $('#frame-container'),
      scrollPos      = 0,
      overlayLoaded  = false;

  $(document).on('click', 'a.ajax', function(e){
    // Check for pushState support, otherwise follow the link like normal
    if (typeof history.pushState !== "undefined") {
      e.preventDefault();
      scrollPos = $(window).scrollTop();
      container.addClass('active');
      frameContainer.addClass('overlay-active');
      showLoader(container);
      // ajax call to our API and appropriate mustache template
      console.log($(this).data('template'));
      console.log($('#overlay-content'));

      // pushState
      var historyCount = 0,
          url = $(this).attr('href');
      // goTo(href);
      template($(this).data('request'), $(this).data('template'), content);
      history.pushState(null, null, url);
      window.onpopstate = function(){
        console.log('window.onpopstate detected');
        history.pushState(null, null, document.location.href);
        closeOverlay();
        if(historyCount) {
          // 
        }
        historyCount = historyCount+1;
      };
    }
  });

  // Close the overlay when the X is clicked
  $(document).on('click', '#overlay-close', function(){
    closeOverlay();
  });
  // Close the overlay when outer content is clicked
  // $(document).on('click', function(e) {
  //   if(overlayLoaded === true) {
  //     if($(e.target).parents().index(content) == -1) {
  //       closeOverlay();
  //     }
  //   }
  // });
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
      var templateData = x.page;
      // console.log(templateData);
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
    // history.back();
  }
})();

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

function goTo(href) {
    $.ajax({
        url: href,
        success: function(data) {
            $('body').fadeOut('fast', function(){
                $(this).html(data).fadeTo('fast', 1);
            });
            // update the page title
            var title = $('#main').find('h1').text();
            $('head').find('title').text(title);
        }
    });
}