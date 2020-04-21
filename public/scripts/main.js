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
    if (
        !$(this)
            .parent()
            .hasClass('active')
    ) {
        $(this)
            .parent()
            .toggleClass('selectedDiv');
    }
});

// select input

$('span#selectIcon').click(function(event) {
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
    var type = $(this).text();
    $('input#custom-select').val(type);
});

$(document).click(function() {
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

//ALTERNATIVE VALIDATION
function validateForm() {
    var input = $('input#custom-select').val();
    var optionsArr = [].slice.call(document.querySelectorAll('.custom-select-options li'));
    var optionsArrText = [];
    optionsArr.forEach(function(item) {
        var option = item.textContent;
        optionsArrText.push(option);
    });
    if (!optionsArrText.includes(input)) {
        $('input#custom-select').val('Please select one of the values below ');
		return false;
    }
}

//resize select element
function showWidth() {
    var width = $('div.login.form-group').width();
    return width;
}

$('div.selectWrapper').width(showWidth());

$(window).resize(function() {
    var width = $('div.login.form-group').width();
    $('div.selectWrapper').width(width);
});

//edit div toggle

$('span#iconEditSpan').click(function(event) {
    $(this)
        .next('.editToggler')
        .toggleClass('hidden-all');

    event.stopPropagation();
});