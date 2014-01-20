//
// AJAX calls
//

$('#test').on('click', function(){
  loader($(this));
  getData.api('get_page/?id=2', function(data){
    data = data.page;
    $('#ajax-here').html(
      'this post title = ' + data.title +
      '<br/>and CONTENT = ' + data.content +
      '<br/>and a DATE = ' + data.date);
  });
});

var getData = function(){
  var apiUrl = '/wax/api/',
  api = function(method, callback){
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
var loader = function(el){
  var animation = '<div class="loading">loading...</div>';
  el.append(animation);
};