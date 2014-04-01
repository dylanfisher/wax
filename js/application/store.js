//
// Store / Products
//

var StoreData,
    CartData;

$(function(){
  // Initialize the store product grid via shopify json
  template('store_products', 'template-store-product-init', $('#product-grid'), function(){
    $.each($('.product'), function(){
      var obj = getObjects(StoreData, 'id', $(this).data('id'));
      obj = obj[0];

      try {
        if(obj.variants[0].available === false){
          $(this).find('.add-to-cart').replaceWith('<span class="unavailable">Sold out</span>');
        }
      } catch (err){
        // prevent undefined error
        // console.log(err);
      }
    });

    // Group products into rows of three
    var products = $('#product-container .product');
    for(var i = 0; i < products.length; i+=3) {
      console.log(products);
      products.slice(i, i+3).wrapAll('<div class="product-row"></div>');
    }
  });

  // Open cart when clicking product count
  $(document).on('click', '#nav-cart-permalink', function(e){
    e.preventDefault();
    showOverlay();
    // ajax call to our API and appropriate mustache template
    console.log($(this).data('template'));
    template($(this).data('request'), $(this).data('template'), $('#overlay-content'), cartInit);
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

  $(document).on('click', 'a.ajax-store', function(e){
    e.preventDefault();
    showLoader($('.product-viewer-content'));
  });

  // Open up the product viewer
  $('#product-container').on('click', '.product .image-container', function(e){
    var productId = $(this).closest('.product').data('id');
    var current_product = {};
    current_product = getObjects(StoreData, 'id', productId);
    StoreData.current_product = current_product;

    if( ! $(this).closest('.product.active').length){
      $('.product-viewer').remove();
      $('#product-container .product').removeClass('active');
      $(this).closest('.product').addClass('active');
      $(this).closest('.product-row').append('<div id="product-viewer" class="product-viewer" data-id="' + $(this).closest('.product').data('id') + '"><div class="product-viewer-content"></div></div>');
    }

    // ajax call to our API and appropriate mustache template
    // console.log($(this).data('template'));
    template('store_products', 'template-store-product', $('.product-viewer-content'), function(){
      $('.product-viewer-content .slideshow').slidesjs({
          width: 940,
          height: 528,
          navigation: {
              active: false
          }
      });

      var obj = getObjects(StoreData, 'id', $('#product-viewer').data('id'));
      obj = obj[0];
      if(obj.variants[0].available === false){
        $('#product-viewer').find('.add-to-cart').replaceWith('<span class="unavailable">Sold out</span>');
      }

    });

    e.preventDefault();
  });

  // Close the product viewer
  $('#frame-three-content').on('click', '.product-viewer .overlay-close', function(){
    $(this).closest('.product-viewer').remove();
    $('#product-container .product').removeClass('active');
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

      // console.log(item);

      // Store products
      // $.each($('#product-container .product'), function(){
      //   var obj = getObjects(item, 'id', $(this).data('id'));
      //   obj = obj[0];
      //   // console.log(obj);
      //   $(this).find('.image-container').append('<img class="lazy" data-original="' + obj.images[0].src + '">');
      //   $(this).find('img.lazy').lazyload();
      // });

      // Append each item as a list
      $.each( item, function( key, product ) {
        // console.log(product);
        el.append(
          '<iframe class="buy-button-frame" id="buy-button-frame-' + key + '" name="store-iframe" src="' + iframeSrc + '" data-variant="' + product.variants[0].id + '" data-id="' + product.id + '"></iframe>');
        $('#buy-button-' + key).click(function(e) {
          $('#buy-button-frame-' + key).contents().find('#add-to-cart').submit();
          // console.log(key);
          // console.log($('#buy-button-frame-' + key).contents().find('#add-to-cart'));
          e.preventDefault();
        });
      });

      // Add item to cart when add to cart button is clicked within a product
      $(document).on('click', '.product .add-to-cart', function(e){
        e.preventDefault();
        $('.buy-button-frame[data-id="' + $(this).closest('.product').data('id') + '"]').contents().find('#add-to-cart').submit();
      });

      // Add item to cart when add to cart button is clicked within product viewer
      $(document).on('click', '.product-viewer .add-to-cart', function(e){
        e.preventDefault();
        $('.buy-button-frame[data-id="' + $(this).closest('.product-viewer').data('id') + '"]').contents().find('#add-to-cart').submit();
      });
    });
  }

  constructCartPermalink();
  function constructCartPermalink(callback){
    // console.log('constructCartPermalink ran');
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

// Find and return objects within json data
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if (i == key && obj[key] == val) {
      objects.push(obj);
    }
  }
  return objects;
}