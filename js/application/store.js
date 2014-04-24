//
// Store / Products
//

var StoreData,
    CartData;

$(function(){
  showLoader($('#product-grid'));

  // Initialize the store product grid via shopify json
  getProducts($('#product-container'), function(){
    template('store_products/', 'template-store-product-init', $('#product-grid'), function(){
      $.each($('.product'), function(){
        var obj = getObjects(StoreData, 'id', $(this).data('id'));
        obj = obj[0];

        try {
          if(obj.variants[0].available === false){
            $(this).find('.add-to-cart').replaceWith('<span class="unavailable">Sold out</span>');
          } else {
            $(this).find('.add-to-cart').text('Add to Cart');
          }
        } catch (err){
          // prevent undefined error
        }
      });

      // Group products into rows of three
      var products = $('#product-container .product');
      for(var i = 0; i < products.length; i+=3) {
        products.slice(i, i+3).wrapAll('<div class="product-row"></div>');
      }
    });
  });

  // Open cart when clicking product count
  $(document).on('click', '#nav-cart-permalink', function(e){
    e.preventDefault();
    showOverlay();
    $('#overlay-close').addClass('cart-overlay-close');

    // ajax call to our API and appropriate mustache template
    template($(this).data('request'), $(this).data('template'), $('#overlay-content'), function(){
      cartInit();

      if($('.overlay-container .overlay-footer').length){
        $('.overlay-container .overlay-footer').show();
      }

      if($('.cart-item').length < 1){
        // Cart is empty
        $('#overlay-content .cart-body ul').prepend('<li class="cart-empty">Your cart is empty.</li>');
        $('#cart-total').html('$0.00');
      } else {
        $('#overlay-content .cart-empty').remove();
      }

      // Check if the footer is being pushed off the screen
      var overlayHeight = CurrentOverlay.find('.overlay-content').height();
      if(overlayHeight < CurrentOverlay.height()){
        CurrentOverlay.find('.overlay-footer').addClass('extended-space');
      }

    });
  });

  // Cart Update Item
  $(document).on('click', '.cart-update', function(e){
    e.preventDefault();
    var $cartItem = $(this).closest('.cart-item');
    loadIframe($('#cart-updater'), 'http://store.readwax.com/cart/change/' + $cartItem.data('variant') + '?quantity=' + $cartItem.find('.cart-qty input').val());
    $('#cart-updater').load(function(){
      cartUpdate();
    });
  });

  // Update item when enter key pressed
  $(document).on('keydown', '.cart-qty input', function(e){
    if(e.keyCode == 13){
      e.preventDefault();
        $(this).closest('.cart-item').find('.cart-update').click();
    }
  });

  // Cart Remove Item
  $(document).on('click', '.cart-remove', function(e){
    e.preventDefault();
    var $cartItem = $(this).closest('.cart-item');
    loadIframe($('#cart-updater'), 'http://store.readwax.com/cart/change/' + $cartItem.data('variant') + '?quantity=' + 0);
    $('#cart-updater').load(function(){
      cartUpdate();
    });
    $(this).closest('.cart-item').remove();
    setCartToEmpty();
  });

  // $(document).on('click', '.cart-remove, .cart-update', function(e){
  //   e.preventDefault();
  //   constructCartPermalink();
  // });

  function setCartToEmpty(){
    if($('.cart-item').length < 1){
      // Cart is empty
      $('#overlay-content .cart-body ul').prepend('<li class="cart-empty">Your cart is empty.</li>');
      $('#cart-total').html('$0.00');
    } else {
      $('#overlay-content .cart-empty').remove();
    }
  }


  // Run the first time the cart opens up. Uses data from mustache template
  function cartInit(){
    var costAllItems = 0;
    var costAllFinal = 0;
    $('#overlay-content .cart-price').each(function(){
      var cost = $(this).text().split('$').join('');
      var qty = $(this).prevAll('.cart-qty').find('input').val();
      var totalCost = cost * qty;
      var costToDollars = cost / 100;
      var finalCostToDollars = '$' + costToDollars.toFixed(2);
      var dollars = totalCost / 100;
      var finalCost = '$' + dollars.toFixed(2);
      $(this).html(finalCostToDollars);
      $(this).closest('.cart-item').find('.cart-total').html(finalCost);

      costAllItems += totalCost;
      var costAllDollars = costAllItems / 100;
      costAllFinal = '$' + costAllDollars.toFixed(2);
    });
    $('#cart-total').html(costAllFinal);

    updateCartQuantity();
    // constructCartPermalink();
  }

  // Run after the cart has been initiated, to update total values
  function cartUpdate(){
    var costAllItems = 0;
    var costAllFinal = 0;
    $('#overlay-content .cart-price').each(function(){
      var cost = parseInt( $(this).text().split('$').join('').split('.').join('') );
      var qty = $(this).prevAll('.cart-qty').find('input').val();
      var totalCost = cost * qty;
      var dollars = totalCost / 100;
      var finalCost = '$' + dollars.toFixed(2);
      $(this).nextAll('.cart-total').html(finalCost);

      costAllItems += totalCost;
      var costAllDollars = costAllItems / 100;
      costAllFinal = '$' + costAllDollars.toFixed(2);
    });
    $('#cart-total').html(costAllFinal);

    $('#overlay-content .cart-qty input').each(function(){
      if($(this).val() === '0'){
        $(this).closest('.cart-item').remove();
        setCartToEmpty();
      }
    });

    updateCartQuantity();
    // constructCartPermalink();
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
      $('html, body').animate({scrollTop: $('#product-viewer').offset().top - PrimaryNavHeight});
    }

    // ajax call to our API and appropriate mustache template
    template('store_products/', 'template-store-product', $('.product-viewer-content'), function(){

      StoreSlideshowSlick();

      var obj = getObjects(StoreData, 'id', $('#product-viewer').data('id'));
      obj = obj[0];
      if(obj.variants[0].available === false){
        $('#product-viewer').find('.add-to-cart').replaceWith('<span class="unavailable">Sold out</span>');
      } else {
        $('#product-viewer').find('.add-to-cart').text('Add to Cart');
      }

    });

    e.preventDefault();
  });

  // Close the product viewer
  $('#frame-three-content').on('click', '.product-viewer .overlay-close', function(){
    $(this).closest('.product-viewer').remove();
    $('#product-container .product').removeClass('active');
  });

  function getProducts(el, callback){
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
        el.append(
          '<iframe class="buy-button-frame" id="buy-button-frame-' + key + '" name="store-iframe" src="' + iframeSrc + '" data-variant="' + product.variants[0].id + '" data-id="' + product.id + '"></iframe>');
        $('#buy-button-' + key).click(function(e) {
          $('#buy-button-frame-' + key).contents().find('#add-to-cart').submit();
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

      if (typeof(callback) === 'function') {
        callback();
      }

    });
  }

  // constructCartPermalink();
  function constructCartPermalink(callback){
    // $.getJSON('http://store.readwax.com/cart.json?callback=?').done(function(x){
    //   CartData = x.items;
    //   var data = x.items;

    //   // Add a counter/index for each item to be used in mustache template
    //   for (var i in x.items)
    //      x.items[i].index = i;

    //   $.each( data, function( key, value ) {
    //     var item = value.variant_id + ':' + value.quantity;
    //   });

    //   var allItems = $(data).map(function(val) {
    //     return this.variant_id + ':' + this.quantity;
    //   }).get().join();
    //   $('.cart-permalink').attr('href', 'http://store.readwax.com/cart/' + allItems);

    //   if (typeof(callback) === 'function') {
    //     callback();
    //   }
    // });
  }

  $(window, window.top.document).load(function(){
    variantIdInit();
  });

  function variantIdInit(){
    $('.buy-button-frame').each(function(key) {
      var variant = $('#buy-button-frame-' + key, top.document).data('variant');
      $('#buy-button-frame-' + key).contents().find('#add-to-cart input[name="id"]').val(variant);
      $('#buy-button-frame-' + key).contents().find('#cart-tester').html(variant);
    });
  }

  function variantIdUpdate(el){
    var variant = el.data('variant');
    el.contents().find('#add-to-cart input[name="id"]').val(variant);
    el.contents().find('#cart-tester').html(variant);
  }

  updateCartQuantity();
  function updateCartQuantity(callback){
    $.getJSON('http://store.readwax.com/cart.json?callback=?').done(function(x){
      count = x.item_count;
      if(count === 0){
        $('#cart-item-count').html('').closest('.cart-permalink').addClass('empty');
      } else {
        $('#cart-item-count').html('Cart (' + count + ')').closest('.cart-permalink').removeClass('empty');
      }
      if (typeof(callback) === 'function') {
        callback();
      }

      // Construct Cart Permalink
      CartData = x.items;
      var data = x.items;

      // Add a counter/index for each item to be used in mustache template
      for (var i in x.items)
         x.items[i].index = i;

      $.each( data, function( key, value ) {
        var item = value.variant_id + ':' + value.quantity;
      });

      var allItems = $(data).map(function(val) {
        return this.variant_id + ':' + this.quantity;
      }).get().join();
      $('.cart-permalink').attr('href', 'http://store.readwax.com/cart/' + allItems);

      if (typeof(callback) === 'function') {
        callback();
      }
    });
  }

  // $('#cart-count').on('click', function(event){
  //   event.preventDefault();
  //   updateCartQuantity();
  // });

  // $('#clear-cart').on('click', function(event){
  //   event.preventDefault();
  //   loadIframe($('#test-iframe'), 'http://store.readwax.com/cart/clear.js');
  //   $('#test-iframe').load(function(){
  //     updateCartQuantity();
  //   });
  // });

  // $('#update').on('click', function(event){
  //   event.preventDefault();
  //   loadIframe($('#test-iframe'), 'http://store.readwax.com/cart/change/448372341?quantity=10');
  // });

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
      // constructCartPermalink();
      updateCartQuantity();
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
