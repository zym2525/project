$(function(){
//	var oBtn=document.getElementById('btn');
//	
//	oBtn.addEventListener('touchstart',function(){
//		
//	},false)
	var data=JSON.parse(sessionStorage.getItem('schemes'));
	setCookie('schemeCode',data.schemeCode);
	$('#details #hyfCurrency').html(arrHyfCurrency[data['feesList'][0]['currency']]);
	var oAppend=document.getElementById('append');
	for(var i=0;i<data['feesList'].length;i++){
		if(data['feesList'][i]['feeTypeNum']=='0'){
			$('#details .price').each(function(index,ele){
		    	$(ele).html($(ele).html().replace(/\{\{\w+\}\}/g,function(s){
			        s = s.substring(2, s.length-2);
			       	if(data['feesList'][i][s]){
			        	return data['feesList'][i][s];
			        }else{
			        	return '--';
			        }
			    }));
		    })
		}else{
			var oDd=document.createElement('dd');
			if(i==data['feesList'].length-1){
	    		oDd.className='clearfix cb';
	    	}else{
	    		oDd.className='clearfix';
	    	}
	    	if(data['feesList'][i]['byOrder']=='1'){
	    		oDd.innerHTML=`<span class="name fl">${data['feesList'][i]['feeTypeEname']}</span>
					<span class="val fr">${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['orderPrice']}</span>
				`;
	    	}else{
	    		oDd.innerHTML=`<span class="name fl">${data['feesList'][i]['feeTypeEname']}</span>
	    		<span class="val fr">+${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost40gp']}*<span class='num2'>0</span></span>
	    		<span class="val fr">${arrCurrency[data['feesList'][i]['currency']]}${data['feesList'][i]['cost20gp']}*<span class='num1'>0</span></span>
	    		`;
	    		if(data['feesList'][i]['cost20gp']){
	    			$(oDd).find('.num1').text('1')
	    		}
	    		if(data['feesList'][i]['cost40gp']){
	    			$(oDd).find('.num2').text('1')
	    		}
//	    		var total=Number(data['feesList'][i]['cost20gp'])*Number($(oDd).find('.num1').text())+Number(data['feesList'][i]['cost40gp'])*Number($(oDd).find('.num2').text())
//	    		oDd.innerHTML+=`=${total}`;
	    	}
			oAppend.appendChild(oDd);
		}
	}
	
	$('#details .wrap').html($('#details .wrap').html().replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        if(s=='potName'){
        	if(data[s]){
        		return data[s];
        	}else{
        		return '无';
        	}
        }else{
        	return data[s];
        }
        
    }));
    $('#details #tel').on('touchstart',function(){
		telPhone($('#details #tel').html());
	});
    $('#details #btn').on('touchstart',function(){
//		open('interface.html');
		window.history.go(-2);
	});
	$('#details .arrow').on('touchstart',function(){
		$('#details .arrow').css('pointer-events','none');
    	setTimeout(function(){$('#details .arrow').css('pointer-events','all')},350);
		window.history.back();
	})
})