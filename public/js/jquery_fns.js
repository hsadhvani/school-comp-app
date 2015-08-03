var nextslide = function(to, from) {
	$(from).fadeOut('fast', function() {
		$(from).replaceWith($(to)).fadeIn('slow');
	});
};	