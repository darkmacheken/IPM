/* Função chamada quando é clicado botão de log-in no ecrã principal. */
function openLogin() {
    openWindow('login-window');
}

/* Função chamada quando é clicado botão de registar no ecrã principal. */
function openReg() {
    openWindow('reg-window');
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

function checkField(field) {
    if (field.value == "")
        reg_req_fields[this.id] = false;
    else
        reg_req_fields[this.id] = false;
        
	if (reg1ht && reg2ht) {
		toggle_hidden("reg-submit-disabler");
	} else {
		toggle_visible("reg-submit-disabler");
	}
}
