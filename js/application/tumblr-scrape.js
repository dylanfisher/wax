$(function(){
  var page = 1;

  $('#nav-finds').click(function(e){
    page = 1;
    showOverlay();
    loadPosts();
    e.preventDefault();

    // Manually prepend all the header stuff because this doesn't use the mustache ajax call. not very DRY at all
    $('#overlay-content').prepend('<h3>Finds</h3>');

    $('.overlay-container .overlay-close').after('<div class="temp-degrees"><a href="http://readwax.com/temps.php" target="_blank">' + $('html').attr('data-temp-degrees') + '<span>&#176;</span>F</a></div>');

    $('#overlay-container').css({backgroundColor: $('html').attr('data-temp')});
  });

  var loadPosts = function(){
    var url = sitePath + 'wp-content/themes/wax/libs/tumblr-scrape.php?pg=' + page;
    $('#overlay-content').append($('<div class="finds-wrapper">').load(url, function(){
      $('#overlay-container .loading').remove();
    }));
    page++;
  };

  var debounceLoadImages = _.debounce(loadPosts, 500, true);

  $('#overlay-container').scroll(function(){
    if($('.finds-wrapper').length){
      st = $('#overlay-container').scrollTop() + $(window).height();
      if(st > $('#overlay-content').outerHeight(true) - 100){
        debounceLoadImages();
      }
    }
  });
});
