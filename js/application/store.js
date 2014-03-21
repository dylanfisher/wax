//
// Store
//

var StoreData,
    CartData;

$(function(){
  // Group products into rows of three
  var products = $('#product-container .product');
  for(var i = 0; i < products.length; i+=3) {
    products.slice(i, i+3).wrapAll('<div class="product-row"></div>');
  }

  // Open cart when clicking product count
  $(document).on('click', '#nav-cart-permalink', function(e){
    e.preventDefault();
    scrollPos = $(window).scrollTop();
    var container = $('#overlay-content');
    $('#frame-container').addClass('overlay-active');
    $('#overlay-container').addClass('active');
    showLoader(container);
    // ajax call to our API and appropriate mustache template
    console.log($(this).data('template'));
    template($(this).data('request'), $(this).data('template'), container, cartInit);
  });

  $(document).on('click', '.cart-update', function(e){
    e.preventDefault();
    var $cartItem = $(this).closest('.cart-item');
    loadIframe($('#cart-updater'), 'http://store.readwax.com/cart/change/' + $cartItem.data('variant') + '?quantity=' + $cartItem.find('.cart-qty input').val());
  });

  $(document).on('click', '.cart-remove', function(e){
    e.preventDefault();
    var $cartItem = $(this).closest('.cart-item');
    loadIframe($('#cart-updater'), 'http://store.readwax.com/cart/change/' + $cartItem.data('variant') + '?quantity=' + 0);
  });

  $(document).on('click', '.cart-remove, .cart-update', function(e){
    e.preventDefault();
    constructCartPermalink();
  });

  function cartInit(){
    var costAllItems = 0;
    $('#overlay-content .cart-price').each(function(){
      var cost = parseInt( $(this).text() );
      var qty = $(this).prevAll('.cart-qty').find('input').val();
      var totalCost = cost * qty;
      var dollars = totalCost / 100;
      var finalCost = '$' + dollars.toFixed(2);
      $(this).html(finalCost);

      costAllItems += totalCost;
      costAllDollars = costAllItems / 100;
      costAllFinal = '$' + costAllDollars.toFixed(2);
    });
    $('#cart-total').html(costAllFinal);

    constructCartPermalink();
  }

  // Cart update
  // window.open('http://store.readwax.com/cart/change/' + variantId + '?quantity=' + quantity)

  // Cart checkout
  $(document).on('click', '#cart-checkout', function(){
    window.open('http://store.readwax.com/cart/change/' + variantId + '?quantity=' + quantity);
  });

  // Open up the product viewer
  products.on('click', function(e){
    $('.product-viewer').remove();
    $(this).parent('.product-row').append('<div class="product-viewer"><div class="product-viewer-content"></div></div>');
    e.preventDefault();
  });

  // Close the product viewer
  $('#frame-three-content').on('click', '.product-viewer .overlay-close', function(){
    $(this).closest('.product-viewer').remove();
  });

  getProducts($('#product-container'));
  function getProducts(el){
    $.getJSON('http://store.readwax.com/products.json?callback=?').done(function(x){
      StoreData = x.products;
      var item = x.products;

      if (document.location.hostname == 'localhost'){
        iframeSrc = '/wax/wp-content/themes/wax/buy-button.php';
      } else {
        iframeSrc = '/dev/wp-content/themes/wax/buy-button.php';
      }

      // Append each item as a list
      $.each( item, function( key, product ) {
        console.log(product);
        el.append(
          '<ul>' +
            '<li>' + '<img class="lazy" data-original="' + product.images[0].src + '" width="150" height="200">' + '</li>' +
            '<li>' + product.title + '</li>' +
            '<li><a class="buy-button" id="buy-button-' + key + '" href="#">Add to Cart</a>' +
          '</ul>' +
          '<iframe class="buy-button-frame" id="buy-button-frame-' + key + '" name="store-iframe" src="' + iframeSrc + '" data-variant="' + product.variants[0].id + '"></iframe>');
        $('#buy-button-' + key).click(function(e) {
          $('#buy-button-frame-' + key).contents().find('#add-to-cart').submit();
          console.log(key);
          console.log($('#buy-button-frame-' + key).contents().find('#add-to-cart'));
          e.preventDefault();
        });
      });
      $('img.lazy').lazyload({
        threshold : 400
      });
    });
  }

  constructCartPermalink();
  function constructCartPermalink(callback){
    console.log('constructCartPermalink ran');
    $.getJSON('http://store.readwax.com/cart.json?callback=?').done(function(x){
      CartData = x.items;
      var data = x.items;

      // Add a counter/index for each item to be used in mustache template
      for (var i in x.items)
         x.items[i].index = i;

      $.each( data, function( key, value ) {
        var item = value.variant_id + ':' + value.quantity;
        // console.log('item = ' + item);
      });

      var allItems = $(data).map(function(val) {
        return this.variant_id + ':' + this.quantity;
      }).get().join();
      // console.log(allItems);
      $('.cart-permalink').attr('href', 'http://store.readwax.com/cart/' + allItems);

      if (typeof(callback) === 'function') {
        callback();
      }
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
});