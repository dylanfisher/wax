//
// Store
// 

(function(){
  getProducts($('#product-container'));
  function getProducts(el){
    $.getJSON('http://store.readwax.com/products.json?callback=?').done(function(x){
      var item = x.products;

      if (document.location.hostname == 'localhost'){
        iframeSrc = '/wax/wp-content/themes/wax/buy-button.php';
      } else {
        iframeSrc = '/dev/wp-content/themes/wax/buy-button.php';
      }

      // Append each item as a list
      $.each( item, function( key, product ) {
        // console.log(product);
        el.append('<ul>' +
          '<li>' + '<img class="lazy" data-original="' + product.images[0].src + '" width="150" height="200">' + '</li>' +
          '<li>' + product.title + '</li>' +
          '<iframe class="buy-button-frame" id="buy-button-frame-' + key + '" name="store-iframe" src="' + iframeSrc + '" data-variant="' + product.variants[0].id + '"></iframe>' +
          '</ul>');
      });
      $('img.lazy').lazyload({
        threshold : 400
      });
    });
  }

  constructCartPermalink();
  function constructCartPermalink(){
    $.getJSON('http://store.readwax.com/cart.json?callback=?').done(function(x){
      var data = x.items;

      $.each( data, function( key, value ) {
        var item = value.variant_id + ':' + value.quantity;
        // console.log('item = ' + item);
      });

      var allItems = $(data).map(function(val) {
        return this.variant_id + ':' + this.quantity;
      }).get().join();
      // console.log(allItems);
      $('#cart-permalink').attr('href', 'http://store.readwax.com/cart/' + allItems);
    });
  }

  $(window, window.top.document).load(function(){
    variantIdInit();
  });

  function variantIdInit(){
    $('.buy-button-frame').each(function(key) {
      var variant = $('#buy-button-frame-' + key, top.document).data('variant');
      $('#buy-button-frame-' + key).contents().find('#add-to-cart input[name="id"]').val(variant);
      $('#buy-button-frame-' + key).contents().find('#cart-tester').html(variant);
      // console.log('variantIdInit() Ran');
    });
  }

  function variantIdUpdate(el){
    var variant = el.data('variant');
    el.contents().find('#add-to-cart input[name="id"]').val(variant);
    el.contents().find('#cart-tester').html(variant);
    // console.log('variantIdUpdate() Ran');
  }

  updateCartQuantity($('#cart-item-count'));
  function updateCartQuantity(el){
    $.getJSON('http://store.readwax.com/cart.json?callback=?').done(function(x){
      count = x.item_count;
      if(count === 0){
        el.html('');
      } else {
        el.html(count);
      }
    });
  }

  $('#cart-count').on('click', function(event){
    event.preventDefault();
    updateCartQuantity($('#cart-item-count'));
  });

  $('#clear-cart').on('click', function(event){
    event.preventDefault();
    loadIframe($('#test-iframe'), 'http://store.readwax.com/cart/clear.js');
    $('#test-iframe').load(function(){
      updateCartQuantity($('#cart-item-count'));
    });
  });

  $('#update').on('click', function(event){
    event.preventDefault();
    loadIframe($('#test-iframe'), 'http://store.readwax.com/cart/change/448372341?quantity=10');
  });

  function loadIframe(el, url) {
      var $iframe = el;
      if ( $iframe.length ) {
          $iframe.attr('src',url);
          return false;
      }
      return true;
  }

  // Check if iframes reload (when buy button is clicked)
  $(window).load(function(){
    $('#product-container .buy-button-frame').load(function(){
      variantIdUpdate($(this));
      constructCartPermalink();
      updateCartQuantity($('#cart-item-count'));
      // console.log($(this));
      // console.log('frame has (re)loaded');
    });
  });
})();