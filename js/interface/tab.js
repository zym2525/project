(function(){
	init();
	$('footer div').on('touchstart',function(){
		setCookie('currentCount',$(this).index(),28);
		init();
	})
	function init(){
		$('footer div').removeClass('active');
		$('.enterances').hide();
		$('.header').hide();
		$('footer div').eq(getCookie('currentCount')||0).addClass('active');
		$('.enterances').eq(getCookie('currentCount')||0).show();
		$('.header').eq(getCookie('currentCount')||0).show();
	}
})()
