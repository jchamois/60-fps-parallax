
var APP = APP || {}

var APP = APP || {}

APP.checkVisibility = (function(window){

	function checkVisibility(elem,x,y){

		var self = this;
		var deltas = {};
		var bounds = {};

		var win = window;
		var doc = document.documentElement;
		var docBody = document.body;

		var winHeight;
		var rect;
		var elemHeight;
		var elemWidth;
		var docHeight;
		var bounds = {};
		var deltas = {};
		var scrollY;
		var scrollX;

		self.elem = elem;
		self.x = x || 0;
		self.y = y || 0;

		function getAttr(elem){

			elemHeight =  self.elem.offsetHeight;
			elemWidth =  self.elem.offsetWidth;

			docHeight = Math.max(docBody.offsetHeight, doc.scrollHeight);
			winHeight = Math.max(win.innerHeight, doc.clientHeight)
			winWidth = Math.max(win.innerWidth, doc.clientWidth)
		}

		getAttr()

		this.is = function(){

			scrollY = win.scrollY;
			scrollX = win.scrollX;
			rect = self.elem.getBoundingClientRect();

			bounds = {
				top :  rect.top + scrollY - doc.clientTop,
				left :  rect.left + scrollX - doc.clientLeft
			}

			bounds.right = bounds.left + elemWidth;
			bounds.bottom = bounds.top + elemHeight;

			var viewport = {
				top : scrollY,
				left : scrollX
			};

			viewport.right = viewport.left + winWidth;
			viewport.bottom = viewport.top + winHeight;

			deltas = {
				top : Math.min( 1, (  bounds.bottom - viewport.top ) / elemHeight),
				bottom : Math.min(1, ( viewport.bottom -  bounds.top ) / elemHeight),
				left : Math.min(1, (  bounds.right - viewport.left ) / elemWidth),
				right : Math.min(1, ( viewport.right -  bounds.left ) / elemWidth)
			};

		}

		this.inView = function(){
			self.is(self.elem, self.x, self.y)

			return (deltas.left * deltas.right) > self.x && (deltas.top * deltas.bottom) > self.y
		}

		this.fromBottom = function(){
			self.is(self.elem, self.x, self.y)
			return viewport.bottom - bounds.bottom
		}

		this.fromTop = function(){
			self.is(self.elem, self.x, self.y)
			return viewport.top - bounds.top
		}

		this.viewportTop = function(){
			self.is(self.elem, self.x, self.y)
			return viewport.top
		}

		this.viewportBottom = function(){
			self.is(self.elem, self.x, self.y)
			return viewport.bottom
		}

		this.bottomOfWindow = function(){

			self.is(self.elem, self.x, self.y)

			return (viewport.top + winHeight) >= (docHeight)
		}
	}

	return checkVisibility

})(window)

APP.parallax = (function () {

	var privates = {};

	function parallax(elem){

		var self = this;

		self.elem = elem;
		self.speed = elem.getAttribute('data-speed');
		self.type = elem.getAttribute('data-parallax');
		var doc = document.documentElement;

		function init(){

			getAttr(self.elem)
		}

		init()

		function getAttr(elem){
			self.offsetTop = (self.type == "absolute") ? elem.parentNode.offsetTop : elem.offsetTop;
			self.height = elem.offsetHeight;
		}

		this.update = function(elem){
			getAttr(elem)
		}

		this.magic = function(){

			var winScrollY = window.scrollY

			if(self.type == 'absolute'){

				var coords = ((winScrollY - self.offsetTop) + self.height) * self.speed

				self.elem.style.transform = "translate3d(0,"+coords+"px,0)";
			}

			if(self.type == 'background'){

				var value = (winScrollY - (self.offsetTop - doc.clientTop)) * (self.speed/2)

				var coords = '50% ' + (value * -1) + 'px';

				self.elem.style.backgroundPosition = coords
			}
		}
	}

	return parallax;
})();

/* INIT with request animation frame */

var reqAnimFr = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.oRequestAnimationFrame;


window.addEventListener('load', function(){
	console.log('laod')
	var elems = document.querySelectorAll('.js-parallax');

	[].forEach.call(elems, function(elem) {
		// attach instance au node
	 	elem.parallax = new APP.parallax(elem);
	 	elem.checkVisibility = new APP.checkVisibility(elem,0,0)
	});

	if(reqAnimFr){
		loop()
	}

	var lastScrollTop = window.scrollY;

	function loop() { // 48fps

		var scrollTop = window.scrollY;

		if (lastScrollTop === scrollTop) {

			reqAnimFr(loop);

			return;

		} else {

			lastScrollTop = scrollTop;


			[].forEach.call(elems, function(elem) {

				if(elem.checkVisibility.inView()){

					elem.parallax.magic()
				}

				//console.log(elem,APP.checkVisibility.inView(elem,0,0))
			});

			reqAnimFr(loop);
		}
	}
})






