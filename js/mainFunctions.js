/* Verificar se um formulario foi preenchido */
function checkForm(form) {
    var reqReady = true;
    var pconfReady = false;
    let suffx = "";

    if (currScreen === 3 && form !== "recover-form")
        suffx = "-thirdScreen";

    $("form#" + form + suffx + " input.req-field").each(function() {
        if (($(this).hasClass("cellNumber") && $(this).val().length !== 9) || $.trim($(this).val()).length === 0)
            reqReady = false;
    });

    if ($("input#reg-pword-txtbx" + suffx).val() === $("input#reg-cpword-txtbx" + suffx).val())
        pconfReady = true;
    if (existsUser($("input#reg-uname-txtbx" + suffx).val()))
        pconfReady = false;

    if (reqReady) {
        if (pconfReady)
            $("form#" + form + suffx + " div.disabler").hide();
        else
            $("form#" + form + suffx + " div.disabler").show();
        $("form#" + form + suffx + " span.att-warning").removeClass().addClass("att-warning").addClass("calmText");
	} else {
		$("form#" + form + suffx + " div.disabler").show();
        $("form#" + form + suffx + " span.att-warning").removeClass().addClass("att-warning").addClass("attentionText");
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
        $("#rightBoxTitle").text("CONTA DE UTILIZADOR").css("background-image", "url(\"images/icons/account/user-white.png\")");
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
        $("#rightBoxTitle").text("CONTA DE UTILIZADOR").css("background-image", "url(\"images/icons/account/user-white.png\")");
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
        $(".boxRepetirPedidobtn").off("click").click(function () {
            repeatOrder(order);
        })
        $(".boxHistoricoRepetirPedido").show();
    });

    $(".boxHistoricoRepetirPedidobtn").click(function () {
        var order = getHistory()[parseInt($(this).parents("li").attr("class"))];
        repeatOrder(order);
    });

    $(".boxHistoricoXbtn").click(function () {
        var orderId = parseInt($(this).parents("li").attr("class"));
        confirmYesNo("Tem a certeza que pretende apagar o seu pedido n.º " + getOrderNumber(getHistory()[orderId]) + "?",
        windowPosition.TOP_RIGHT,
        function () {
            deleteFromHistory(orderId);
            refreshHistorico();
        });
    });
}

function repeatOrder(order) {
    var orderFoods = getOrderFoods(order);
    confirmYesNo("Tem a certeza que pretende repetir o pedido " + getOrderNumber(order) + "?",
    windowPosition.TOP_RIGHT,
    function () {
        $("#orderfoodbtn").click();
        for (let i = 0; i < orderFoods.length; i++) {
            addFoodToOrder(getFoodByName(orderFoods[i]._name), orderingId, orderFoods[i]._quantity, orderFoods[i]._ingredients);
        }
        orderingId++;
        closeHistorico();
        if (currScreen === 3) {
            $("#view-order-btn").click();
            $("#view-items-current-order").click();
        }
    });
}

function formatPrice(price) {
    var cents = String(price % 100);
    if (cents.length === 1)
        cents = "0" + cents;
    return String(Math.floor(price/100)) + "," + cents + "€";
}

function games_windowAdjust() {
    if (currScreen === 3) {
        $(".gamewindow").css("width", "450px").css("height", "450px").css("font-size","11px");
    }
}

function resetAllInterface() {
    currScreen = 1;
    sessionOrder = [];
    whoOpenedViewOrder = 0;
    showingOrders = false;
    lastPaidOrder = 0;
    orderingId = 1;
    timer_clearTimeouts();
    $("*").off();
    prepareAll(false);
}
