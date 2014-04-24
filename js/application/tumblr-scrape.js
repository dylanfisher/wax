$(function(){
  var page = 1;

  $('#nav-finds').click(function(e){
    page = 1;
    showOverlay();
    loadPosts();
    e.preventDefault();
    $('#overlay-content').prepend('<h3>Finds</h3>');
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
