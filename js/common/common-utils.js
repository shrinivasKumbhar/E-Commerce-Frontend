function getXMLHttpRequestObject(){ 
	var xmlhttp;
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp){
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			xmlhttp = false;
		}
	}
	return xmlhttp;
}

function convertLengthToMeter(frameLength, unit){
	var frameLengthInMeter = 0.0;
	if(unit === "Millimeter"){
		frameLengthInMeter = frameLength/1000;
	}else if(unit === "Centimeter"){
		frameLengthInMeter = frameLength/100;
	}else if(unit === "Inch"){
		frameLengthInMeter = parseFloat(frameLength/39.3701);
	}else if(unit === "Feet"){
		frameLengthInMeter = parseFloat(frameLength/3.28084);
	}
	return frameLengthInMeter;
}

function textCounter(field,field2,maxlimit)
{
 var textLength = $(field).val().length;
 if(textLength > maxlimit){
	 $(field).val($(field).val().substring(0, maxlimit));
	 return false;
 }else{
	 $("#"+field2).html(maxlimit - textLength);
 }
}

function validateUsername(evt){
	evt = (evt) ? evt : window.event();
			var charCode = (evt.which) ? evt.which : evt.keyCode;
					if ((charCode > 31) && 
							((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)) &&
							((charCode < 48 || charCode > 57)&&(charCode!=46))&&
							(charCode!=95) && (charCode!=64)){
						return false;
					}
	return true;
}

function validateOrganizationName(evt){
	evt = (evt) ? evt : window.event();
			var charCode = (evt.which) ? evt.which : evt.keyCode;
					if ((charCode > 31) && 
							((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)) &&
							((charCode < 48 || charCode > 57)&&(charCode!=46) &&(charCode!=32))){
						return false;
					}
	return true;
} 

function validateBankName(evt){
	evt = (evt) ? evt : window.event();
			var charCode = (evt.which) ? evt.which : evt.keyCode;
					if ((charCode > 31) && 
							((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)) &&
							((charCode!=46) &&(charCode!=32))){
						return false;
					}
	return true;
} 
function validateSWIFTNumber(evt){
	evt = (evt) ? evt : window.event();
			var charCode = (evt.which) ? evt.which : evt.keyCode;
					if ((charCode > 31) && 
							((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)) &&
							((charCode < 48 || charCode > 57))){
						return false;
					}
	return true;
}

function checkNo(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57))) {
        return false;
    }
    return true;
}

function checkNumberOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57))) {
        return false;
    }
    return true;
}

function checkNotDecimalNo(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57)&&(charCode!=46))) {
        return false;
    }
    return true;
}

function checkDecimalNo(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57)&&(charCode!=46))) {
        return false;
    }
    return true;
}

 function checkMo(evt) {
     evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 &&  (!(charCode == 43) && (charCode < 48 || charCode > 57))) {
        status = "This field accepts numbers only.";
        document.get;
        return false;
    }
    status = "";
    return true; 
} 
function checkLetter(evt) {
    evt = (evt) ? evt : window.event();
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 32 && ((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)))
    {
        return false;
    }
    return true;
}

function checkLetters(evt) {
    evt = (evt) ? evt : window.event()
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 32 && ((charCode < 65 || charCode > 90)&&(charCode < 97 || charCode > 122)) && charCode!==36)
    {
        status = "This field accepts alphabets only.";
        document.get;
        return false;
    }
    status = "";
    return true;
}

function checkNumber(id){
	 var regex = /^\+?(?:[0-9].?){3,14}[0-9]$/;
		var phone = $("#"+id).val();
		    if (!regex.test(phone)) {
		    	alert("Enter Valid Number !!");
		    	$("#"+id).val('');
		    	return false;
		    }else return true;
}
function checkNumbers(id)
{
	 var regex = /^\+?(?:[0-9].?){3,14}[0-9]$/;
		var phone = $("#"+id).val();
		    if (!regex.test(phone)) {
		    	//alert("Enter Valid Number !!");
		    	$("#"+id).val('');
		    	return false;
		    }else return true;
}
function checkMobileNumber(evt) {
    evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode > 31 &&  (!(charCode == 43) &&  !(charCode == 32)  && (charCode < 48 || charCode > 57))) {
       return false;
   }
   return true; 
} 

