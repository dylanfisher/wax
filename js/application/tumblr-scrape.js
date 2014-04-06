$(function(){
  var page = 1;

  $('#nav-finds').click(function(e){
    page = 1;
    showOverlay();
    loadPosts();
    e.preventDefault();
  });

  var loadPosts = function(){
    console.log('page is: ' + page);
    var url = sitePath + 'wp-content/themes/wax/libs/tumblr-scrape.php?pg=' + page; 
    $('#overlay-content').append($('<div class="finds-wrapper">').load(url, function(){
      $('#overlay-container .loading').remove();
    }));
    page++;
  };

  var debounceLoadImages = _.debounce(loadPosts, 500, true);

  $('#overlay-container').scroll(function(){
    st = $('#overlay-container').scrollTop() + $(window).height();
    if(st > $('#overlay-content').outerHeight(true) - 100){
      debounceLoadImages();
    }
  });
});