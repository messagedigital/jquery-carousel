(function( $ ){
	var methods = {
		init : function(options) {
			var self     = this,
				defaults = {
					arrows    : false,   // Show arrow controls
					indicators: true,    // Show position indicators / controls
					infinite  : false,   // Imitate an infinite carousel (no start and end)
					animation : 'slide', // Animation to use for moving between slides
					speed     : 100,     // Speed in milliseconds for the animation
					interval  : false,   // Interval for automatically moving between slides

					onChangeStart: false, // Callback for the start of the slide change animation
					onChangeEnd  : false, // Callback for the end of the slide change animation
					onComplete   : false, // Callback for the end of the slides being reached
					onInteraction: false  // Callback for when a user interacts with any controls
				},
				settings = $.extend({}, defaults, options);

			/**
			 * Checks if a variable is a valid object with named properties
			 * passed in the 'arrows' option.
			 *
			 * The object must have a property named 'next' and one either named
			 * 'prev' or 'previous'. The value of both of these must be a jQuery
			 * object.
			 *
			 * @param  mixed input The variable to check
			 * @return boolean     True if the input is valid, false otherwise
			 */
			function isArrowControlObject(input)
			{
				if (typeof input !== 'object') {
					return false;
				}

				if (!input.hasOwnProperty('next') || !(input.next instanceof jQuery)) {
					return false;
				}

				if (!input.hasOwnProperty('previous') || !(input.previous instanceof jQuery)) {
					if (!input.hasOwnProperty('prev') || !(input.prev instanceof jQuery)) {
						return false;
					}
				}

				return true;
			}

			return this.each(function() {
				var $this = $(this),
					state = {
						settings  : settings,
						indicators: false,
						arrows    : {
							previous: false,
							next    : false
						},
						interval  : false
					};

				// Initialise arrow controls
				if (settings.arrows !== false) {
					// An object with named properties for next & previous/prev
					if (isArrowControlObject(settings.arrows)) {
						state.arrows.next     = settings.arrows.next;
						state.arrows.previous = (settings.arrows.hasOwnProperty('previous')) ? settings.arrows.previous : settings.arrows.prev;
					}
					// An array with two elements, the first is assumed the prev control
					else if (typeof settings.arrows === 'object' && settings.arrows.length === 2) {
						state.arrows.next     = settings.arrows[1];
						state.arrows.previous = settings.arrows[0];
					}
					// Generate the arrows
					else if (settings.arrows === true) {
						state.arrows.next     = $('<p class="arrow next">Next</p>').prependTo($this);
						state.arrows.previous = $('<p class="arrow previous">Previous</p>').prependTo($this);
					}

					// Set events for the arrow controls
					state.arrows.next.on('click.carousel', function() {
						methods.goToNext.call(self);
					});
					state.arrows.previous.on('click.carousel', function() {
						methods.goToPrevious.call(self);
					});
				}

				console.log(state);

				// if (typeof settings.onHover === 'function') {
				// 	$this.on('mouseover', settings.onHover);
				// }

				// add arrows if required (and put in data)
				// add indicators if required (and put in data)
				// set up the interbal if required (and put in data)
				// set up events for hover and interaction
				// add class of initialised once done
				//

				// Save state on the element for use later
				$this.data('carousel', state);
			});
		},
		goTo : function(index) {
			console.log('calling goTo with ' + index);
			return this.each(function() {
				var settings = $(this).data('carousel').settings;

				console.log(settings);
			});
		},
		goToStart : function() {
			// call goTo(0)
		},
		goToEnd : function() {
			// call goTo with the last index
		},
		goToNext : function() {
			console.log('go to next');
		},
		goToPrevious : function() {
			console.log('go to prev');
		},
		start : function() {
			// start the interval
		},
		stop : function() {
			// stop the interval
		}
	};

	$.fn.carousel = function(method) {
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
	};
})( jQuery );