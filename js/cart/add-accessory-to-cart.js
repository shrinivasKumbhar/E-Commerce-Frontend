var accessorylistsize = 0;
var currencyRateWrtUsd = 0;
$(function() {
			$('table.demo').footable({		bookmarkable : {		enabled : true 	}}) .bind({
					'footable_filtering' : function(e) {
						var selected = $('#role-filter').find(':selected').text();
						if (selected && selected.length > 0 && selected != "Select") {
							e.filter += (e.filter && e.filter.length > 0) ? ' ' 	+ selected	: selected;
							e.clear = !e.filter;
						}
					},
					'footable_filtered' : function() {
						var count = $('table.demo tbody tr:not(.footable-filtered)').length;
						$('.row-count').html(count + ' rows found');
					}
			});

			$('.clear-filter').click(function(e) {
				e.preventDefault();
				$('#filter').val('');
				$('table.demo').trigger('footable_clear_filter');
				$('.row-count').html('');
			});

		});

function kill(event)
{
    event.preventDefault();
    event.stopPropagation();
    return false;
}

$(document).ready(function(){
	displayLoad();
	$('body').bind('mousewheel', kill); // Lock Wheel
});

$(window).load(function(){
	loadData();
	removeLoader();
	$('body').unbind('mousewheel'); // Unlock Wheel
});
var flag=0;
function loadData(){
	
	var accessories = [];
	$.ajax({
		url : '../cart/LoadCartData',
		type : 'POST',
		dataType : 'json',
		data : {},
		success : function(result){
			if(result.length != 0){
				accessories= JSON.parse(result.trim());
				if(accessories.length != 0)
				{
					for(var i=0;i<accessories.length;i++) {
						var cost = accessories[i]['cost'];
						var quantity = accessories[i]['quantity'];
						var mProductName = accessories[i]['mProductName'];
						var totalAmountOfAccessory = accessories[i]['totalAmount'];
						$('#table-body tr').each(function(){
							if($(this).children().find(".product-name").val().trim() === mProductName.trim()){// && $(this).children().find(".product-cost").val().trim() === cost.trim()
								$(this).children().find(".add-to-cart").val("Remove From Cart");
								$(this).children().find(".add-to-cart").addClass("alert");
								$(this).children().find(".add-to-cart").hide();
								$(this).children().find(".remove-from-cart-button").show();
								$(this).children().find('.add-product-to-cart').prop("checked", true);
								$(this).children().find(".product-quantity").val(quantity);
								$(this).children().find(".total-amount").val(totalAmountOfAccessory);
								return false;
							}
						});
						$("#noOfCartItems").empty();
						$("#noOfCartItems").append(i+1);
					}
				}
				else
					{
					    if(flag==0)
					    	{
					    		loadData();
					    		flag=1;
					    	}
					    $("#noOfCartItems").empty();
						$("#noOfCartItems").append(0);
					}
			}
		},
		error : function(data){
			alert(data);
		}
	});
				
}

