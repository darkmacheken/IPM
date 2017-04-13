/* Função chamada quando é clicado botão de log-in no ecrã principal. */
function openLogin() {
    openWindow('login-window');
    $("input#login-uname-txtbx").focus();
}

/* Função chamada quando é clicado botão de registar no ecrã principal. */
function openReg() {
    openWindow('reg-window');
    $("input#reg-uname-txtbx").focus();
}

/* Função chamada quando é clicado botão de log-in na janela de log-in. */
function submitLogin() {
	var username = document.getElementById("email-txtbx").value;
	var password = document.getElementById("password-txtbx").value;
	if (isLoginValid(username, password)) {
        ;
	} else {
		toggle_visible("invalid-data");
	}
}

/* Função chamada quando é clicado botão de registar na janela de registar. */
function submitReg() {
    // Prevenir que o botao seja clicado acidentalmente quando desativado
    var formReady = true;
    $("form#reg-form input.req-field").each(function() {
        if ($.trim($(this).val()) === "")
            formReady = false;
    });
    if (!formReady)
        return;

	var username = document.getElementById("reg-email-txtbx").value;
	var password = document.getElementById("reg-password-txtbx").value;
	var vegetarian = document.getElementById("reg-ra-veg").checked;
	var intlact = document.getElementById("reg-ra-intlact").checked;
	var intglut = document.getElementById("reg-ra-gluten").checked;
	if (is_hidden("reg-submit-disabler")) {
		createAccount(username, password);
		closeRegistarWindow();
	}
}

/* Verificar se um formulario foi preenchido */
function checkForm(form) {
    var formReady = true;
    $("form#" + form + " input.req-field").each(function() {
        if ($.trim($(this).val()) === "")
            formReady = false;
    });

    if (formReady) {
		toggle_hidden($("form#" + form + " div.disabler").attr("id"));
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("calmText");
	} else {
		toggle_visible($("form#" + form + " div.disabler").attr("id"));
        $("form#" + form + " span.att-warning").removeClass().addClass("att-warning").addClass("attentionText");
	}
}
