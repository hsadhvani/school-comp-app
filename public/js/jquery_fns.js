var nextslide = function(to, from) {
	$(from).fadeOut('fast', function() {
		$(from).replaceWith($(to)).fadeIn('slow');
	});
};

$(document).on('keypress', '.content_editable_div', function(e){
	return e.which != 13 && e.which != 32;
});