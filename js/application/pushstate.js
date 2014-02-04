// $(function() {
//   String.prototype.decodeHTML = function() {
//     return $("<div>", {html: "" + this}).html();
//   };

//   var $main = $("featured-project"),
  
//   init = function() {
//     // Do this when a page loads.
//   },
  
//   ajaxLoad = function(html) {
//     document.title = html
//       .match(/<title>(.*?)<\/title>/)[1]
//       .trim()
//       .decodeHTML();

//     init();
//   },
  
//   loadPage = function(href) {
//     history.pushState({}, '', href);
//     $main.load(href + " main>*", ajaxLoad);
//   };
  
//   init();
  
//   $(window).on("popstate", function(e) {
//     if (e.originalEvent.state !== null) {
//       loadPage(location.href);
//     }
//   });

//   $(document).on("click", "a, area", function() {
//     var href = $(this).attr("href");

//     if(href.indexOf(document.domain) > -1 || href.indexOf(':') === -1){
//       loadPage(href);
//       return false;
//     }
//   });
// });

