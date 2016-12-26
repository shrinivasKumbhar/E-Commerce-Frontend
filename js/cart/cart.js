jQuery(document).ready(function($){
	//alert();
	//open the lateral panel
	$('.add-cart-btn').on('click', function(event){
		event.preventDefault();
		// alert();
		var cart_id = $(this)[0].id;
		var cart_main_div_class	= $(this).attr("class");
		var prod_div_id = $(this).parents("div").parents("div").attr("id");
		var prodDisplayName =$("#"+prod_div_id).find(".prodDisplayName").text().trim();
		var prodQuantity = $("#"+prod_div_id).find(".prodQuantity").val();
		var prodPriceLable =$("#"+prod_div_id).find(".prodPriceLable").text().trim();
		alert(prodDisplayName+"="+prodQuantity+"  "+prodPriceLable);
		var div_html = $("#"+cart_id).parents("div").html();
		var prodInfoDataArray = [];
		prodInfoDataArray.push({"prodDisplayName":prodDisplayName,"prodQuantity":prodQuantity,"prodPriceLable":prodPriceLable});
		var jsonString = JSON.stringify(prodInfoDataArray);
		//alert(jsonString);
		console.log(jsonString);
		addCartCountCheck(prodDisplayName,prodQuantity,prodPriceLable);
		//$('.cd-panel').addClass('is-visible');
		//loadCart();
	});
	//clode the lateral panel
	$('.cd-panel').on('click', function(event){
		if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) { 
			$('.cd-panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
    
	$(".cd-btn").on('click', function(event){
		$('.cd-panel').addClass('is-visible');
	});
	$("#empty-cart").on('click' ,function(event){
		emptyCartAjaxCall();
	});

	$("#checkout").on('click' ,function(event){
		checkoutOrder();
	});

	$("#cart-table").delegate("tr td.delete", "click", function(event){
		removeAccessoryFromCart(this,event);
	});

	$("#cart-table").delegate("tr td .item-quantity", "change", function(event){
		changeProductQuantity(this);
	});
	
	var cartItemSize = cartsize();
});

function loadCart(){
	$("#cartbody").empty();
	cartsize();
	var grantTotalAmount = 0;
	var accessories = [];
	var xmlhttp = new getXMLHttpRequestObject();
	xmlhttp.open("GET","../cart/CartCommonUtils/load-cart-accessories.jsp" ,  true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			if (xmlhttp.responseText.trim() != null	&& xmlhttp.responseText.trim() != "")
			{

				var result = $.parseJSON(xmlhttp.responseText);
				if(result.length != 0){
					$('#cartbody tr.empty-cart').remove();
					var cart = xmlhttp.responseText.trim();
					accessories= JSON.parse(cart);
					if(accessories.length != 0)
					{

						for(var i=0;i<accessories.length;i++) {

							var cost = accessories[i]['cost'];
							var quantity = accessories[i]['quantity'];
							var mProductName = accessories[i]['mProductName'];
							var totalAmountOfAccessory = accessories[i]['totalAmount'];
							    totalAmountOfAccessory=totalAmountOfAccessory;
							var selectedproduct = '<tr class="selected-item"><td class="product-name">'+mProductName +'</td><td class="product-rate" style="text-align: center;" id="cart-cost'+i+'">'+ cost.toFixed(2)  + '</td>';
							/*selectedproduct += '<td style="display:flex;text-align: center;"><div class="plus" style="display:inline-block; width:26%;"><i class="fi-plus" style="color:#b00000; font-size: 1.2em; cursor:pointer;"> </i></div><input type="text" class="item-quantity" id="item'+i+'" pattern="[0-9]*" min="1" onKeyPress="return checkNo(event)" style="display:inline-block; margin-bottom:0px; border-radius: 10px;width:43%;"><div class="minus" style="display:inline-block; width:18%;margin-left:8px;"><i class="fi-minus" style="color:#b00000; font-size: 1.2em;cursor:pointer;"> </i></div></td>';*/
							selectedproduct += '<td style="display:flex;text-align: center;"><input type="number" class="item-quantity" id="item'+i+'" pattern="[0-9]*" min="1" onKeyPress="return checkNo(event)" style="display:inline-block; margin-bottom:0px; border-radius: 10px;"></td>';
							selectedproduct += '<td class="product-amount" style="text-align: center;" id="cart-totalid'+i+'">' +totalAmountOfAccessory+'</td><td class="delete"> <i class="fi-x" style="color:#b00000; font-size: 1.2em; margin-left: 10%; cursor:pointer;margin: -5px;"> </i></td></tr>';

							$('#cartbody').append(selectedproduct);
							$("#item"+i).val(quantity);

							grantTotalAmount += parseFloat(totalAmountOfAccessory);
						//	alert(grantTotalAmount);
						}

					}
					else
					{
						var selectedproduct = '<tr class="empty-cart"><td colspan="5">Your Cart Is Empty.</td></tr>';
						$('#cartbody').append(selectedproduct);
					}
				} 
				else{
					var selectedproduct = '<tr class="empty-cart"><td colspan="5">Your Cart Is Empty.</td></tr>';
					$('#cartbody').append(selectedproduct);
				} 
				$("#total").html(grantTotalAmount.toFixed(2));
			}
		}	
	}	;
	xmlhttp.send(null);
}

/*function loadCart(){
	  var totalAmount = 0;
	  var username = $("#username").val();
	  var accessories = [];
	  $('#cartbody').empty();
	  if(localStorage && localStorage.getItem('cart-'+username)){
	    	var cart = localStorage.getItem("cart-"+username);
	    	accessories= JSON.parse(cart);
	    	if(accessories.length != 0){
	 	    	$('#cartbody tr.empty-cart').remove();
	 	    for (var i in accessories) { //iterate over all the objects in dataset
	 	    	   var cost = accessories[i]['productCost'];
	 	    	   var quantity = accessories[i]['productQuantity'];
	 	    	   var totalAmountOfAccessory = accessories[i]['totalAmount'];
	 	    	   var name = accessories[i]['productName'];
	 	    	   var selectedproduct = '<tr class="selected-item"><td class="product-name">'+name +'</td><td class="product-rate" style="text-align: center;">'+ cost  + '</td>';
	 	    	   selectedproduct += '<td style="display:flex;text-align: center;"><div class="plus" style="display:inline-block; width:26%;"><i class="fi-plus" style="color:#b00000; font-size: 1.2em; cursor:pointer;"> </i></div><input type="text" class="item-quantity" id="item'+i+'" pattern="[0-9]*" min="1" onKeyPress="return checkNo(event)" style="display:inline-block; margin-bottom:0px; border-radius: 10px;width:43%;"><div class="minus" style="display:inline-block; width:18%;margin-left:8px;"><i class="fi-minus" style="color:#b00000; font-size: 1.2em;cursor:pointer;"> </i></div></td>';
	 	    	   selectedproduct += '<td class="product-amount" style="text-align: center;">' +totalAmountOfAccessory+'</td><td class="delete"> <i class="fi-x" style="color:#b00000; font-size: 1.2em; margin-left: 10%; cursor:pointer;margin: -5px;"> </i></td></tr>';


	 	    	   var selectedproduct = '<tr class="selected-item"><td class="product-name">'+name +'</td><td class="product-rate" style="text-align: center;">'+ cost  + '</td>';
	 	    	   selectedproduct += '<td style="display:flex;text-align: center;"><input type="text" class="item-quantity" id="item'+i+'" pattern="[0-9]*" min="1" onKeyPress="return checkNo(event)" style="display:inline-block; margin-bottom:0px; border-radius: 10px;"></td>';
	 	    	   selectedproduct += '<td class="product-amount" style="text-align: center;">' +totalAmountOfAccessory+'</td><td class="delete"> <i class="fi-x" style="color:#b00000; font-size: 1.2em; margin-left: 10%; cursor:pointer;margin: -5px;"> </i></td></tr>';

	 	    	   $('#cartbody').append(selectedproduct);
	 	    	   $("#item"+i).val(quantity);

	 	    	  totalAmount += parseInt(totalAmountOfAccessory);
	 	   	}
	 	  }else{
	    	var selectedproduct = '<tr class="empty-cart"><td colspan="5">Your Cart Is Empty.</td></tr>';
	    	$('#cartbody').append(selectedproduct);
	    } 
      }else{
    	  var selectedproduct = '<tr class="empty-cart"><td colspan="5">Your Cart Is Empty.</td></tr>';
	    	$('#cartbody').append(selectedproduct);
      } 
	   $("#total").html(totalAmount);
}  */



/*function emptyCartAjaxCall(){
	var done = confirm("are you sure you want to do empty this cart");
	   if(done)
		   {
    			$.ajax({
    				url : '../cart/EmptyCartAjax',
    				type : 'POST',
    				dataType : 'text',
    				success : function(data){
				   		  localStorage.removeItem("cart-"+username);
				   		  loadCart();

    				}, 
    				error : function(data){
    					alert(data);
    				}
    			});
		   }


}*/

function emptyCartAjaxCall(){
	/*	alert("Sss");
			var username = $("#username").val();
			var obj = [];
		    if(localStorage && localStorage.getItem('cart-'+username)){
			    var cart = localStorage.getItem("cart-"+username);
		    	obj= JSON.parse(cart);
		    	 if(obj.length != 0){
		    			$.ajax({
		    				url : '../cart/EmptyCartAjax',
		    				type : 'POST',
		    				dataType : 'text',
		    				success : function(data){
						   		  localStorage.removeItem("cart-"+username);
						   		  loadCart();
						    		$('#table-body tr').each(function(){
						    			$(this).children().each(function(){
						    				if($(this).find('.add-product-to-cart').is(':checked') ){
						    						$(this).parent().find('.add-product-to-cart').prop("checked", false);
						    						$(this).parent().find(".product-quantity").val('');
						    						$(this).parent().find(".total-amount").val('');
						    				}
						    			});
						    		});
		    				}, 
		    				error : function(data){
		    					alert(data);
		    				}
		    			});
		   	    }else{
		   			  alert("Your Cart Is Aleady Empty!");
		   		 }
		    }*/
	/*$.ajax({
		url : '../cart/EmptyCartAjax',
		type : 'POST',
		dataType : 'text',
		success : function(data){
			loadCart();
			$('#table-body tr').each(function(){
				$(this).children().each(function(){
					//if($(this).find('.add-product-to-cart').is(':checked') ){
						$(this).parent().find(".add-to-cart").val("Add To Cart");
					//	$(this).parent().find('.add-product-to-cart').prop("checked", false);
						$(this).parent().find(".product-quantity").val('');
						$(this).parent().find(".total-amount").val('');
					//}
					//	$(this).parent().find(".remove-from-cart-").val("Add To Cart");
					//	alert("ssfd");
						cartsize();
						
				});
			});
		}, 
		error : function(data){
			alert(data);
		}
	});*/
}

function removeAccessoryFromCart(currentElement,event){

	var removeItem = $(currentElement).parent().find(".product-name").html();
	
	$.ajax({
		url : '../cart/DeleteAccessoryFromCart',
		type : 'POST',
		dataType : 'text',
		data : { productName : removeItem},
		success : function(data){
			
			$('#table-body tr').each(function(){
				if($(this).children().find(".product-name").val() === removeItem){
					var item =$(this).children().find(".total-amount").attr('id'); 
					var itemId = item.substring(11);
					$(this).children().find(".product-quantity").val('');
					$(this).children().find(".total-amount").val('');
					$(this).children().find(".remove-from-cart-").val("Add To Cart");
					$(this).children().find(".add-to-cart").removeClass("alert");
					$(this).children().find(".add-to-cart").addClass("success");
					$("#addCartItem"+itemId).val("Add To Cart");
					$("#remove-from-cart-"+itemId).hide();
					$("#addCartItem"+itemId).show();
					$("#addCartItem"+itemId).css("background-color", "#43ac6a");
					loadCart();
					cartsize();
				}
			});
		},
		error : function(data){
			//alert(data);
		}
	});

	
}

function changeProductQuantity(currentElement){
	var name = $(currentElement).parent().parent().find(".product-name").html();
	var cost = $(currentElement).parent().parent().find(".product-rate").html();
	var quantity = $(currentElement).val();
	var totalAmount = cost*quantity;
	
	$.ajax({
		url : '../cart/EditCart',
		type : 'POST',
		dataType : 'text',
		data : { productName : name, productQuantity : quantity, totalAmount : totalAmount},
		success : function(data){
			     
			//	loadCart();
			     var cartLength= $('#cartbody tr').length;;
			   //  alert("test"+cartLength);
			    
				$('#table-body tr').each(function(){
					if($(this).children().find(".product-name").val() === name){
						$(this).children().find(".product-quantity").val(quantity);
						//alert((quantity * cost).toFixed(2));
						$(this).children().find(".total-amount").val((quantity * cost));
					}
				});
				
				calCartTotal(cartLength);
		},
		error : function(data){
			//alert(data);
		}
	});

}

function addCartCountCheck(prodDisplayName,prodQuantity,prodPriceLable){
	
}
function calCartTotal(cartLength){
//	alert("Funcation Call "+cartLength);
	var grantTotalAmount=0;
	for(var i=0;i<cartLength;i++)
		{
			var quantity=$("#item"+i).val();
			var rate=$("#cart-cost"+i).html();
			
			var totalAmountOfAccessory=(rate*quantity);
			//alert(totalAmountOfAccessory);
			$("#cart-totalid"+i).html(totalAmountOfAccessory.toFixed(2));
			
		//	alert("Qty="+quantity+" Rate="+rate+" Total="+(rate*quantity));
			grantTotalAmount += parseFloat(totalAmountOfAccessory.toFixed(2));
		}
	$("#total").html(grantTotalAmount.toFixed(2));
}

function checkoutOrder()
{
	var isChecked = false;
	var cartbodylength=$('#cartbody tr').length;
	if(cartbodylength>0)
		{
			if($(".cart-total-class").html()!=0)
				{
					isChecked = true;
				}
			
		}
	if(isChecked == true){
			/*var done = confirm("Are you sure you want to place this order ?");
			if(done)
			{*/
				$('#table-body tr').each(function(){
					$(this).children().each(function(){
							$(this).parent().find(".product-quantity").val('');
							$(this).parent().find(".total-amount").val('');
					});
			
				});
				window.location.href ="../accessoriesorder/GetClientInfoForAccessories";
				return true;
			/*}else{
				return false;
			}*/
	}else{
		//alert(cartAlerts('accessroy-place-in-cart'));
		return false;
	}
}

function cartsize()
{
	//alert();
	$.ajax({
		url : '../cart/SizeOfCart',
		type : 'POST',
		dataType : 'text',
		data : {},
		success : function(data){
				var cartsize=data.trim().split('"');
							
				if(cartsize!=0)
					{
					  
						$(".noOfCartItems").empty();
						$(".noOfCartItems").append(cartsize[1]);
					
					}
				else
					{
						$(".noOfCartItems").empty();
						$(".noOfCartItems").append(0);
					}
			
		},
		error : function(data){
		//	alert(data);
		}
	});
}