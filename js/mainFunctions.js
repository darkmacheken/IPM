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

function check_text_field(id) {
	obj = document.getElementById(id);
	if (obj.type == "text") {
		console.log(this.value);
		if (obj.value == "")
			reg1ht = false;
		else
			reg1ht = true;
	} else {
		if (obj.value == "")
			reg2ht = false;
		else
			reg2ht = true;
	}
	if (reg1ht && reg2ht) {
		toggle_hidden("reg-submit-disabler");
	} else {
		toggle_visible("reg-submit-disabler");
	}
}


/*** FUNÇÕES AUXILIARES ***/
function closeLoginWindow() {
	closeWindow("login-window");
	toggle_hidden("invalid-data");
}

function closeRegistarWindow() {
	document.getElementById("reg-form").reset();
	check_text_field('reg-email-txtbx');
	check_text_field('reg-password-txtbx');
	closeWindow("reg-window");
	toggle_inherit("reg-submit-disabler");
}
