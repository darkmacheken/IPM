/* Verificar se um formulario foi preenchido */
function checkForm(form) {
    var reqReady = true;
    var pconfReady = false;
    $("form#" + form + " input.req-field").each(function() {
        if ($.trim($(this).val()) === "")
            reqReady = false;
    });
    if ($("input#reg-pword-txtbx").val() === $("input#reg-cpword-txtbx").val())
        pconfReady = true;
    if (existsUser($("input#reg-uname-txtbx").val()))
        pconfReady = false;

    if (reqReady) {
        if (pconfReady)
            $("form#" + form + " div.disabler").hide();
        else
            $("form#" + form + " div.disabler").show();
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("calmText");
	} else {
		$("form#" + form + " div.disabler").show();
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("attentionText");
	}

    return reqReady && pconfReady;
}

function callTimer() {
    var time = $("#callwaittime").text() - 1;
    $("#callwaittime").text(time);
    if (time > 0)
        setTimeout(callTimer, 1000);
    else {
        $("#callbtn").show();
        $("#callwaitbtn").hide();
    }
}
