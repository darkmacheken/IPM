/* Verificar se um formulario foi preenchido */
function checkForm(form) {
    var formReady = true;
    $("form#" + form + " input.req-field").each(function() {
        if ($.trim($(this).val()) === "")
            formReady = false;
    });

    if (formReady) {
		$("form#" + form + " div.disabler").hide();
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("calmText");
	} else {
		$("form#" + form + " div.disabler").show();
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("attentionText");
	}

    return formReady;
}
