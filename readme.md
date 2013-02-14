# Carousel jQuery Plugin

This jQuery plugin provides carousel functionality typical for the sites we build.

## Options

The available options are as follows:

**TODO: add option list with descriptions here**

### `arrows`

This defines whether or not previous/next arrow controls should be used. If passed as `false`, no arrow controls will be generated or used.

If passed as `true`, the arrow controls will be generated and added to the DOM inside the target element as the following:

	<p class="arrow previous">Previous</p>
	<p class="arrow next">Next</p>

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

The `arrows` option defaults to `false`.

## Prerequisites

**TODO: mention what markup it expects for the element**

## Roadmap

### Feature ideas

* Add `randomise` option that will shuffle the carousel slides when initialising.