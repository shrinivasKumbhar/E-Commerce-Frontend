function makeAjaxRequest(url,method_type,jParams){
	console.log('Base Url :'+url+' Method Type :'+method_type+' Json Param :'+jParams);
	$.ajax({
		url : url,
		type : method_type,
		dataType : 'Application/json',
		data : {jParams},
		success : function(data){
			return data;
		},
		error : function(data){
		//	alert(data);
		}
	});
}

function makeAjaxRequestGetMethod(url,method_type){
	console.log('Base Url :'+url+' Method Type :'+method_type);
	$.ajax({
		url : 'http://192.168.0.107:3005/api/v1/packages/get-packages',
		type : 'GET',
		success : function(data){
			alert(data[0].pack_id);
			return data;
		},
		error : function(data){
		//	alert(data);
		}
	});
}