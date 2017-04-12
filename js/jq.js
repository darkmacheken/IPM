$("input.req-field").keyup(function() {
    if( $(this).val().length === 0 ) {
        $("#" + $(this).attr("name") + "-att").removeClass().addClass("attentionText");
    } else {
        $("#" + $(this).attr("name") + "-att").removeClass().addClass("calmText");
    }
    checkForm($(this).parents("form").attr("id"));
});
