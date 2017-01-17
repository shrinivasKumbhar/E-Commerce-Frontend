var selected_subcribtion_value="";
var login_user="";
$(document).ready(function(){

//var method_url = base_url+""+get_packages_url;
//var response = makeAjaxRequestGetMethod(method_url,"GET");
$.ajax({
		url : 'http://192.168.0.107:3005/api/v1/packages/get-packages',
		type : 'GET',
		success : function(data){
			for(var i=0;i<data.length;i++){
				var mainPackageData = [];
				mainPackageData = data[i].packages;
				console.log("pack_id :"+data[i].pack_id)
				var options="";
				for(var j=0;j<mainPackageData.length;j++){
					console.log("package_id :"+mainPackageData[j].package_id);
					options +="<option value='"+mainPackageData[j].package_id+"'>"+mainPackageData[j].days+" days Rs."+mainPackageData[j].price+"/>";
				}
				
				
				$(".subscribtion"+i).append(options);
			}
			
			return data;
		},
		error : function(data){
		//	alert(data);
		}
	});
	
//console.log("Data:"+response);
// [
  // {
    // "pack_id": 1,
    // "pack_name": "SMALL PACK",
    // "packages": [
      // {
        // "package_id": 1,
        // "pack_id": 1,
        // "days": "3",
        // "price": 159
      // },
      // {
        // "package_id": 2,
        // "pack_id": 1,
        // "days": "6",
        // "price": 299
      // }
    // ]
  // },
  // {
    // "pack_id": 2,
    // "pack_name": "MEDIUM PACK",
    // "packages": [
      // {
        // "package_id": 3,
        // "pack_id": 2,
        // "days": "3",
        // "price": 299
      // },
      // {
        // "package_id": 4,
        // "pack_id": 2,
        // "days": "6",
        // "price": 579
      // }
    // ]
  // }
// ]

	//alert();
	localStorage.setItem("username","");
	 login_user = localStorage.getItem("username");
	//alert("User Name :"+login_user);
	if(login_user=='null' || login_user==null || login_user==""){
		$(".user-setting-list").addClass("hidden");
		$(".user-setting-list").hide();
	}else{
		$(".user-setting-list").removeClass("hidden");
		$(".user-setting-list").show();
	}
	
		$(".combo-subscribe").click(function(event){
			if(login_user=='null' || login_user==null || login_user==""){
				var id = $(this).attr("class");
				var panel_div_class = $(this).parents("div").parents("div").attr("class");
				
				 selected_subcribtion_value =$("."+panel_div_class).find(".subscribtion").val();
				//	alert("selected_subcribtion" +selected_subcribtion_value);
					loginDiv();
			}
			
		});
		$(".user-login-menu").click(function(event){
			loginDiv();
		});
		
		$(".user-sign-up-menu").click(function(evt){
			signUpDiv();
		});
		
		$(".user-signup").click(function(event){
			var flag=true;
			var user_mobile_number = $(".sign-up-mobile-number").val();
			var user_email_id = $(".sign-up-email").val();
			var user_password = $(".sign-up-password").val();
			
			if(user_password==null || user_password==""){
				$(".errorMessage").text("Please Enter password.");
				$(".errorMessage").css("color","red");
				flag=false;
			}
			
			
			if(user_mobile_number==null || user_mobile_number=="" || user_mobile_number.length<10){
				$(".errorMessage").text("Invalid mobile number.");
				$(".errorMessage").css("color","red");
				flag=false;
			}
			
			if(validateEmailId("sign-up-email")==false){
				$(".errorMessage").text("Invalid email address.");
				$(".errorMessage").css("color","red");
				flag=false;
			}
			if(flag) {
				var userSignUpData = {"user_mobile_number":user_mobile_number,"user_email_id":user_email_id,"user_password":user_password};
				var jsonString = JSON.stringify(userSignUpData);
				var method_url = base_url+""+user_login_url;
				var response = makeAjaxRequest(method_url,"POST",jsonString);
				$('.user-sign-up-modal').modal('hide');
				var result_type = response.success;
				if(result_type){
					$('.user-sign-up-modal').modal('hide');
				}
			}
			
					
		});
		
		$(".sign-up-mobile-number").keyup(function(evt){
			var result = checkMobileNumber(evt);
			if (result!=true) {
		    	$(".sign-up-mobile-number").val('');
		     }
		});
});

function  loginValidation(ths){
	//var id = $(ths)[0].id;
	//alert(selected_subcribtion_value+" "+login_user);
	
	var username=$("#username").val();
	var password=$("#password").val();
	var userLoginData = {"username":username,"password":password};
	var jsonString = JSON.stringify(userLoginData);
	var method_url = base_url+""+user_login_url;
	var response = makeAjaxRequest(method_url,"POST",jsonString);
	localStorage.setItem("selected_subcribtion_value",selected_subcribtion_value);
	
}

function loginDiv(){
	$('.loginModal').modal('show');
			$(".loginDiv").show();
			$(".signUpDiv").hide();
}
function signUpDiv(){
	$('.loginModal').modal('show');
			$(".errorMessage").text("");
			$(".loginDiv").hide();
			$(".signUpDiv").show();
}




