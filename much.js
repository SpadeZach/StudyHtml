//1.谁动  2.方向 3.速度 4.目的距离5. 回调函数
function doMove(obj, attr, dir, garget, endFn ){

	dir = parseInt(getStyle( obj, attr )) < garget ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		
		if ( speed > garget && dir > 0 ||  speed < garget && dir < 0  ) {
			speed = garget;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == garget ) {
			clearInterval( obj.timer );
			
			/*
			if ( endFn ) {
				endFn();
			}
			*/
			endFn && endFn();
			
		}
	},30)
}
//抖动
function shake(obj,attr,endFn){
	//有隐患
	var oImgX = parseInt(getStyle(obj,attr));
	var num = 0;
	var arr = [];
	for (var i = 20; i > 0; i-=2) {
		arr.push(i,-i);
	}
	arr.push(0);
	clearInterval(obj.shakeTimer);
	obj.shakeTimer = setInterval(function(){
		obj.style[attr] = oImgX + arr[num] + 'px';
		num++;
		if (num == arr.length) {
			clearInterval(obj.shakeTimer);
			//如果是函数 执行
			endFn && endFn();
		}
	},50);
}
// getComputedStyle 只读 样式
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];;
}
/************** getElementsByClassName元素 ******************/
function getElementsByClassName(parent,tagName,className){
	var aEls = parent.getElementsByTagName(tagName);
	var arr = [];
	for (var i = 0; i < aEls.length; i++) {
		// if (aEls[i].className == className) {
		// 	arr.push(aEls[i]);
		// }
		//去除空格
		var aClassName = aEls[i].className.split(' ');
		for (var j = 0; j < aClassName.length; j++) {
			if (aClassName[j] == className) {
				arr.push(aEls[i]);
				break;
			}
		}
	}
	return arr;
}

/************** 添加元素 ******************/
function addClass(obj,className){
	//如果原来没有class
	if (obj.className == '') {
		obj.className = className;
	}else{
		//如果原来有class
		
		var arrClassName = obj.className.split('');
		var _index = arrIndexOf(arrClassName,className);
			
			if (_index == -1) {
				//如果添加的class在原来的class中不存在
				obj.className +=' '+ className;
			}
		
	}
}
//查找是否存在元素
function arrIndexOf(arr, v){
	for (var i = 0; i < arr.length; i++) {
		//如果有
		if (arr[i] == v) {
			return i;
		}
	}
	//如果没有
	return -1;
}
/************** 移除元素 ******************/
function removeClass(obj,className){
	//如果原来有class
	if (obj.className != '') {
		var arrClassName = obj.className.split('');
		var _index = arrIndexOf(arrClassName,className);
		//如果存在要移除的class
		if (_index != -1) {
			//删除数组
			arrClassName.splice(_index,1);
			obj.className = arrClassName.join('');
		}
	}
}
/************** 设置cookie ******************/
function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate( oDate.getDate() + t );
	document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}
//移除cookie
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}



