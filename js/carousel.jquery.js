(function( $ ){
	var methods = {
		init : function(options) {
			var defaults = {
				'arrows'    : true,    // Show arrow controls
				'indicators': true,    // Show position indicators / controls
				'infinite'  : false,   // Imitate an infinite carousel (no start and end)
				'animation' : 'slide', // Animation to use for moving between slides
				'speed'     : 100,     // Speed in milliseconds for the animation
				'interval'  : false,   // Interval for automatically moving between slides

				'onChangeStart': false, // Callback for the start of the slide change animation
				'onChangeEnd'  : false, // Callback for the end of the slide change animation
				'onComplete'   : false, // Callback for the end of the slides being reached
				'onHover'      : false, // Callback for when a user hovers over the carousel
				'onInteraction': false  // Callback for when a user interacts with any controls
			},
				settings = $.extend({}, defaults, options);

			return this.each(function() {
				var $this = $(this);

				$this.data('carousel', settings);
			});
		},
		goTo : function(index) {
			console.log('calling goTo with ' + index);
			return this.each(function() {
				var settings = $(this).data('carousel');

				console.log(settings);
			});
		},
		goToStart : function() {
			// call goTo(0)
		},
		goToEnd : function() {
			// call goTo with the last index
		},
		start : function(interval) {
			// start the interval
		},
		stop : function() {
			// stop the interval
		}
	};

	$.fn.carousel = function(method) {
			// var settings = {
			// 	'arrows'    : true,    // Show arrow controls
			// 	'indicators': true,    // Show position indicators / controls
			// 	'infinite'  : false,   // Imitate an infinite carousel (no start and end)
			// 	'animation' : 'slide', // Animation to use for moving between slides
			// 	'speed'     : 100,     // Speed in milliseconds for the animation
			// 	'interval'  : false,   // Interval for automatically moving between slides

			// 	'onChangeStart': false, // Callback for the start of the slide change animation
			// 	'onChangeEnd'  : false, // Callback for the end of the slide change animation
			// 	'onComplete'   : false, // Callback for the end of the slides being reached
			// 	'onHover'      : false, // Callback for when a user hovers over the carousel
			// 	'onInteraction': false  // Callback for when a user interacts with any controls
			// };

		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.carousel');
		}
		// hover pause?
		// methods for goTo(index) / goToStart / goToEnd
		// methods for stop / start with intervals
		// ensure widths are re-calculated on orientation change

		return this; // maintain chainability
	};
})( jQuery );