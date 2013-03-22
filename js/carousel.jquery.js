(function( $ ){
	var methods = {
		init : function(options) {
			var defaults = {
					arrows    : false,   // Show arrow controls
					indicators: false,   // Show position indicators / controls
					infinite  : false,   // Imitate an infinite carousel (no start and end)
					animation : 'slide', // Animation to use for moving between slides
					speed     : 100,     // Speed in milliseconds for the animation
					interval  : false,   // Interval in milliseconds for automatically moving between slides

					onReady      : false, // Callback for when the plugin is initialised
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
				var self = $(this),
					state = {
						settings  : settings,
						indicators: false,
						arrows    : {
							previous: false,
							next    : false
						},
						interval  : false,
						slideCount: self.children().length,
						current   : 0
					};

				// Validate the settings
				if (settings.animation !== 'slide') {
					$.error('Unsupported animation type for jQuery.carousel: ' + settings.animation);
				}

				// Wrap slides in an element we can use as a "window" to the slides
				self.wrap($('<div>'));

				var wrap = self.parent();

				// Get the first slide to use for measuring
				var firstSlide = self.children(':first');

				// Set the basic structural styling for the carousel
				wrap.css({
					width   : firstSlide.width(),
					height  : firstSlide.height(),
					overflow: 'hidden'
				});

				self.css({
					float: 'left',
					width: firstSlide.width() * state.slideCount
				})
				.children().css({
					display: 'block',
					float  : 'left'
				});

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
						state.arrows.next     = $('<p class="arrow next">Next</p>').insertAfter(wrap);
						state.arrows.previous = $('<p class="arrow previous">Previous</p>').insertAfter(wrap);
					}

					// Set events for the arrow controls
					state.arrows.next.on('click.carousel', function() {
						methods.goToNext.call(self);
					});
					state.arrows.previous.on('click.carousel', function() {
						methods.goToPrevious.call(self);
					});
				}

				// Initialise indicators
				if (settings.indicators !== false) {
					var indicatorHTML = $('<ol class="indicators"></ol>');

					// Create each indicator
					self.children().each(function() {
						indicatorHTML.append($('<li></li>').click(function() {
							methods.goTo.call(self, $(this).index());
						}));
					});

					// jQuery selector for the destination of the indicators
					if (typeof settings.indicators === 'object' && settings.indicators instanceof jQuery) {
						state.indicators = indicatorHTML.insertAfter(settings.indicators.html);
					}
					// Generate the indicators
					else if (settings.indicators === true) {
						state.indicators = indicatorHTML.insertAfter(wrap);
					}
				}

				// set up the interval if required (and put in data)
				// set up events for hover and interaction
				// add calculate method
				// call calculate method when window/element size changes event
				// call calculate method on interaction
				//

				// Bind the interaction event, if defined
				if (typeof settings.onInteraction === 'function') {
					var controls = $();

					if (state.indicators !== false) {
						controls = controls.add(state.indicators.children());
					}

					if (state.arrows.previous !== false) {
						controls = controls.add(state.arrows.previous);
					}

					if (state.arrows.next !== false) {
						controls = controls.add(state.arrows.next);
					}

					controls.on('click.carousel', function() {
						settings.onInteraction(self);
					});
				}

				// Save state on the element for use later
				self.data('carousel', state);

				// Set the initial state (first slide)
				methods.updateState.call(self);

				// Set initialised class
				self.addClass('carousel-initialised');

				// Fire the onReady event, if defined
				if (typeof settings.onReady === 'function') {
					settings.onReady(self);
				}

				// Start the interval, if defined
				methods.start.call(self);
			});
		},

		goTo : function(slideIndex) {
			index = Number(slideIndex);

			return this.each(function() {
				var self   = $(this),
					state  = self.data('carousel'),
					offset = (100 / state.slideCount) * index;

				// Validate the index
				if (isNaN(index) || index < 0 || index >= state.slideCount) {
					$.error('Invalid slide reference on jQuery.carousel.goTo: ' + slideIndex);
				}

				// Set the current state
				state.current = index;

				// Fire the onChangeStart event, if defined
				if (typeof state.settings.onChangeStart === 'function') {
					state.settings.onChangeStart(self);
				}

				// Animate the change of slide
				self.animate({marginLeft: '-' + (100 * index) + '%'}, {
					duration: state.settings.speed,
					complete: function() {
						// Fire the onChangeEnd event, if defined
						if (typeof state.settings.onChangeEnd === 'function') {
							state.settings.onChangeEnd(self);
						}

						// Fire the onComplete event, if defined & this is the last slide
						if (index + 1 === state.slideCount && typeof state.settings.onComplete === 'function') {
							state.settings.onComplete(self);
						}
					}
				});

				methods.updateState.call(self);
			});
		},

		updateState : function() {
			return this.each(function() {
				var state = $(this).data('carousel');

				// Set active class on indicator
				if (state.indicators !== false) {
					state.indicators
						.children().removeClass('active')
						.filter(':eq(' + state.current + ')').addClass('active');
				}

				// Set disabled class on controls where necessary
				if (state.arrows.previous !== false) {
					state.arrows.previous.toggleClass('disabled', (state.current === 0));
				}

				if (state.arrows.next !== false) {
					state.arrows.next.toggleClass('disabled', (state.current + 1 === state.slideCount));
				}
			});
		},

		goToStart : function() {
			return methods.goTo.call(this, 0);
		},

		goToEnd : function() {
			return this.each(function() {
				var self = $(this);

				return methods.goTo.call(self, self.data('carousel').slideCount - 1);
			});
		},

		goToNext : function() {
			return this.each(function() {
				var self = $(this);

				try {
					return methods.goTo.call(self, self.data('carousel').current + 1);
				}
				catch (e) {
					return false;
				}
			});
		},

		goToPrevious : function() {
			return this.each(function() {
				var self = $(this);

				try {
					return methods.goTo.call(self, self.data('carousel').current - 1);
				}
				catch (e) {
					return false;
				}
			});
		},

		cycle : function() {
			return this.each(function() {
				var self  = $(this),
					state = self.data('carousel');

				// If we're on the last slide, rewind back to the start
				if (state.current + 1 === state.slideCount) {
					methods.goToStart.call(self);
				}
				// Otherwise, go to next
				else {
					methods.goToNext.call(self);
				}
			});
		},

		start : function() {
			return this.each(function() {
				var self  = $(this),
					state = self.data('carousel');

				if (state.settings.interval !== false) {
					var speed = Number(state.settings.interval);

					if (isNaN(speed) || speed <= 0) {
						$.error('Invalid interval speed set on jQuery.carousel: ' + state.settings.interval);
					}

					state.interval = setInterval(function() {
						return methods.cycle.call(self);
					}, speed);
				}
			});
		},

		stop : function() {
			return this.each(function() {
				var state = $(this).data('carousel');

				if (state.interval !== false) {
					clearInterval(state.interval);
				}
			});
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
		// methods for stop / start with intervals
		// ensure widths are re-calculated on orientation change
	};
})(jQuery);