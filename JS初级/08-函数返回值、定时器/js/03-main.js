// 2017-02-06 by zhaobo
function $ (v) {
	if (typeof v === 'function') {
		window.onload = v;
	}else if(typeof v === 'string'){
		return document.getElementById(v);
	}else if(typeof v === 'object'){
		return v;
	}
}
//获取元素
// getComputedStyle 只读样式Chrome,Firefox (Gecko)
// currentStyle  兼容IE	
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}