function checkFaxNumber(evt) {
    evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode > 31 &&  (!(charCode == 32)  && (charCode < 48 || charCode > 57))) {
       return false;
   }
   return true; 
} 
function ValidateEmail(id)  
{ 
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(document.getElementById(id).value != null && document.getElementById(id).value != "")
	{
		if(document.getElementById(id).value.match(mailformat))  
		{
			return true;  
		}else  
		{  
			alert(commonAlerts('email-validation'));
			$("#" + id).val('');
			$("#flag").val("1");
			return false;  
		}
	}
}


function validateEmailId(id)  
{ 
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(document.getElementById(id).value != null && document.getElementById(id).value != "" && document.getElementById(id).value.match(mailformat)) {
		return true;  
	}else {  
		return false;  
	}
}

function validateWebsiteURL(id){
	var urlFormat = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/ |www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	if(document.getElementById(id).value != null && document.getElementById(id).value != "")
	{
		if(document.getElementById(id).value.match(urlFormat))  
		{
			return true;  
		}else  
		{  
			
			return false;  
		}
	}
	
}

/**
 * Function : Valid Fax Number which allow (+)plus,(-)dash,& space.
 * @author Sainath G.S.
 * Date: 24 April,2015.
 * @param accept any event & return true if it valid 
 * 
 */

function isValidFaxNumber(evt) {
	  evt = (evt) ? evt : window.event;
	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if (charCode > 31 && (charCode!=32) && ((charCode < 48 || charCode > 57) && (charCode!=45) && (charCode!=43))) {
	        return false;
	    }
	    return true;
} 
function toTitleCase(str) {
	return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
		return match.toUpperCase();
	});
}
function convertToTitleCase(id){
	var name= $("#"+id).val();
	//name = name.toLowerCase();
	name = toTitleCase(name);
	$("#"+id).val(name.trim());
}

function convertToTitleCaseUsingCssClass(cssClass){
	var name= $("."+cssClass).val();
	//name = name.toLowerCase();
	name = toTitleCase(name);
	$("."+cssClass).val(name.trim());
}


function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}          

function showUploadedImageInThumbnail(input,id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#'+id)
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function checkImageFormat(parts)
{
	 switch (parts.toLowerCase()) 
	    {
	    	case 'jpg':
	    	case 'gif':
	    	case 'bmp':
	    	case 'png':
	       return true;
	    }
	 return false;
}

function openHomePage(){
	window.location.href='../home/HomePage';
	return false;
}

var scrollToElement = function(el, ms){
    var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

/*
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
		$('#role-filter').val('');
		$('#filter').val('');
		$('table.demo').trigger('footable_clear_filter');
		$('.row-count').html('');
	});

	$('#role-filter').change(function(e) {
			e.preventDefault(); 
			$('table.demo').data('footable-filter').filter($('#filter').val());
	});
});
*/


function checkWhetherFirstLoginProcessPending(){
	var isFirstLogin = $("#first-login").val();
	if(isFirstLogin == 'false' || isFirstLogin == false){
		window.location.href= "../calculation/LoadFrameSelectionPage";
	}else{
		alert("Please Complete Your Profile In Order To Place An Order !!");
	}
}

function openProductActivationPage(){
	window.location.href='../userproduct/LoadProductActivationPage';
	return false;
}

function checkNum(id)
{
	var query=document.getElementById(id).value;
	if(isNaN(query))
	    {
	      // alert("Please Enter only Numbers.");
	       document.getElementById(id).value="";
	       $('#'+id).focus();
	    }
	  
}