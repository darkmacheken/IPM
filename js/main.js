var currScreen = 1;

$(document).ready(function() {
    /* Esconder janelas inicialmente */
    $(".window, #blocker, #keyboard, #number-pad, .helpdiv, #boxcontautilizadorlogged, #Historico, .boxHistoricoRepetirPedido, #DefinicoesConta, #callwaitbtn, #second-screen, #screen2-logged-box, #screen2-historico, #screen2-definicoesConta, .screen3, #music-vote-next-hide, #box-music-vote-next").hide();

    /*********************************** JANELA DE AJUDA ***********************************/
    $("#helpbtn").click(function () {
        openWindow("help-window", windowPosition.TOP_LEFT);
    });

    /* Função chamada quando é clicado botão X na janela de ajuda. */
    $("#help-window-close-btn").click(function () {
        closeWindow("help-window");
    });

    /* Função chamada quando é clicado botão de voltar na janela de ajuda. */
    $(".helpdiv .back").click(function () {
        $(this).parents(".helpdiv").hide();
    });

    /* Funções chamada quando são clicados os botões do menu da janela de ajuda. */
    $("#help-window-pedidobtn").click(function () {
        $("#help-div-pedido").show();
    });
    $("#help-window-contabtn").click(function () {
        $("#help-div-conta").show();
    });
    $("#help-window-jogosbtn").click(function () {
        $("#help-div-jogos").show();
    });
    $("#help-window-musicabtn").click(function () {
        $("#help-div-musica").show();
    });

    /*********************************** JANELA DE LOGIN ***********************************/
    /* Função chamada quando é clicado botão de log-in no ecrã principal. */
    $("#login-btn, #screen2-login-btn").click(function () {
        if (currScreen === 3) {
            $("form#login-form-thirdScreen .calmText").removeClass("calmText").addClass("attentionText");
            openWindow("login-window-thirdScreen", windowPosition.DEFAULT);
            $("#invalid-data-thirdScreen").hide();
            $("#login-submit-disabler-thirdScreen").show();
            $("input#login-uname-txtbx-thirdScreen").focus();
        }
        else {
            $("form#login-form .calmText").removeClass("calmText").addClass("attentionText");
            openWindow("login-window", windowPosition.MIDDLE);
            $("#invalid-data").hide();
            $("#login-submit-disabler").show();
            $("input#login-uname-txtbx").focus();
        }
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#login-close-btn, #login-close-btn-thirdScreen").click(closeLoginWindow);

    /* Função chamada quando é clicado botão de log-in na janela de log-in. */
    $("#login-submit, #login-submit-thirdScreen").click(function () {
        if (currScreen === 3) {
            // Prevenir que o botao seja clicado acidentalmente quando desativado
            if (!checkForm("login-form-thirdScreen"))
                return;

            var uname = $.trim($("input#login-uname-txtbx-thirdScreen").val());
        	var pword = $.trim($("input#login-pword-txtbx-thirdScreen").val());
        	if (isLoginValid(uname, pword)) {
                login(uname);
                closeLoginWindow();
        	} else {
        		$("#invalid-data-thirdScreen").show();
        	}
        }
        else {
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
        }
    });

    $("#forgot-password-btn, #forgot-password-btn-thirdScreen").click(function () {
        openWindow("recover-password-box", windowPosition.DEFAULT, '5');
    });

    $("#recover-confirmNobtn").click(function () {
        closeWindow("recover-password-box");
        callblock();
        $("#recover-form").trigger("reset");
    });

    $("#recover-confirmYesbtn").click(function () {
        // Prevenir que o botao seja clicado acidentalmente quando desativado
        //if (!checkForm("login-form"))
        //    return;

        if (cellNumExists($("#recover-tel-numbx").val())) {
            closeWindow("recover-password-box");
            $("#recover-form").trigger("reset");
            confirmOk("Os seus dados foram enviados para o seu número de telemóvel.", windowPosition.MIDDLE, callblock);
        }
        else {
            confirmOk("O número inserido é desconhecido.", windowPosition.MIDDLE, function () {
                closeWindow("recover-password-box");
                openWindow("recover-password-box", windowPosition.DEFAULT, '5');
            });
        }
    });


    /*********************************** JANELA DE REGISTO ***********************************/
    /* Função chamada quando é clicado botão de registar no ecrã principal. */
    $("#reg-btn, #screen2-reg-btn").click(function () {
        if (currScreen === 3) {
            $("form#reg-form-thirdScreen .calmText").removeClass("calmText").addClass("attentionText");
            openWindow("reg-window-thirdScreen", windowPosition.DEFAULT);
            $("#reg-uname-exists-thirdScreen").hide();
            $("#reg-cpword-diff-thirdScreen").hide();
            $("#reg-submit-disabler-thirdScreen").show();
            $("input#reg-uname-txtbx-thirdScreen").focus();
        }
        else {
            $("form#reg-form .calmText").removeClass("calmText").addClass("attentionText");
            openWindow("reg-window", windowPosition.MIDDLE);
            $("#reg-uname-exists").hide();
            $("#reg-cpword-diff").hide();
            $("#reg-submit-disabler").show();
            $("input#reg-uname-txtbx").focus();
        }
    });

    /* Função chamada quando é clicado botão X na janela de log-in. */
    $("#reg-close-btn, #reg-close-btn-thirdScreen").click(closeRegistarWindow);

    /* Função chamada quando é clicado botão de registar na janela de registar. */
    $("#reg-submit, #reg-submit-thirdScreen").click(function () {
        var uname = "";
        var pword = "";
        var nif = "";
        var tel = "";
        if (currScreen === 3) {
            /* Prevenir que o botao seja clicado acidentalmente quando desativado */
            if (!checkForm("reg-form"))
                return;

            /* Assegurar-se que o NIF, se fornecido, tem 9 numeros */
            if (!checkNIF("reg-form-thirdScreen")) {
                confirmOk("Por favor verifique se introduziu corretamente o seu Número de Contribuinte (NIF).", windowPosition.TOP_RIGHT);
                return;
            }

        	uname = $.trim($("#reg-uname-txtbx-thirdScreen").val());
        	pword = $.trim($("#reg-pword-txtbx-thirdScreen").val());
            nif = $("#reg-nif-numbx-thirdScreen").val();
            tel = $("#reg-tel-numbx-thirdScreen").val();
        }
        else {
            /* Prevenir que o botao seja clicado acidentalmente quando desativado */
            if (!checkForm("reg-form"))
                return;

            /* Assegurar-se que o NIF, se fornecido, tem 9 numeros */
            if (!checkNIF("reg-form")) {
                confirmOk("Por favor verifique se introduziu corretamente o seu Número de Contribuinte (NIF).", windowPosition.MIDDLE);
                return;
            }

        	uname = $.trim($("#reg-uname-txtbx").val());
        	pword = $.trim($("#reg-pword-txtbx").val());
            nif = $("#reg-nif-numbx").val();
            tel = $("#reg-tel-numbx").val();
        }

        //var niff = nif;
        //if (nif == "")
        //    niff = "<span class=\"attentionText\">Não fornecido.</span>";

        //confirmYesNo("Tem a certeza que pretende criar uma conta com os seguintes dados?<br /><ul><li>Username: " + uname + "</li><li>NIF: " + niff + "</li><li>Telemóvel: " + tel + "</li></ul>",
        let pos = windowPosition.MIDDLE;
        if (currScreen === 3)
            pos = windowPosition.TOP_RIGHT;
        confirmYesNo("Tem a certeza que pretende criar uma conta com os dados inseridos?", pos,
        function () {
            createAccount(uname, pword, nif, tel);
            closeRegistarWindow();
            confirmOk("A sua conta foi criada com sucesso!", pos);
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

    $("input#reg-uname-txtbx-thirdScreen").keyup(function () {
        if (existsUser($("input#reg-uname-txtbx-thirdScreen").val()))
            $("#reg-uname-exists-thirdScreen").show();
        else
            $("#reg-uname-exists-thirdScreen").hide();
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
    $(".window").not("#order-pay-box").draggable({ cancel: ".btn, input, #user-player", containment: "#blocker", scroll: false });

    /* Janelas log-in e registo: Colocar asteriscos a vermelho caso campo não esteja preenchido */
    $("input.req-field").keyup(function () {
        if (($(this).hasClass("cellNumber") && $(this).val().length !== 9) || $.trim($(this).val()).length === 0) {
            $("#" + $(this).attr("name") + "-att, #" + $(this).attr("name") + "-att-thirdScreen").removeClass().addClass("attentionText");
        } else {
            $("#" + $(this).attr("name") + "-att, #" + $(this).attr("name") + "-att-thirdScreen").removeClass().addClass("calmText");
        }
        let formId = $(this).parents("form").attr("id");
        if (currScreen === 3)
            checkForm(formId.substring(0, formId.length - 12));
        else
            checkForm(formId);
    });

    /* So deixar colocar numeros no telemovel e no nif */
    $("input.numOnly").keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
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
        refreshHistorico();
        $("#rightBoxTitle").text("HISTÓRICO").css("background-image", "url(\"images/icons/account/history-white.png\")");
        $("#boxcontautilizadorlogged").hide();
        $("#Historico, #screen2-historico").show();
    });

    /* Função chamada quando é clicado botão de Definições de Conta. */
    $("#definicoesContabtn, #screen2-definicoesContabtn").click(function () {
        $("#rightBoxTitle").text("DEFINIÇÕES DE CONTA").css("background-image", "url(\"images/icons/account/definicoes-white.png\")");
        $("#def-uname-txtbx, #screen2-def-uname-txtbx").val(getUname());
        $("#def-nif-numbx, #screen2-def-nif-numbx").val(getNif());
        $("#def-tel-numbx, #screen2-def-tel-numbx").val(getTel());
        $("#def-uname-exists, #screen2-def-uname-exists").hide();
        $("#def-cpword-diff, #screen2-def-cpword-diff").hide();
        $("#boxcontautilizadorlogged").hide();
        $("#DefinicoesConta, #screen2-definicoesConta").show();
    });

    /* Função chamada quando é clicado botão de Sair Sessão. */
    $("#sairSessaobtn, #screen2-sairSessaobtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair da sessão?", windowPosition.TOP_RIGHT, logout);
    });

    /*********************************** OVERLAY DE HISTÓRICO ***********************************/
    $("#boxHistoricoVoltarbtn, #screen2-boxHistoricoFecharbtn").click(function () {
        closeHistorico();
    });

    $(".boxHistoricoRepetirPedidoVoltarbtn").click(function () {
        $(".boxHistoricoRepetirPedido").hide();
    });

    /*********************************** OVERLAY DE DEFINIÇÕES DE CONTA ***********************************/
    $("#boxDefinicoesVoltarbtn, #screen2-boxDefinicoesVoltarbtn").click(function () {
        if (defsChanged())
            confirmYesNo("Tem a certeza que pretende descartar as alterações?", windowPosition.TOP_RIGHT, closeDefs);
        else
            closeDefs();
    });

    $("#boxDefinicoesGuardarbtn, #screen2-boxDefinicoesGuardarbtn").click(function () {
        /* Assegurar-se que o username, se alterado, nao existe */
        if (existsUser($.trim($("#def-uname-txtbx").val()))) {
            confirmOk("O nome de utilizador inserido já existe. Por favor escolha outro.", windowPosition.TOP_RIGHT);
            return;
        }
        else if ($.trim($("#def-uname-txtbx").val()).length === 0) {
            confirmOk("Por favor insira um nome de utilizador válido.", windowPosition.TOP_RIGHT);
            return;
        }

        /* Assegurar-se que o NIF, se fornecido, tem 9 numeros */
        if (!checkNIF("def-form")) {
            confirmOk("Por favor verifique se introduziu corretamente o seu Número de Contribuinte (NIF).", windowPosition.TOP_RIGHT);
            return;
        }

        /* Assegurar-se que o nr de telemóvel tem 9 numeros */
        if (!checkTel("def-form")) {
            confirmOk("Por favor verifique se introduziu corretamente o seu Número de Telemóvel.", windowPosition.TOP_RIGHT);
            return;
        }

        /* Caso as definições não tenham sido alteradas, não pedir para guardar. */
        if (!defsChanged()) {
            closeDefs();
            return;
        }

        if ($("input#def-pword-txtbx").val() === $("input#def-cpword-txtbx").val())
            confirmYesNo("Tem a certeza que pretende guardar as alterações?", windowPosition.TOP_RIGHT, saveDefs);
        else
            confirmOk("Por favor verifique a confirmação da palavra-passe.", windowPosition.TOP_RIGHT);
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

    /* Verificar se o nome de utilizador já existe. */
    $("input#def-uname-txtbx, input#screen2-def-uname-txtbx").keyup(function () {
        if (existsUser($.trim($("#def-uname-txtbx").val())))
            $("#def-uname-exists, #screen2-uname-exists").show();
        else
            $("#def-uname-exists, #screen2-uname-exists").hide();
    });

    /* Verificar se a palavra-passe e a sua confirmação correspondem. */
    $("input#def-pword-txtbx, input#def-cpword-txtbx, input#screen2-def-pword-txtbx, input#screen2-def-cpword-txtbx").keyup(function () {
        if ($("input#def-pword-txtbx").val() === $("input#def-cpword-txtbx").val() ||
                $("input#def-cpword-txtbx").val() === "")
            $("#def-cpword-diff, #screen2-def-cpword-diff").hide();
        else
            $("#def-cpword-diff, #screen2-def-cpword-diff").show();
    });

    /*********************************** CHAMAR EMPREGADO ***********************************/
    var timeouts = [];
    $("#callbtn").click(function () {
        let pos = windowPosition.MIDDLE;
        if (currScreen === 3)
            pos = windowPosition.TOP_LEFT;
        confirmYesNo("Tem a certeza que pretende chamar um empregado?", pos, function () {
            var waiterTime = 30;
            for (var i = 0; i <= waiterTime; i++)
                timeouts.push(setTimeout(updateTimer, i*1000, waiterTime - i));
            $("#callwaitbtn").show();
            $("#callbtn").hide();
        });
    });

    $("#cancelcallbtn").click(function () {
        let pos = windowPosition.MIDDLE;
        if (currScreen === 3)
            pos = windowPosition.TOP_LEFT;
        confirmYesNo("Tem a certeza que pretende cancelar?", pos, function () {
            for (var i = 0; i < timeouts.length; i++)
                clearTimeout(timeouts[i]);
            timeouts = [];
            $("#callbtn").show();
            $("#callwaitbtn").hide();
        });
    });

    /*********************************** VOTAR EM MUSICA ***********************************/
    prepareMusicBox();

    /*********************************** GAMES ***********************************/
    prepareTicTacToeGame();
    prepareEsmurristoGame();
    preparePongGame();

    /*********************************** TECLADOS E KEYPADS ***********************************/
    $("input[type=text], input[type=password]").not(".numOnly").focus(function () {
        $("#keyboard").show();
    }).blur(function () {
        $("#keyboard").hide();
    });

    $("input[type=text].numOnly").focus(function () {
        $("#number-pad").show();
    }).blur(function () {
        $("#number-pad").hide();
    });

    /*$("*").not("input[type=text], input[type=password], #keyboard, #number-pad").mousedown(function () {
        $("#keyboard, #number-pad").hide();
    });
    /*********************************** SEGUNDA JANELA ***********************************/
    $("#orderfoodbtn").click(function () {
        if (currScreen === 1)
            enterScreen2();
        $("#music-vote-next-hide").click();
    });
    prepareScreen2();

    /*********************************** TERCEIRA JANELA ***********************************/
    prepareScreen3();

    /*********************************** FIM DO LOADING ***********************************/
    /* Página carregada */
    $("#loader").hide();
});
