<form id="add-to-cart" action="http://store.readwax.com/cart/add" method="post">
  <input type="hidden" name="id" value="" />
  <input type="hidden" name="return_to" value="back" />
  <input type="submit" value="BUY NOW"/>
</form>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>

<script type="text/javascript">
	$(function(){
		variantId();
	});
	function variantId(){
		$('.buy-button-frame', top.document).each(function(key) {
			var variant = $(this).data('variant');
			console.log(key, variant);
			$(this).contents().find('#add-to-cart input[name="id"]').val(variant);
		});
	}
</script>