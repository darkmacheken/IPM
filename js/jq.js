$(document).ready(function() {
    /* Esconder janelas inicialmente */
    $(".window, #blocker, #boxcontautilizadorlogged, #Historico, #DefinicoesConta").hide();


    /*********************************** JANELA DE LOGIN ***********************************/
    /* Função chamada quando é clicado botão de log-in no ecrã principal. */
    $("#login-btn").click(function() {
        openWindow("login-window");
        $("#invalid-data").hide();
        $("#login-submit-disabler").show();
        $("input#login-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#login-close-btn").click(function() {
        closeLoginWindow();
    });

    /* Função chamada quando é clicado botão de log-in na janela de log-in. */
    $("#login-submit").click(function() {
        var uname = $("input#login-uname-txtbx").val();
    	var pword = $("input#login-pword-txtbx").val();
    	if (isLoginValid(uname, pword)) {
            login(uname);
            closeLoginWindow();
    	} else {
    		$("#invalid-data").show();
    	}
    });


    /*********************************** JANELA DE REGISTO ***********************************/
    /* Função chamada quando é clicado botão de registar no ecrã principal. */
    $("#reg-btn").click(function() {
        openWindow("reg-window");
        $("#reg-submit-disabler").show();
        $("input#reg-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#reg-close-btn").click(function() {
        closeRegistarWindow();
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

    	var uname = $("#reg-uname-txtbx").val();
    	var pword = $("#reg-pword-txtbx").val();
        var nif = $("#reg-nif-numbx").val();
        var tel = $("#reg-tel-numbx").val();

    	createAccount(uname, pword, nif, tel);
    	closeRegistarWindow();
    });

    /*********************************** TODAS AS JANELAS ***********************************/
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

    /*********************************** OVERLAY DE SESSÃO INICIADA ***********************************/
    $("#historicobtn").click(function () {
        ;
    });

    $("#definicoesContabtn").click(function () {
        ;
    });

    $("#sairSessaobtn").click(function () {
        logout();
    });

    /*********************************** FIM DO LOADING ***********************************/
    /* Página carregada */
    $("#loader").hide();
});
