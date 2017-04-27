$(function(){
	$(document).on("pagebeforeshow","#price",function(){
		if(sessionStorage.getItem('scrollT')){
			setBasicSchemes(eval(sessionStorage.getItem('currentData')))
			$('#price .content').scrollTop(sessionStorage.getItem('scrollT'));
		}else{
			getBasicSchemes(iNum,setBasicSchemes);
		}
		$('#price .content').on('scroll',function(){
			if(($(this)[0].scrollHeight-50)<=($(this).height()+$(this).scrollTop())){
				iNum+=1;
				getBasicSchemes(iNum,setBasicSchemes);
				$('#price .content').scrollTop($('#price .content').scrollTop()+50)
			}
		})
	})
	$(document).on("pageshow","#interface",function(){
//		currentDataPrice=[];
//		arrSection=[];
		$('#price').remove();
	})
	
})
function setBasicSchemes(data){
	for(var i=0;i<data.length;i++){
		currentDataPrice.push(data[i]);
		var oSection=templateSchemes('tplE',data[i]);
		arrSection.push(oSection);
	}
	putBasicSchemes();
}
function putBasicSchemes(){
	var oContent=document.getElementById('contentPrice');
	oContent.innerHTML='';
	for(var i=0;i<arrSection.length;i++){
		oContent.appendChild(arrSection[i]);
	}
}
//正常询盘
function templateSchemes(id,json){
//	var oTmp=document.getElementById(id);
//  var oSection = oTmp.cloneNode(true);
	var oSection=document.createElement('section');
	oSection.innerHTML='<ul class="top"><li><i class="icon1"></i><div class="ship" localeString="field1">船公司：</div><span>{{carryCode}}</span></li><li><i class="icon2"></i><div localeString="field2">有效期：</div><span>{{expireDate}}</span></li></ul><ul class="destination"><li class="start_box"><div class="start"><img src="../img/start.png" alt="start"/><span localeString="field3">起运港</span></div><div class="name">{{polName}}</div></li><li class="icon"><img src="../img/ship_main.png" alt="ship_main"/><img src="../img/arrow.png" alt="arrow"/></li><li class="end_box"><div class="end"><img src="../img/finish.png" alt="finish"/><span localeString="field4">目的港</span></div><div class="name">{{podName}}</div></li></ul><ul class="time"><li><div localeString="field5">船程：</div><span>{{sailingDay}}</span></li><li><div localeString="field6">开船：</div><span>{{etd}}</span></li><li><div localeString="field7">截关：</div><span>{{customsClearance}}</span></li></ul><ul class="price cback"><li><span>20GP</span><span class="number">{{cost20gp}}</span></li><li><span>40GP</span><span class="number">{{cost40gp}}</span></li><li><span>40HQ</span><span class="number">{{cost40hq}}</span></li><li><span>45HC</span><span class="number">{{cost45hc}}</span></li></ul>';
    var aNum=oSection.getElementsByClassName('number');
//  oSection.removeAttribute('id');
    oSection.className='container';
    for(var i=0;i<json['feesList'].length;i++){
    	if(json['feesList'][i]['feeTypeNum']=='0'){
    		for(var j=0;j<aNum.length;j++){
		    	aNum[j].innerHTML=aNum[j].innerHTML.replace(/\{\{\w+\}\}/g,function(s){
			        s = s.substring(2, s.length-2);
			        if(json['feesList'][i][s]){
			        	return json['feesList'][i][s];
			        }else{
			        	return '--';
			        }
			    });   
		    }
    		oSection.setAttribute('cost20gp',json['feesList'][i]['cost20gp']||'0');
    	}
    }
    
    oSection.innerHTML=oSection.innerHTML.replace(/\{\{\w+\}\}/g,function(s){
        s = s.substring(2, s.length-2);
        return json[s];
    });
//  oSection.setAttribute('Cost20gp',ofeesList['fees'][0]['cost20gp']);
    oSection.setAttribute('sailingDay',parseFloat(json['sailingDay']));
    oSection.setAttribute('customsClearance',json['customsClearance']);
    isClick($(oSection),function(){
    	sessionStorage.setItem('currentData',JSON.stringify(currentData));
    	sessionStorage.setItem('scrollT',$('.content').scrollTop())
    	sessionStorage.setItem('schemes',JSON.stringify(json));
    	open('Freight-details.html');
    })
    return oSection;
}
