$(document).ready(function() {
    /* Esconder janelas inicialmente */
    $(".window, #blocker, #boxcontautilizadorlogged, #Historico, #DefinicoesConta, #callwaitbtn, #second-screen, #screen2-logged-box, #screen2-historico, #screen2-definicoesConta").hide();

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

        //confirmYesNo("Tem a certeza que pretende criar uma conta com os seguintes dados?<br /><ul><li>Username: " + uname + "</li><li>NIF: " + niff + "</li><li>Telemóvel: " + tel + "</li></ul>",
        confirmYesNo("Tem a certeza que pretende criar uma conta com os dados inseridos? Por favor verifique.",
        function () {
            createAccount(uname, pword, nif, tel);
            closeRegistarWindow();
            confirmOk("A sua conta foi criada com sucesso!");
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
    /* Tornar as janelas arrastáveis */
    $(".window").draggable({ cancel: ".btn, input", containment: "#blocker", scroll: false });

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

    /* Submeter form com enter */
    $("form").keydown(function (e) {
        if(e.keyCode == 13)
            $(this).children(".submit").click();
    });

    /*********************************** OVERLAY DE SESSÃO INICIADA ***********************************/
    /* Função chamada quando é clicado botão de Histórico. */
    $("#historicobtn, #screen2-historicobtn").click(function () {
        $("#Historico, #screen2-historico").show();
    });

    /* Função chamada quando é clicado botão de Definições de Conta. */
    $("#definicoesContabtn, #screen2-definicoesContabtn").click(function () {
        $("#def-uname-txtbx, #screen2-def-uname-txtbx").val(getUname());
        $("#def-nif-numbx, #screen2-def-nif-numbx").val(getNif());
        $("#def-tel-numbx, #screen2-def-tel-numbx").val(getTel());
        $("#def-cpword-diff, #screen2-def-cpword-diff").hide();
        $("#DefinicoesConta, #screen2-definicoesConta").show();
    });

    /* Função chamada quando é clicado botão de Sair Sessão. */
    $("#sairSessaobtn, #screen2-sairSessaobtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair da sessão?", logout);
    });

    /*********************************** OVERLAY DE HISTÓRICO ***********************************/
    $("#boxHistoricoVoltarbtn, #screen2-boxHistoricoFecharbtn").click(function () {
        $("#Historico, #screen2-historico").hide();
    });

    /*********************************** OVERLAY DE DEFINIÇÕES DE CONTA ***********************************/
    $("#boxDefinicoesVoltarbtn, #screen2-boxDefinicoesVoltarbtn").click(function () {
        if (defsChanged())
            confirmYesNo("Tem a certeza que pretende descartar as alterações?", closeDefs);
        else
            closeDefs();
    });

    $("#boxDefinicoesGuardarbtn, #screen2-boxDefinicoesGuardarbtn").click(function () {
        if ($("input#def-pword-txtbx").val() === $("input#def-cpword-txtbx").val())
            confirmYesNo("Tem a certeza que pretende guardar as alterações?", saveDefs);
        else
            confirmOk("Por favor verifique a confirmação da palavra-passe.");
    });

    /* Sincronizar overlays de definições de contas: */
    $("#def-pword-txtbx").keyup(function () { $("#screen2-def-pword-txtbx").val($(this).val()); });
    $("#def-cpword-txtbx").keyup(function () { $("#screen2-def-cpword-txtbx").val($(this).val()); });
    $("#def-nif-numbx").keyup(function () { $("#screen2-def-nif-numbx").val($(this).val()); });
    $("#def-tel-numbx").keyup(function () { $("#screen2-def-tel-numbx").val($(this).val()); });
    $("#screen2-def-pword-txtbx").keyup(function () { $("#def-pword-txtbx").val($(this).val()); });
    $("#screen2-def-cpword-txtbx").keyup(function () { $("#def-cpword-txtbx").val($(this).val()); });
    $("#screen2-def-nif-numbx").keyup(function () { $("#def-nif-numbx").val($(this).val()); });
    $("#screen2-def-tel-numbx").keyup(function () { $("#def-tel-numbx").val($(this).val()); });

    /* Verificar se a palavra-passe e a sua confirmação correspondem. */
    $("input#def-pword-txtbx, input#def-cpword-txtbx, input#screen2-def-pword-txtbx, input#screen2-def-cpword-txtbx").keyup(function () {
        if ($("input#def-pword-txtbx").val() === $("input#def-cpword-txtbx").val() ||
                $("input#def-pword-txtbx").val() === "" ||
                $("input#def-cpword-txtbx").val() === "")
            $("#def-cpword-diff, #screen2-def-cpword-diff").hide();
        else
            $("#def-cpword-diff, #screen2-def-cpword-diff").show();
    });

    /*********************************** CHAMAR EMPREGADO ***********************************/
    var timeouts = [];
    $("#callbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende chamar um empregado?", function () {
            var waiterTime = 30;
            for (var i = 0; i <= waiterTime; i++)
                timeouts.push(setTimeout(updateTimer, i*1000, waiterTime - i));
            $("#callwaitbtn").show();
            $("#callbtn").hide();
        });
    });

    $("#cancelcallbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende cancelar?", function () {
            for (var i = 0; i < timeouts.length; i++)
                clearTimeout(timeouts[i]);
            timeouts = [];
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
