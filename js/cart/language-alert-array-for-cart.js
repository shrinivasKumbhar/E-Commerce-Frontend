function cartAlerts(msgkey)
{
	//alert(msgkey);
	var lang = $("#languagecodeId").val();
	var lg=new Array();
	//var please = {en:"Please", nl:"Plsjeblieft"};
	//var tryAgain = {en: "Try Agian", nl: "En Probeer Opnieuw"};
	lg['en']=new Array();
	lg['nl']=new Array();

	//Accessroy View
	//Call From ../jqueryscript/add-accesory-to-cart.js file
	lg['en']['add-product-to-cart']='Please Enter Product Quantity To Buy This Product, Try Again';
	lg['nl']['add-product-to-cart']='Vul Goederen hoeveelheid om dit product te kopen, Try Again';
	
	//
	lg['en']['accessroy-added-successfuly-to-cart']='Accessory Added To Cart Successfully !';
	lg['nl']['accessroy-added-successfuly-to-cart']='Accessoire Successully aan het kar toegevoegd !';
	
	lg['en']['accessroy-place-in-cart']='Please Add Accessories To Cart In Order To Place An Order !';
	lg['nl']['accessroy-place-in-cart']='Gelieve Voeg Accessoires winkelwagen Om een bestelling plaatst !';
	
	lg['en']['accessroy-order-confirm']='Are you sure you want to place this order?';
	lg['nl']['accessroy-order-confirm']='Weet u zeker dat u deze bestelling te plaatsen?';
	
 
	return lg[lang][msgkey];
}