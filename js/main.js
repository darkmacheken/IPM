$(document).ready(function() {
    /* Esconder janelas inicialmente */
    $(".window, #blocker, #boxcontautilizadorlogged, #Historico, #DefinicoesConta, #callwaitbtn, #second-screen, #screen2-logged-box").hide();

    /*********************************** JANELA DE LOGIN ***********************************/
    /* Função chamada quando é clicado botão de log-in no ecrã principal. */
    $("#login-btn, #screen2-login-btn").click(function() {
        $("form#login-form .calmText").removeClass("calmText").addClass("attentionText");
        openWindow("login-window");
        $("#invalid-data").hide();
        $("#login-submit-disabler").show();
        $("input#login-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#login-close-btn").click(closeLoginWindow);

    /* Função chamada quando é clicado botão de log-in na janela de log-in. */
    $("#login-submit").click(function() {
        // Prevenir que o botao seja clicado acidentalmente quando desativado
        if (!checkForm("login-form"))
            return;

        var uname = $.trim($("input#login-uname-txtbx").val());
    	var pword = $.trim($("input#login-pword-txtbx").val());
    	if (isLoginValid(uname, pword)) {
            login(uname);
            closeLoginWindow();
    	} else {
    		$("#invalid-data").show();
    	}
    });


    /*********************************** JANELA DE REGISTO ***********************************/
    /* Função chamada quando é clicado botão de registar no ecrã principal. */
    $("#reg-btn, #screen2-reg-btn").click(function() {
        $("form#reg-form .calmText").removeClass("calmText").addClass("attentionText");
        openWindow("reg-window");
        $("#reg-uname-exists").hide();
        $("#reg-cpword-diff").hide();
        $("#reg-submit-disabler").show();
        $("input#reg-uname-txtbx").focus();
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#reg-close-btn").click(closeRegistarWindow);

    /* Função chamada quando é clicado botão de registar na janela de registar. */
    $("#reg-submit").click(function() {
        // Prevenir que o botao seja clicado acidentalmente quando desativado
        if (!checkForm("reg-form"))
            return;

    	var uname = $.trim($("#reg-uname-txtbx").val());
    	var pword = $.trim($("#reg-pword-txtbx").val());
        var nif = $("#reg-nif-numbx").val();
        var tel = $("#reg-tel-numbx").val();

        var niff = nif;
        if (nif == "")
            niff = "<span class=\"attentionText\">Não fornecido.</span>"

        confirmYesNo("Tem a certeza que pretende criar uma conta com os seguintes dados?<br /><ul><li>Username: " + uname + "</li><li>NIF: " + niff + "</li><li>Telemóvel: " + tel + "</li></ul>",
        function () {
            createAccount(uname, pword, nif, tel);
            closeRegistarWindow();
        },
        function () {
            callblock();
        });
    });

    /* Verificar se o nome de utilizador já existe. */
    $("input#reg-uname-txtbx").keyup(function () {
        if (existsUser($("input#reg-uname-txtbx").val()))
            $("#reg-uname-exists").show();
        else
            $("#reg-uname-exists").hide();
    });

    /* Verificar se a palavra-passe e a sua confirmação correspondem. */
    $("input#reg-pword-txtbx, input#reg-cpword-txtbx").keyup(function () {
        if ($("input#reg-pword-txtbx").val() === $("input#reg-cpword-txtbx").val() ||
                $("input#reg-pword-txtbx").val() === "" ||
                $("input#reg-cpword-txtbx").val() === "")
            $("#reg-cpword-diff").hide();
        else
            $("#reg-cpword-diff").show();
    });

    /*********************************** TODAS AS JANELAS ***********************************/
    /* Janelas log-in e registo: Colocar asteriscos a vermelho caso campo não esteja preenchido */
    $("input.req-field").keyup(function () {
        if ($(this).val().length === 0) {
            $("#" + $(this).attr("name") + "-att").removeClass().addClass("attentionText");
        } else {
            $("#" + $(this).attr("name") + "-att").removeClass().addClass("calmText");
        }
        checkForm($(this).parents("form").attr("id"));
    });

    /* So deixar colocar numeros no telemovel e no nif */
    $("input.numOnly").keydown(function (e) {
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
    /* Função chamada quando é clicado botão de Histórico. */
    $("#historicobtn").click(function () {
        $("#Historico").show();
    });

    /* Função chamada quando é clicado botão de Definições de Conta. */
    $("#definicoesContabtn").click(function () {
        $("#def-uname-txtbx").val(contas[loggedIn]._uname);
        $("#def-nif-numbx").val(contas[loggedIn]._nif);
        $("#def-tel-numbx").val(contas[loggedIn]._tel);
        $("#DefinicoesConta").show();
    });

    /* Função chamada quando é clicado botão de Sair Sessão. */
    $("#sairSessaobtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair da sessão?", logout);
    });

    /*********************************** OVERLAY DE HISTÓRICO ***********************************/
    $("#boxHistoricoVoltarbtn").click(function () {
        $("#Historico").hide();
    });

    /*********************************** OVERLAY DE DEFINIÇÕES DE CONTA ***********************************/
    $("#boxDefinicoesVoltarbtn").click(function () {
        if (defsChanged())
            confirmYesNo("Tem a certeza que pretende descartar as alterações?", closeDefs);
        else
            closeDefs();
    });

    $("#boxDefinicoesGuardarbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende guardar as alterações?", saveDefs);
    });

    /*********************************** CHAMAR EMPREGADO ***********************************/
    $("#callbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende chamar um empregado?", function () {
            $("#callwaittime").text("40");
            setTimeout(callTimer, 1000);
            $("#callwaitbtn").show();
            $("#callbtn").hide();
        });
    });

    $("#cancelcallbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende cancelar?", function () {
            $("#callwaittime").text("0");
            $("#callbtn").show();
            $("#callwaitbtn").hide();
        });
    });

    /*********************************** SEGUNDA JANELA ***********************************/
    $("#orderfoodbtn").click(function () {
        $("#second-screen").show();
    });

    $("#menuPrincipalbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", function () {
            $("#second-screen").hide();
        });
    });

    /*********************************** FIM DO LOADING ***********************************/
    /* Página carregada */
    $("#loader").hide();
});