$(function() {
	convertRateInLinkedToUserPrice();
	$('.add-to-cart').click(function() {
		var itemVal = $(this).val();
		var btnId=$(this).attr("id");
		var id = btnId.split("addCartItem");
		var itemId=id[1];
		if(itemVal=="Add To Cart"){
			$("#"+btnId).val("Remove From Cart");
			$("#"+btnId).addClass("alert");
			$("#"+btnId).hide();
			$("#remove-from-cart-"+itemId).show();
			var productName = $("#productName"+itemId).val();
			var productQuantity =  $("#productQuantity"+itemId).val();
			var totalAmount =  $("#totalAmount"+itemId).val();
			var productid =  $("#p"+itemId).val();
			var itemRate = $("#pircePerMeter"+itemId).val();
			//alert(productid)
			if((productQuantity == null || productQuantity == "" || productQuantity== 0 ) && (totalAmount == null || totalAmount == "" || totalAmount== 0)){
				$("#"+btnId).val("Add To Cart");
				$("#remove-from-cart-"+itemId).hide();
				$("#addCartItem"+itemId).show();
				$("#addCartItem"+itemId).css("background-color", "#43ac6a");
				alert(cartAlerts("add-product-to-cart"));
			}else{
				$.ajax({
					url : '../cart/AddAccessoryToCart',
					type : 'POST',
					dataType : 'json',
					data : { productName : productName, productQuantity : productQuantity, totalAmount : totalAmount, productid : productid, itemRate : itemRate},
					success : function(data){
						calculateCartSize();
						var  returnData = data.trim().split(" !");
						alert(cartAlerts("accessroy-added-successfuly-to-cart"));
					},
					error : function(data){
						alert(data);
					}
				});
			}
		}else{
			var productName = $("#productName"+itemId).val();
			$("#"+btnId).val("Add To Cart");
			$("#"+btnId).removeClass("alert");
			$("#"+btnId).addClass("success");
			$(this).parent().parent().find('.add-product-to-cart').prop("checked", false);
			$.ajax({
				url : '../cart/DeleteAccessoryFromCart',
				type : 'POST',
				dataType : 'json',
				data : { productName : productName},
				success : function(data){
					var  returnData = data.trim().split(" !");
					var rd =returnData[1].trim();
					if(rd==null || rd=="" || rd==" " || rd=="null")
					{
							cartsize();
					}
					else
					{
							cartsize();
					}
					alert(returnData[0] + " !");
				},
				error : function(data){
					alert(data);
				}
			});
			//$(this).parent().parent().find('#productQuantity'+btnId).val('');
			$(this).parent().parent().find('td > input.totalAmount').val('');
		}
	});

	
	$('.remove-from-cart-button').click(function(){
		var btnId=$(this).attr("id");
		var id = btnId.split("remove-from-cart-");
		var itemId=id[1];
		var productName = $("#productName"+itemId).val();
		$("#"+btnId).val("Add To Cart");
		$("#"+btnId).removeClass("alert");
		$("#"+btnId).addClass("success");
		$(this).parent().parent().find('.add-product-to-cart').prop("checked", false);
		$.ajax({
			url : '../cart/DeleteAccessoryFromCart',
			type : 'POST',
			dataType : 'json',
			data : { productName : productName},
			success : function(data){
				var  returnData = data.trim().split(" !");
				var rd =returnData[1].trim();
				if(rd==null || rd=="" || rd==" " || rd=="null")
				{
					cartsize();
				}
				else
				{
					cartsize();
				}
				alert(returnData[0] + " !");
			},
			error : function(data){
				alert(data);
			}
		});
		//$(this).parent().parent().find('#productQuantity'+btnId).val('');
		$(this).parent().parent().find('td > input.totalAmount').val('');
	});
	
	$('.product-quantity').change(function(){

		//if($(this).parent().parent().find('.add-product-to-cart').is(':checked') ){
			var quantity = $(this).val();
			var totalAmount = $(this).parent().parent().find('.total-amount').val();
			var name = $(this).parent().parent().find(".product-name").val();
			$.ajax({
				url : '../cart/EditCart',
				type : 'POST',
				dataType : 'json',
				data : { productName : name, productQuantity : quantity, totalAmount : totalAmount},
				success : function(data){
				//	alert("Alter While Change Qty");
					cartsize();
				},
				error : function(data){
					cartsize();
					alert(data);
				}
			});
		//}
	});

	$("#cancel").on('click',function(){
		$('#table-body tr').each(function(){
			$(this).children().each(function(){
				//if($(this).find('.add-product-to-cart').is(':checked') ){
					$(this).parent().find('.add-product-to-cart').prop("checked", false);
					$(this).parent().find(".product-quantity").val('');
					$(this).parent().find(".total-amount").val('');
				//}
			});
		});
		location.href = '../cart/EmptyCart';
	});
});

