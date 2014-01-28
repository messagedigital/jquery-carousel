# Carousel jQuery Plugin #

This jQuery plugin provides carousel functionality typical for the sites we build.

## Installation ##

This plugin is intended for installation using the [Bower](http://twitter.github.com/bower/) package management system for Javascript libraries. From within your project directory, run the following command to install this plugin to your configured components directory:

	bower install git@github.com:messagedigital/jquery-carousel.git
	
## Dependencies ##

This component depends on the following components:

* **jquery** v1.9.0

## Prerequisites ##

The only prerequisite for elements for which the carousel is instantiated on is that the element contains at one child elements.

The child elements are assumed to be the carousel slides. If there is only one child element, the carousel will instantiate fine, but it will of course not do very much and be sort of useless.

## Usage ##

The plugin is instantiated as follows. The options parameter can be left blank, if you want to use all of the default options:

	$('.my-gallery').carousel();

## Options ##

The available configuration options are as follows. They are defined when instantiating the plugin. Here's an overview of all available options and their default options:

	$('.gallery').carousel({
		arrows    : false,   // Show arrow controls
		indicators: false,   // Show position indicators / controls
		animation : 'slide', // Animation to use for moving between slides
		speed     : 100,     // Speed in milliseconds for the animation
		interval  : false,   // Interval in milliseconds for automatically moving between slides
		flexible  : true,    // Determines whether the carousel has a flexible width

		onReady      : false, // Callback for when the plugin is initialised
		onChangeStart: false, // Callback for the start of the slide change animation
		onChangeEnd  : false, // Callback for the end of the slide change animation
		onComplete   : false, // Callback for the end of the slides being reached
		onInteraction: false  // Callback for when a user interacts with any controls
	});

### arrows ###

This defines whether or not previous/next arrow controls should be used. If passed as `false`, no arrow controls will be generated or used.

If passed as `true`, the arrow controls will be generated and added to the DOM inside the target element as the following:

	<button class="arrow previous">Previous</button>
	<button class="arrow next">Next</button>

If you wish to define your own HTML for the arrow controls, you can pass jQuery selectors for the arrow controls. These can either be passed as an array with two elements (the first is assumed as the previous control, and the second is assumed as the next control):

	$('.gallery').carousel({
		arrows: [$('.gallery .myPrevButton'), $('.gallery .myNextButton')]
	});

Or as an object with named properties of `next` and either `prev` or `previous`. Both of the following are valid:

	$('.gallery').carousel({
		arrows: {
			prev: $('.gallery .myPrevButton'),
			next: $('.gallery .myNextButton')
		}
	});

	$('.gallery').carousel({
		arrows: {
			previous: $('.gallery .myPrevButton'),
			next    : $('.gallery .myNextButton')
		}
	});

Note that the button elements can be any element, they don't have to be `<button>`'s.

The `arrows` option defaults to `false`.

### indicators ###

This defines whether or not position indicators should be created or not. If passed as `false`, no indicators will be generated.

If passed as `true`, the indicators will be generated and inserted after the carousel wrapping element (this is automatically generated for every carousel).

It is possible to override the destination for the generated indicators by passing a jQuery object for this setting. For example:

	$('.gallery').carousel({indicators: $('.my-indicators')});

The indicators are always generated as an ordered list. The HTML for indicators for a carousel with three slides would look like this:

	<ol class="indicators">
		<li class="active"></li>
		<li></li>
		<li></li>
	</ol>

The `indicators` option defaults to `false`.

### animation ###

This defines the animation to use when moving between slides. Currently, the only supported value is `slide`. Any other value will cause an error to be thrown.

The `animation` option defaults to `slide`.

### speed ###

This defines the speed in milliseconds for the transition between slides. 

The `speed` option defaults to `100`.

### interval ###

This defines the delay in milliseconds between automatically transitioning between slides. If passed as `false`, the carousel will not automatically transition between slides.

The `interval` option defaults to `false`.

### flexible ###

This defines whether or not the carousel is flexible. If passed as `true`, an event listener is set up for `resize` and `orientationchange` on `window` to check when the width of the carousel wrapper changes and resize the carousel itself appropriately.

This is very helpful for fluid width websites or when using media queries and device orientation.

The `flexible` option defaults to `true`.

## Callbacks ##

The following options are callbacks and can be passed as functions when the plugin is instantiated.

There are no callbacks defined by default.

The first and only argument for all callbacks is passed as the jQuery selector for the appropriate carousel(s).

### onReady ###

This callback is fired once the plugin has finished initialising and is ready to be used.

### onChangeStart ###

This callback is fired when the transition for changing slide starts.

### onChangeEnd ###

This callback is fired when the transition for changing slides finishes.

### onComplete ###

This callback fires when the transition for changing to the last slide finishes. This can be fired multiple times: whenever the last slide is reached.

### onInteraction ###

This callback is fired whenever any of the controls (arrows or indicators) are clicked.

It is helpful for stopping the automatic cycling of slides when the user takes control for usability reasons.

## Methods ##

The following public methods are available:

### detectWidthChange ###

This method will detect if the width of the carousel's wrapper has changed, and re-sets the widths if it has.
	
	function whenLayoutChanges() {
		$('.mycarousel').carousel('detectWidthChange');
	}

### setWidth(width) ###

Sets the width of the carousel. The width parameter must be an integer of the desired width in pixels.

	function whenCarouselZoom() {
		$('.mycarousel').carousel('setWidth', 1280);
	}

### goTo(index) ###

Moves to the desired slide. `index` should be the index of the slide to move to, where `0` is the first slide.

### goToStart ###

This is a shortcut method for `goTo(0)`. It takes you to the first slide.

	function resetWebsite() {
		$('.mycarousel').carousel('goToStart');
	}
	
### goToStart ###

This is a shortcut method to go to the last slide.

	function fastForwardMyCarousel() {
		$('.mycarousel').carousel('goToEnd');
	}

### goToNext ###

This is a shortcut method to go to the next slide. If the active slide is the last slide, an error is raised.

	$('.my-custom-next-button').click(function() {
		$('.mycarousel').carousel('goToNext');
	});
	
### goToPrevious ###

This is a shortcut method to go to the previous slide. If the active slide is the first slide, an error is raised.

	$('.my-custom-previous-button').click(function() {
		$('.mycarousel').carousel('goToPrevious');
	});

### cycle ###

This method is essentially the same as `goToNext`, however if the active slide is the last slide, the active slide becomes the first slide rather than an error being raised.

	$('.click-me-willy-nilly').click(function() {
		$('.mycarousel').carousel('cycle');
	});

### start ###

Starts the automatic transitioning between slides. If the `interval` option was passed as either `false` or not a valid number, an error is raised.

	function startPageAnimating() {
		$('.mycarousel').carousel('start');
	}

### stop ###

Stops the automatic transitioning between slides if it is currently running. Once this is called, it is possible to start up the same interval using the `start` method.

	function freezePage() {
		$('.mycarousel').carousel('stop');
	}

## Classes ##

This plugin adds some helpful classes to various elements:

* `disabled` is added to arrows when appropriate.
	* This is added to the next arrow when the active slide is the last slide.
	* This is added to the previous arrow when the active slide is the first slide
* `active` is added to the current slide's indicator when the slide transition starts.

## Contributing ##

This repository uses the [HubFlow](http://datasift.github.io/gitflow/index.html) workflow (see "[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)") and [Semantic Versioning](http://semver.org/). Please follow these guidelines and use these tools when contributing to this repository.
