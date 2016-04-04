(function () {

	$.fn.isOnScreen = function(x, y){

		var $elt = $(this);
		var el = this

		if(x === null || typeof x == 'undefined') x = 0;
		if(y === null || typeof y == 'undefined') y = 0;

		var win = $(window);
		var wind = window

		var viewport = {
			top : window.scrollY,
			left : window.scrollX
		};

		viewport.right = viewport.left + wind.innerWidth;
		viewport.bottom = viewport.top + wind.innerHeight;

		var height = this[0].offsetHeight;
		var width = this[0].offsetWidth;

		if(!width || !height){
			return false;
		}

		var bounds = {};

		bounds.right = bounds.offsetLeft + width;
		bounds.bottom = bounds.offsetTop + height;

		var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

		if(!visible){
			return {
				inView:false,
				fromTop :viewport.top - bounds.top
			};
		}

		var deltas = {
			top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
			bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
			left : Math.min(1, ( bounds.right - viewport.left ) / width),
			right : Math.min(1, ( viewport.right - bounds.left ) / width)
		};

		return {
			inView : (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y,
			fromBottom : viewport.bottom - bounds.bottom,
			fromTop : viewport.top - bounds.top,
			viewportTop : viewport.top,
			viewportBottom : viewport.bottom,
			element : $elt
		};
	};
})();


$(window).on('scroll',function(){

	var inView = $('#art6').isOnScreen()
	//console.log(inView)
})







