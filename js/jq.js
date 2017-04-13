$(document).ready(function() {
    /* Esconder janelas inicialmente */
    $(".window, #blocker, #boxcontautilizadorlogged, #Historico, #DefinicoesConta").hide();

    /* Função chamada quando é clicado botão de log-in no ecrã principal. */
    $("#login-btn").click(function() {
        openWindow("login-window");
        $("#invalid-data").hide();
        $("#login-submit-disabler").show();
        $("input#login-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão de registar no ecrã principal. */
    $("#reg-btn").click(function() {
        openWindow("reg-window");
        $("#reg-submit-disabler").show();
        $("input#reg-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão de log-in na janela de log-in. */
    $("#login-submit").click(function() {
        var username = $("input#email-txtbx").val();
    	var password = $("input#password-txtbx").val();
    	if (isLoginValid(username, password)) {
            closeLoginWindow();
    	} else {
    		$("#invalid-data").show();
    	}
    });

    /* Função chamada quando é clicado botão de registar na janela de registar. */
    $("#reg-submit").click(function() {
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
    });

    /* Janelas log-in e registo: Colocar asteriscos a vermelho caso campo não esteja preenchido */
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

    /* Página carregada */
    $("#loader").hide();
});
