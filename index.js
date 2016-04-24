(function(window){
	'use strict';
	document.body.onmousemove = function(e){ 
		var pos = {
			x: e.clientX, 
			y: e.clientY
		}; 
		[].slice.call(document.body.querySelectorAll('a[data-outline]')).forEach(function(a){
			a.style.outline = a.getAttribute('data-outline');
		});
		var anchors = [].slice.call(e.target.querySelectorAll('a[href]')).map(function(a){ 
			var rect = a.getBoundingClientRect(); 

			//todo: get optimal diff between elem and mouse
			return {
				elem: a, 
				x1: rect.left,
				y1: rect.top,
				x2: rect.left + a.offsetWidth,
				y2: rect.top + a.offsetTop
			}
		}).sort(function(a, b){
			return Math.abs(b.x1, pos.x) - Math.abs(a.x1, pos.x);
		});
		if(anchors.length){
			var anchor = anchors[0];

			anchor.elem.setAttribute('data-outline', anchor.elem.style.outline);
			anchor.elem.style.outline = '5px dashed yellow';
			
			document.body.onclick = function(){
				anchor.elem.dispatchEvent(new Event('click'));
			};
		}
	}
})(window);