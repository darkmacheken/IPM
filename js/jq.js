$(document).ready(function() {
    $("input.req-field").keyup(function() {
        if( $(this).val().length === 0 ) {
            $("#" + $(this).attr("name") + "-att").removeClass().addClass("attentionText");
        } else {
            $("#" + $(this).attr("name") + "-att").removeClass().addClass("calmText");
        }
        checkForm($(this).parents("form").attr("id"));
    });

    /* So deixar colocar numeros no telemovel e no nif */
    $("input#reg-nif-numbx, input#reg-tel-numbx").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});
