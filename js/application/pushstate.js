//
// Pushstate handling
//

$(function(){
  $(document).on('click', '#nav-issues a, #nav-home a, #nav-store a', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
    History.pushState(null, null, url);
  });

  $(document).on('click', 'a.ajax', function(e){
    e.preventDefault();
    var historyCount = 0,
        url = $(this).attr('href');
    History.pushState(null, null, url);
  });
});