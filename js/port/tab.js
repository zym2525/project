(function(){
	var aHeader1=$('#port .header_box>.header')
	var aContent1=$('#port .enterances')
	aHeader1.on('touchstart',function(){
		aHeader1.removeClass('active');
		aContent1.hide();
		$(this).addClass('active');
		aContent1.eq($(this).index()).show();
	})
})()
