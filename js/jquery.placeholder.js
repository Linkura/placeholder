(function($) {

	/**
	 * Spoofs placeholders in browsers that don't support them (eg Firefox 3)
	 *
	 * Copyright 2011 Dan Bentley
	 * Licensed under the Apache License 2.0
	 *
	 * Author: Dan Bentley [github.com/danbentley]
	 */

	// Return if native support is available.
	if ("placeholder" in document.createElement("input")) return;

	$(document).ready(function(){
		// Add placeholder elements
		$('input[placeholder]').each(function() {
			setupInput($(this));
		});

		// Set up tab index
		var index = 1;
		$('input, button').each(function() {
			$(this).attr('tabindex', index++);
		});
	});

	function setupInput($input) {
		var $placeholder = createPlaceholder($input);

		$input.before($placeholder);

		if ($input.val() === '') {
			$input.hide();
		} else {
			$placeholder.hide();
		}

		$input.on('blur', function(e) {
			if ($input.val() !== '')
				return;
			$input.hide();
			$placeholder.show();
		});

		$placeholder.on('focus', function(e) {
			$placeholder.hide();
			$input.show().focus();
		});
	}

	function createPlaceholder($input) {
		return $('<input>').attr({
			id: $input.attr('id') + '_polyfill', // needs unique id
			readonly: true,
			style: $input.attr('style'),
			type: $input.prop('type'),
			value: $input.attr('placeholder')
		})
		.addClass($input.attr('class'))
		.addClass('placeholder');
	}
})(jQuery);