function productcostMultiplyQuantity(id) {
	var itemId= id.substring(15);
	var cost= $("#pircePerMeter"+itemId).val();
	var qty= $("#productQuantity"+itemId).val();
	var total = cost * qty;
	$("#totalAmount"+itemId).val(total.toFixed(2));
//	$(itemId).parent().next().find(".total-amount").val(parseFloat(total));
	
	var productName = $("#productName"+itemId).val();
	var productQuantity =  $("#productQuantity"+itemId).val();
	var totalAmount =  $("#totalAmount"+itemId).val();
	var productid =  $("#p"+itemId).val();
	if((productQuantity == null || productQuantity == "" || productQuantity== 0 ) && (totalAmount == null || totalAmount == "" || totalAmount== 0)){
			$("#addCartItem"+itemId).val("Add To Cart");
			$("#remove-from-cart-"+itemId).hide();
			$("#addCartItem"+itemId).show();
			$("#addCartItem"+itemId).css("background-color", "#43ac6a");
	}
};

function validateData()
{
		var isChecked = false;
		var cartbodylength=$("#noOfCartItems").html();
		if(parseInt(cartbodylength)>parseInt(0))
			{
				isChecked = true;
			}
		if(isChecked == true){
				var done = confirm(cartAlerts('accessroy-order-confirm'));
				if(done)
				{
					$('#table-body tr').each(function(){
						$(this).children().each(function(){
							//if($(this).find('.add-product-to-cart').is(':checked') ){
							//	$(this).parent().find('.add-product-to-cart').prop("checked", false);
								$(this).parent().find(".product-quantity").val('');
								$(this).parent().find(".total-amount").val('');
							//}
						});
				
					});
					return true;
				}else{
					return false;
				}
		}else{
			alert(cartAlerts('accessroy-place-in-cart'));
			return false;
		}
}

function checkNum(id)
{
	var query=document.getElementById(id).value;
	if(isNaN(query) || query=="0")
	    {
	      // alert("Please Enter only Numbers.");
	       document.getElementById(id).value="";
	       $('#'+id).focus();
	    }
	  
}

function calculateCartSize()
{
//	alert("call fun");
	$.ajax({
		url : '../cart/SizeOfCart',
		type : 'POST',
		dataType : 'text',
		data : {},
		success : function(data){
				var cartsize=data.trim().split('"');
				
			//	alert(cartsize+" "+cartsize[1]);
				if(cartsize[1]!=0)
					{
						$("#noOfCartItems").empty();
						$("#noOfCartItems").append(cartsize);
					}
				else
					{
						$("#noOfCartItems").empty();
						$("#noOfCartItems").append(0);
					}
			
		},
		error : function(data){
			alert(data);
		}
	});
}

function cartsize()
{
	alert();
	$.ajax({
		url : '../cart/SizeOfCart',
		type : 'POST',
		dataType : 'text',
		data : {},
		success : function(data){
				var cartsize=data.trim().split('"');
				
			//	alert(cartsize+" "+cartsize[1]);
				if(cartsize[1]!=0)
					{
						$("#noOfCartItems").empty();
						$("#noOfCartItems").append(cartsize);
					}
				else
					{
						$("#noOfCartItems").empty();
						$("#noOfCartItems").append(0);
					}
			
		},
		error : function(data){
			alert(data);
		}
	});
}	

function convertRateInLinkedToUserPrice()
{
	accessorylistsize = $("#accessorylistsizeId").val();
	currencyRateWrtUsd = $("#currencyRateWrtUsdId").val();
	//alert(accessorylistsize);
	for(var i=1;i<=accessorylistsize;i++)
		{
			$("#fixedSellingPriceForView"+i).html(($("#pircePerMeter"+i).val()*currencyRateWrtUsd).toFixed(2));
			$("#pircePerMeter"+i).val($("#fixedSellingPriceForView"+i).text());
		}
	
	//pircePerMeter3
//	
}