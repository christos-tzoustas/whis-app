//HIDE FLASH MESSAGES
$(function() {
	$('#flash').fadeIn(500, 'linear', function() {
		$(this).fadeOut(2500, 'linear');
	});
});

//INPUT STYLING
$('#username, #password, #description, #amount').each(function() {
	$(this).on('focus blur', function() {
		$(this).parent().parent().toggleClass('selectedInput');
	});
});

$('a.iconLink').hover(function() {
	if (!$(this).parent().hasClass('active')) {
		$(this).parent().toggleClass('selectedDiv');
	}
});

//SELECT STYLING

$('span#selectIcon').click((event) => {
	$('ul.custom-select-options').fadeToggle();
	$('input#custom-select').toggleClass('selected');
	$('ul.custom-select-options').toggleClass('selected');
	$('span#selectIcon').toggleClass('selected');

	event.stopPropagation();
});

$('ul.custom-select-options li').hover(function() {
	$(this).toggleClass('selected');
});

$('ul.custom-select-options li').click(function() {
	const type = $(this).text();
	$('input#custom-select').val(type);
});

$(document).click(() => {
	$('input#custom-select').removeClass('selected');
	$('ul.custom-select-options').removeClass('selected');
	$('span#selectIcon').removeClass('selected');
	$('ul.custom-select-options').fadeOut();
});

// //VALIDATE NEW EXPENSE FORM
// function validateForm() {
//     var input = $('input#custom-select').val();
//     var valid = false;
//     $('ul.custom-select-options li').each(function(i) {
//         var item = $(this).text();
//         console.log(item);
//         if (item === input) {
//             valid = true;
//         }
//     });
//     if (!valid) {
//         $('input#custom-select').val('Please select one of the values below ');
//     }
//     return valid;
// }

//ALTERNATIVE VALIDATION FOR NEW EXPENSE FORM
function validateForm() {
	const input = $('input#custom-select').val();
	const optionsArr = [].slice.call(document.querySelectorAll('.custom-select-options li'));
	const optionsArrText = [];
	optionsArr.forEach((item) => {
		const option = item.textContent;
		optionsArrText.push(option);
	});
	if (!optionsArrText.includes(input)) {
		$('input#custom-select').val('Please select one of the values below ');
		return false;
	}
}

//RESIZE SELECT ELEMENT
function showWidth() {
	const width = $('div.login.form-group').width();
	return width;
}

$('div.selectWrapper').width(showWidth());

$(window).resize(() => {
	const width = $('div.login.form-group').width();
	$('div.selectWrapper').width(width);
});

// DETAILED VIEW DISPLAY
if ($('div.detailsItem').length > 2) {
	$('div.detailsItem').parent().closest('div').addClass('justify-content-center');
}

if ($('div.detailsItemType').length > 2) {
	$('div.detailsItemType').parent().closest('div').addClass('justify-content-center');
}

//TOGGLE STICKY CLASS FOR SIDEBARS
function toggleSticky() {
	if (window.innerWidth > 1200) {
		$('div.left-sidebar, div.right-sidebar').addClass('sticky-top');
	} else {
		$('div.left-sidebar, div.right-sidebar').removeClass('sticky-top');
	}
}

toggleSticky();
window.onresize = function() {
	toggleSticky();
	if ($('canvas').is('#myChart')) {
		toggleLegend(); //toggle legend from chart.js
	}
};

//EDIT DIV TOGGLE BUTTONS

$('span#iconEditSpan').click(function(event) {
	$(this).next('.editToggler').toggleClass('hidden-all');

	event.stopPropagation();
});
