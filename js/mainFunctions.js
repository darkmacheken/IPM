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
    $(".logged-uname").text(getUname());
}

function deleteLoginData() {
    $(".logged-uname").text("");
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
    return $("input#def-uname-txtbx").val() !== getUname() ||
            $("input#def-pword-txtbx").val() !== "" ||
            $("input#def-cpword-txtbx").val() !== "" ||
            $("input#def-nif-numbx").val() !== getNif() ||
            $("input#def-tel-numbx").val() !== getTel();
}

function saveDefs() {
    if ($("input#def-uname-txtbx").val() !== getUname())
        setUname($("input#def-uname-txtbx").val());
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
        $(".boxHistoricoRepetirPedido").hide();
        $("#boxcontautilizadorlogged").show();
    }
}

function refreshHistorico() {
    var boxContent = "";
    var history = getHistory();
    for (var i = history.length-1; i >= 0; i--) {
        var orderDate = getOrderDate(history[i]);
        boxContent += "<li class=\"";
        boxContent += String(i);
        boxContent += "\"><div class=\"box btn boxHistoricoPedidobtn\">";
        boxContent += orderDate.getDate() + "/" + orderDate.getMonth() + "/" + orderDate.getFullYear() + " " + orderDate.getHours() + ":" + orderDate.getMinutes();
        boxContent += "<br/>Ver pedido ";
        boxContent += getOrderNumber(history[i]);
        boxContent += "</div><div class=\"box btn boxHistoricoRepetirPedidobtn\">Repetir Pedido</div><div class=\"box btn boxHistoricoXbtn Xbtn\">X</div></li>";
    }
    $("#boxHistorico ul, #screen2-boxHistorico ul").html(boxContent);

    $(".boxHistoricoPedidobtn").click(function () {
        var order = getHistory()[parseInt($(this).parents("li").attr("class"))];
        $(".hist-info").text("Pedido " + getOrderNumber(order) + " - 12/04/2017 - 19:38");
        $(".hist-total").text("Total: " + formatPrice(getOrderPrice(order)));
        var histOrderTxt = "";
        var orderFoods = getOrderFoods(order);
        for (var i = 0; i < orderFoods.length; i++) {
            histOrderTxt += orderFoods[i]._quantity + "x " + orderFoods[i]._name;
            let ofilen = orderFoods[i]._ingredients.length;
            if (ofilen !== 0) {
                histOrderTxt += " s/ ";
                for (var j = 0; j < ofilen; j++) {
                    histOrderTxt += orderFoods[i]._ingredients[j];
                    if (j === ofilen - 1)
                        histOrderTxt += ".";
                    else if (j === ofilen - 2)
                        histOrderTxt += " e ";
                    else
                        histOrderTxt += ", ";
                }
            }
            histOrderTxt += "<br />\n";
        }
        $(".hist-order").html(histOrderTxt);
        $(".boxHistoricoRepetirPedido").show();
    });

    $(".boxHistoricoXbtn").click(function () {
        var orderId = parseInt($(this).parents("li").attr("class"));
        confirmYesNo("Tem a certeza que pretende apagar o seu pedido n.º " + getOrderNumber(getHistory()[orderId]) + "?", function () {
            deleteFromHistory(orderId);
            refreshHistorico();
        });
    });
}

function formatPrice(price) {
    var cents = String(price % 100);
    if (cents.length === 1)
        cents = "0" + cents;
    return String(Math.floor(price/100)) + "," + cents + "€";
}
