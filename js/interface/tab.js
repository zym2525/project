(function(){
	init();
	$('footer div').on('touchstart',function(){
		setCookie('currentCount',$(this).index(),28);
		init();
	})
	function init(){
		$('#interface footer div').removeClass('active');
		$('#interface .enterances').hide();
		$('#interface .header').hide();
		$('#interface footer div').eq(getCookie('currentCount')||0).addClass('active');
		$('#interface .enterances').eq(getCookie('currentCount')||0).show();
		$('#interface .header').eq(getCookie('currentCount')||0).show();
	}
})()
