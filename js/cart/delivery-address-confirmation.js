$(document).ready(function(){
$("#alternateAddressId").hide();

$("#agreeId").click(function(){
	$("#pickupId").attr('checked', true);
	$('#PickupModal').foundation('reveal', 'close');
	
});
$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
	//alert();
	$("#pickupId").attr('checked', true);
	});

$("#pickupId").click(function(){
	var	done=$("#pickupId").is(":checked");
			if(done)
			{
				$("#checkboxid").hide();
				$(".address").hide();
			}
	});
$("#deliveryId").click(function(){
	var	done=$("#deliveryId").is(":checked");
			if(done)
			{
				$("#checkboxid").show();
				$(".address").show();
				$("#orderDate").val("");
			}
	});


	$("#alternate-address").click(function(){
	var	done=$("#alternate-address").is(":checked");
			if(done)
			{
				$("#alternateAddressId").show();
				$("#streetAddressLine1").val("");
				$("#streetAddressLine2").val("");
				$("#zipcode").val("");
			}
			else
			{
				$("#alternateAddressId").hide();
			}
	});
	
	/*	$('input').iCheck({
		    checkboxClass: 'icheckbox_flat-orange',
		    radioClass: 'iradio_flat-orange'
		});*/
	   var orderDate=$("#orderDateId").val();
	    $("#orderDate").datepicker({
	        numberOfMonths: 1,
	        changeMonth: true,
	        dateFormat: 'dd-mm-yy',
	        changeYear: true,
	        minDate: orderDate,
	        firstDay: 1,
	       // defaultDate: orderDate,
	        beforeShowDay: unavailable
	    });
  
});



function checkPickup(id)
{	
	//alert("Id="+id);
	$("#userTexTileDivId").hide();
	$("#texTileDivId").hide();
	$("address").hide();
	$("#orderDate").val("Not Selected");
	
	
}
function checkDelivery(id){
	

		$("#userTexTileDivId").show();
	
	
}


function unavailable(date) {
		var hdays = $("#allHolidaysId").val();
		var unavailableDates = hdays.split("~`");
		var notWorkingDaysId = $("#notWorkingDaysId").val();
		var weekday= notWorkingDaysId.split("~`");
			  
		 dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
		 var dayOfWeek = weekday[date.getUTCDay()];
		 var day = date.getDay();
		 var i=0;
		 for(i=0;i<weekday.length;i++)
		 {
		   var dayOfWeek = weekday[i];	 
		   if ($.inArray(dmy, unavailableDates) == -1)
			   {  
			   		if(day==1 && dayOfWeek!='Monday')
			   		{
				   		return [true, "Available"];
			   		}
			   		else if(day==2 && dayOfWeek!='Tuesday')
			   		{
				   		return [true, "Available"];
			   		}
				   else if(day==3 && dayOfWeek!='Wednesday')
				   {
				   		return [true, "Available"];
				   }
				   else if(day==4 && dayOfWeek!='Thursday')
				   {
				   		return [true, "Available"];
				   }
				   else if(day==5 && dayOfWeek!='Friday')
				   {
				   		return [true, "Available"];
				   }
				   else if(day==6 && dayOfWeek!='Saturday')
				   {
				   		return [true, "Available"];
				   }
				   else if(day==7 && dayOfWeek!='Sunday')
				   {
				   		return [true, "Available"];
				   }
				   else
			        {
			        	return [false,"","Not Available"];
			        }
		    }
		    else
		    {
		      return [false,"","Not Available"];
		    }
		 } 
}

