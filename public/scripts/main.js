$(function() {
    $('#flash').fadeIn(500, 'linear', function() {
        $(this).fadeOut(2500, 'linear');
    });
});

$('#username, #password').each(function() {
    $(this).on('focus blur', function() {
        $(this)
            .parent()
            .parent()
            .toggleClass('selectedInput');
    });
});

$('a.iconLink').hover(function() {
	if (!($(this).parent().hasClass('active'))) {
		$(this).parent().toggleClass('selectedDiv');
	}
});

