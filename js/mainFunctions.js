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

function updateLoginData() {
    $("#logged-uname, #screen2-logged-uname").text(getUname());
    if (contas[loggedIn]._nif === "")
        $("#logged-nif, #screen2-logged-nif").addClass("attentionText").text("Não fornecido.");
    else
        $("#logged-nif, #screen2-logged-nif").text(getNif());
    $("#logged-tel, #screen2-logged-tel").text(getTel());
}

function deleteLoginData() {
    $("#logged-uname").text("");
    $("#logged-nif").removeClass().text("");
    $("#logged-tel").text("");
}

function closeDefs() {
    $("#DefinicoesConta").hide();
    $("form#reg-form").trigger("reset");
}

function defsChanged() {
    return $("input#def-pword-txtbx").val() !== "" ||
            $("input#def-nif-numbx").val() !== getNif() ||
            $("input#def-tel-numbx").val() !== getTel();
}

function saveDefs() {
    if ($("input#def-pword-txtbx").val() !== "")
        setPword($("input#def-pword-txtbx").val());
    setNif($("input#def-nif-numbx").val());
    setTel($("input#def-tel-numbx").val());
    updateLoginData();
    closeDefs();
}
