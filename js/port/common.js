//后退
$('.comeback').on('touchstart',function(){
	window.history.back();
	removeCookie('local');
})

$(function(){
	//设置全部港口
//	var num=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	(function(){
//		var str='';
		var allPorts=eval(sessionStorage.getItem('ports'));
		var allPortsSort={'A':[],'B':[],'C':[],'D':[],'E':[],'F':[],
			'G':[],'H':[],'I':[],'J':[],'K':[],'L':[],'M':[],'N':[],
			'O':[],'P':[],'Q':[],'R':[],'S':[],'T':[],'U':[],'V':[],'W':[],'X':[],'Y':[],'Z':[]};
		for(var i=0;i<allPorts.length;i++){
			var s=allPorts[i]['portName'].toUpperCase().charAt(0);
			allPortsSort[s].push(allPorts[i]);
		}
			var oEnterances2=$('#port .enterances2')[0];
			for(var key in allPortsSort){
				var oDl=document.createElement('dl');
				oDl.className='block2';
				oDl.id='port'+key;
				oDl.innerHTML=`<dt><span>${key}</span></dt>`;
				oEnterances2.appendChild(oDl);
				for(var i=0;i<allPortsSort[key].length;i++){
					var oDd=document.createElement('dd');
//					str+=allPortsSort[key][i]['portName'].replace(/\s+/g,'')+'|';
					allPortsSort[key][i]['portCName']=allPortsSort[key][i]['portCname'].replace(/^\s+|\s+$/g,'');
					oDd.innerHTML=`<span id=${allPortsSort[key][i]['portCode'].replace(/\s+/g,'')} code=${allPortsSort[key][i]['portCode']}>${allPortsSort[key][i]['portName']} (${allPortsSort[key][i]['portCName']})</span>`;
					oDl.appendChild(oDd);
				}
				if(oDl.getElementsByTagName('dd')[oDl.getElementsByTagName('dd').length-1]){
					oDl.getElementsByTagName('dd')[oDl.getElementsByTagName('dd').length-1].className='cb';
				};
			}
			$('dd').each(function(index,ele){
				isClick($(ele),function(ele){
					setCookie('port',ele.text().split('(')[0]);
		    		setCookie('code',ele.find('span').attr('code'));
		    		var port=getCookie('port')||'DUBAI';
					$('#interface #pod').html(port);
					$('#interface #pod').attr('code',getCookie('code')||'AEDUB');
		    		window.history.back();
				})
			})
		//设置热门港口
		var hotPortsSort={};
		getHotPorts(getCookie('accessToken'),function(data){
			for(var i=0;i<data.length;i++){
				if(!hotPortsSort[data[i]['shippingLineCname']]){
					hotPortsSort[data[i]['shippingLineCname']]=[];
				}
				hotPortsSort[data[i]['shippingLineCname']].push(data[i]);
			}
		})
		$('#hotLine').html('');
		$('#hotContent').html('');
		for(var key in hotPortsSort){
			var oDiv=$('<div></div>');
			oDiv.addClass('header');
			$('#hotLine').append(oDiv.html(key));
			var oUl=$('<ul></ul>');
			oUl.addClass('country');
			for(var i=0;i<hotPortsSort[key].length;i++){
				var oLi=$('<li></li>');
				if(i==hotPortsSort[key].length-1){
					oLi.addClass('cb');
				}
				oLi.html(`${hotPortsSort[key][i]['portName']}(${hotPortsSort[key][i]['portCname'].replace(/^\s+|\s+$/g,'')})`);
				oLi.attr('code',hotPortsSort[key][i]['portCode']);
				isClick(oLi,function(ele){
					setCookie('port',ele.text().split('(')[0]);
		    		setCookie('code',ele.attr('code'));
		    		var port=getCookie('port')||'DUBAI';
					$('#interface #pod').html(port);
					$('#interface #pod').attr('code',getCookie('code')||'AEDUB');
		    		open(getCookie('local'));
				})
				oUl.append(oLi);
			}
			$('#hotContent').append(oUl);
		}
		$($('#hotLine').children()[0]).addClass('active');
		$($('#hotContent').children()[0]).show();
		var aHeader2=$('#tab .header')
		var aContent2=$('#tab ul')
		aHeader2.on('touchstart',function(){
			aHeader2.removeClass('active');
			aContent2.hide();
			$(this).addClass('active');
			aContent2.eq($(this).index()).show();
		})
		
		$('#port .sidebar a').each(function(index,ele){
				$(ele).on('touchstart',function(){
					var scrollT=$('#port'+$(ele).text()).position().top;
					$('#port .enterances2').scrollTop($('#port .enterances2').scrollTop()+scrollT)
				})
			})
		
		var timer=null;
		$('#text input').on('keyup',function(){
			clearTimeout(timer);
			timer=setTimeout(function(){
				fuzzySearch(getCookie('accessToken'),$('#text input').val(),function(id){
					if(document.getElementById(id)){
						document.getElementById(id).scrollIntoView();
					}
				})
			},300)
		})
	})()
});
