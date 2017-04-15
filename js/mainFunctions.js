/* Verificar se um formulario foi preenchido */
function checkForm(form) {
    var reqReady = true;
    var pconfReady = false;
    $("form#" + form + " input.req-field").each(function() {
        if (($(this).hasClass("cellNumber") && $(this).val().length !== 9) || $.trim($(this).val()).length === 0)
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

/* Assegurar-se que o NIF, se fornecido, tem 9 numeros */
function checkNIF(form) {
    var niflen = $("form#" + form + " .nifNumber").val().length;
    return niflen === 0 || niflen === 9;
}

/* Assegurar-se que o nr de telemóvel tem 9 numeros */
function checkTel(form) {
    return $("form#" + form + " .cellNumber").val().length === 9;
}

function updateTimer(timeleft) {
    $("#callwaittime").text(timeleft);
    if (timeleft <= 0) {
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
    $("#logged-tel").text(getTel());
}

function deleteLoginData() {
    $("#logged-uname").text("");
    $("#logged-nif").removeClass().text("");
    $("#logged-tel").text("");
}

function closeDefs() {
    if ($("#DefinicoesConta").is(":visible")) {
        $("#DefinicoesConta, #screen2-definicoesConta").hide();
        $("form#def-form, form#screen2-def-form").trigger("reset");
        $("#rightBoxTitle").text("CONTA DE UTILIZADOR");
        $("#boxcontautilizadorlogged").show();
    }
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

function closeHistorico() {
    if ($("#Historico").is(":visible")) {
        $("#rightBoxTitle").text("CONTA DE UTILIZADOR");
        $("#Historico, #screen2-historico").hide();
        $("#boxcontautilizadorlogged").show();
    }
}
