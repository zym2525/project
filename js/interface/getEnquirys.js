//询盘
function getEnquirys(token,enquiryState,currentPage,fn,isBackward){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8185/bizCenter/enquiryService/getEnquirys',
		data:{
			'accessToken':token,
			'enquiryStatus':enquiryState,
			'msgId':t+'',
			'isBackward':1,
			'schemeStatus':'',
			'enquiryTimeStart':'2010-03-10',
			'enquiryTimeEnd':'2047-03-10',
			'pageSize':pageSize,
			'currentPage':currentPage,
		},
		success:function(json){
			if(json.retCode==0000){
				console.log(eval(json.enquirys))
				var allEnquirys=eval(json.enquirys)
				fn&&fn(allEnquirys,json.num);
			}
		},
	})
}
//拿船公司
function getCarrys(fn){
	var t=new Date().getTime();
	$.ajax({
		type:'POST',
		async:false,
		url:'http://106.14.251.28:8185/bizCenter/carryService/getCarrys',
		data:{
			'accessToken':getCookie('accessToken'),
			'msgId':t+'',
		},
		success:function(json){
			if(json.retCode==0000){
				var arrCarrys=eval(json.carrys);
				fn&&fn(arrCarrys)
			}
		},
	})
}

