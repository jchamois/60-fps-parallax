var APP = APP || {}

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
			});

			reqAnimFr(loop);
		}
	}
})






