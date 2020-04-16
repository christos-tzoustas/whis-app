$(function() {
    $('#flash').fadeIn(500, 'linear', function() {
        $(this).fadeOut(2500, 'linear');
    });
});

$('#username, #password, #description, #amount').each(function() {
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

// select input

$("span#selectIcon").click(function(event){

	$("ul.custom-select-options").fadeToggle();
	$("input#custom-select").toggleClass("selected")
	$("ul.custom-select-options").toggleClass("selected")
	$("span#selectIcon").toggleClass("selected")
	
	event.stopPropagation();
});


$('ul.custom-select-options li').hover(function() {
	$(this).toggleClass("selected")
});

$('ul.custom-select-options li').click(function() {
	var type = $(this).text();
	$("input#custom-select").val(type);
});


$(document).click(function(){
	$("input#custom-select").removeClass("selected");
	$("ul.custom-select-options").removeClass("selected");
	$("span#selectIcon").removeClass("selected");
	$("ul.custom-select-options").fadeOut();
})


//resize select element
function showWidth (){
	var width =  $("div.login.form-group").width();
	return width;
}

$("div.selectWrapper").width( showWidth() );

$( window ).resize(function() {
 var width =  $("div.login.form-group").width() ;
	$("div.selectWrapper").width(width );
});