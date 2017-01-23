// js by zhaobo 2017-01-16 QQ405540984
// 如何在一个网站或者一个页面，去书写你的JS代码
// 1.js的分层（功能性的）：jquery(tools)  UI   应用app,  MVC
// 2.JS的规划（管理）:避免全局变量和方法，模块化（seaJs,requireJs）


window.onload = function(){
	first.app.toTip();
	first.app.toBanner();
}
var first={}  //命名

first.tools={}

first.ui={}

first.app={}

first.ui.textClear=function(obj,str){
	// 触发选中
	obj.onfocus = function(){
		if (this.value == str) {
			this.value = '';
		}
	};
	// 不触发
	obj.onblur = function(){
		if (this.value == '') {
			this.value = str;
		}
	};
}
// 占位文字
first.app.toTip= function(){
	var oText1 = document.getElementById('text1');
	var oText2 = document.getElementById('text2');

	first.ui.textClear(oText1,'Search website');
	first.ui.textClear(oText2,'Search website');
}

// 伪装轮播图
first.app.toBanner= function(){
	var oAD = document.getElementById('ad');
	var oLi = oAD.getElementsByTagName('li');
	var oPrevBg = first.tools.getByClass(oAD,'prev_bg')[0];
	var oNextBg = first.tools.getByClass(oAD,'next_bg')[0];

	// 获取a
	var oPrev = first.tools.getByClass(oAD,'prev')[0];
	var oNext = first.tools.getByClass(oAD,'next')[0];
	// 标识
	var iNow = 0;
	// 定时器
	var timer = setInterval(auto,3000);
	
	function auto(){
		if (iNow == oLi.length-1) {
			iNow = 0;
		}else{
			iNow++;
		};
		// 淡出
		for (var i = 0; i < oLi.length; i++) {
			first.ui.fadeOut(oLi[i]);
		};
		first.ui.fadeIn(oLi[iNow]);
	}
	function autoPrev(){
		
		if(iNow == 0){
			iNow = oLi.length-1;
		}
		else{
			iNow--;
		}
		
		for(var i=0;i<oLi.length;i++){
			first.ui.fadeOut(oLi[i]);
		}

		first.ui.fadeIn(oLi[iNow]);
	}
	//鼠标移动左侧显示
	oPrevBg.onmouseover = oPrev.onmouseover = function(){
		oPrev.style.display = 'block';
		clearInterval(timer);
	};
	//鼠标移动右侧显示
	oNextBg.onmouseover = oNext.onmouseover = function(){
		oNext.style.display = 'block';
		//清除定时器
		clearInterval(timer);
	};
	//鼠标移出左侧消失
	oPrevBg.onmouseout = oPrev.onmouseout= function(){
		oPrev.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	//鼠标移出右侧消失
	oNextBg.onmouseout =  oNext.onmouseout= function(){
		oNext.style.display = 'none';
		timer = setInterval(auto,3000);
	};
	// 点击事件
	oPrev.onclick = function(){
		autoPrev();

	};
	oNext.onclick =function(){
		auto();
	};
}

// 淡入
first.ui.fadeIn = function(obj){
	var value = 0;
	// 清定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}else{
			value += isSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		};
	},30);
}
// 淡出
first.ui.fadeOut = function(obj){
	var value = 100;
		// 清定时器
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var isSpeed = -5;
			if(value == 0){
				clearInterval(obj.timer);
			}else{
				value += isSpeed;
				obj.style.opacity = value/100;
				obj.style.filter = 'alpha(opacity='+value+')';
			};
	},30);
}

//鼠标移动
first.tools.getByClass = function(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == sClass){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};








