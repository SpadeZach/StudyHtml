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