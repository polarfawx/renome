/**
 * Review Form Block
 */
$('.review-form').validate({
    errorClass: 'error review-form__error',

    errorPlacement: function(error, element) {
        element.closest('.review-form__field').append(error);
    },

    ignore: [],

    highlight: function(element) {
        if ($(element).hasClass('input')) {
            $(element).addClass('input_invalid');
        } else if ($(element).hasClass('text-area')) {
            $(element).addClass('text-area_invalid');
        }
    },

    unhighlight: function(element) {
        if ($(element).hasClass('input')) {
            $(element).removeClass('input_invalid');
        } else if ($(element).hasClass('text-area')) {
            $(element).removeClass('text-area_invalid');
        }
    },
});