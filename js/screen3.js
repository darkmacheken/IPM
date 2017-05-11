var sessionOrder = [];
var whoOpenedViewOrder = 0;
var paying_timeout;
var showingOrders = false;
var lastPaidOrder = 0;

function prepareScreen3() {
    $("#order-again-btn").click(function () {
        $(this).hide();
        $("#box-games").hide();
        $("#order-again-hide-btn").show();
        $("#box-order-again").show();
        $("#order-pay-cancel-btn").click();
        if (whoOpenedViewOrder === 0) {
            $("#view-order-btn").click();
            whoOpenedViewOrder = 2;
        }
    });

    $("#order-again-hide-btn").click(function () {
        $(this).hide();
        $("#box-games").show();
        $("#box-order-again").hide();
        $("#order-again-btn").show();
        if (whoOpenedViewOrder === 2)
            $("#view-order-hide-btn").click();
    });

    $("#menu-order-again-entradas").click(function () {
        openOrderAgainMenu("menu-entradas", "Entradas");
    });

    $("#menu-order-again-sopas").click(function () {
        openOrderAgainMenu("menu-sopas", "Sopas");
    });

    $("#menu-order-again-pratos").click(function () {
        openOrderAgainMenu("menu-pratos", "Pratos");
    });

    $("#menu-order-again-bebidas").click(function () {
        openOrderAgainMenu("menu-bebidas", "Bebidas");
    });

    $("#menu-order-again-sobremesas").click(function () {
        openOrderAgainMenu("menu-sobremesas", "Sobremesas");
    });

    $("#menu-order-again-cafetaria").click(function () {
        openOrderAgainMenu("menu-cafetaria", "Cafetaria");
    });

    $("#order-menu-back").click(function () {
        closeOrderAgainMenu();
    });

    $("#view-order-btn").click(function () {
        whoOpenedViewOrder = 1;
        $("#view-order-hide-btn").show();
        if (currentOrder.length === 0)
            $("#view-items-all-orders").click();
        else
            $("#view-items-current-order").click();
        $("#box-conta-utilizador-all").hide();
        $(this).hide();
        $("#view-order-items-box-wrapper").show();
    });

    $("#view-order-hide-btn").click(function () {
        whoOpenedViewOrder = 0;
        $("#view-order-btn").show();
        $("#view-order-items-box").hide();
        $("#view-all-orders-items-box").hide();
        $("#box-conta-utilizador-all").show();
        $(this).hide();
        $("#view-order-items-box-wrapper").hide();
        showingOrders = false;
    });

    $("#pay-btn").click(function () {
        if (totalPrice(sessionOrder, lastPaidOrder) === 0)
            return;
        $("#view-order-hide-btn").click();
        openWindow("order-pay-box", windowPosition.DEFAULT);
        $("#view-order-pay-box").hide();
    });

    $("#order-pay-cancel-btn").click(function () {
        closeWindow("order-pay-box");
        $("#view-order-pay-box").show();
    });

    $("#view-order-confirmarbtn").click(function () {
        if (currentOrder.length === 0)
            return;

        confirmYesNo("Tem a certeza que pretende fazer o pedido?",
        windowPosition.BOTTOM_RIGHT,
        function () {
            $("#view-order-hide-btn").click();
            sessionOrder = sessionOrder.concat(currentOrder);
            //sessionOrder = compactOrder(sessionOrder);
            timer_addOrder(currentOrder);
            currentOrder = [];
            showCurrentOrder();
        });
    });

    $("#view-items-current-order").click(function () {
        showCurrentOrder();
        $("#view-order-items-box").show();
        $("#view-all-orders-items-box").hide();
        $(this).addClass("selected");
        $("#view-items-all-orders").removeClass("selected");
        showingOrders = false;
    });

    $("#view-items-all-orders").click(function () {
        showAllOrders();
        $("#view-all-orders-items-box").show();
        $("#view-order-items-box").hide();
        $(this).addClass("selected");
        $("#view-items-current-order").removeClass("selected");
    });

    $("#order-pay-money-btn, #order-pay-creditcard-btn").click(function () {
        confirmYesNo("Tem a certeza que pretende pagar?",
        windowPosition.BOTTOM_RIGHT,
        function () {
            callblock();
            $("#transacao").show();
            paying_timeout = setTimeout(pay_timeout, 5000);
        });
    });

    $("#order-pay-cancel-transaction-btn").click(function () {
        clearTimeout(paying_timeout);
        confirmYesNo("Tem a certeza que pretende cancelar a transação?",
        windowPosition.BOTTOM_RIGHT,
        function () {
            $("#transacao").hide();
        },
        function () {
            paying_timeout = setTimeout(pay_timeout, 3000);
        });
    });

    $("#order-pay-cancel-btn .disabler, #pay-btn .disabler").hide();

}

function enterScreen3() {
    if (currentOrder.length === 0)
        return;

    //var ordered = compactOrder(currentOrder);

    confirmYesNo("Tem a certeza que pretende fazer o pedido?",
    windowPosition.MIDDLE,
    function () {
        $("#orderfoodbtn").hide();
        exitScreen2();
        sessionOrder = sessionOrder.concat(compactOrder(currentOrder));
        currentOrder = [];
        currScreen = 3;
        showCurrentOrder();
        $("#order-again-btn").show();
        $("#view-order-pay-box").show();
        timer_init();
    });
}

function exitScreen3() {
    $(".screen3").hide();
    $("#orderfoodbtn").show();
}

function compactOrder(order) {
    let compact = [];
    for (let i = 0; i < order.length; i++) {
        let notfound = true;
        for (let j = 0; j < compact.length; j++) {
            if (sameOrder(order[i], compact[j])) {
                compact[j]._quantity += order[i]._quantity;
                notfound = false;
                break;
            }
        }
        if (notfound)
            compact.push(order[i]);
    }
    return compact;
}

function sameOrder(order1, order2) {
    return order1._name === order2._name &&
            order1._price === order2._price &&
            order1._ingredients.length === order2._ingredients.length;
}

function totalPrice(order, start) {
    let price = 0;
    if (typeof start !== "number")
        start = 0
    for (let i = start; i < order.length; i++)
        price += order[i]._price * order[i]._quantity;
    return price;
}

function openOrderAgainMenu(menuName, menuTitle) {
    $("#order-again-title").text(menuTitle);

    /* Ordenação dos items por ordem alfabetica */
    FOOD_ITEMS[menuName].sort(function (a, b) {
        return a._name > b._name ? 1 : -1;
    });

    /* Mostrar items */
    var boxContent = "";
    for (var i = 0; i < FOOD_ITEMS[menuName].length; i++) {
        boxContent += "<li class=\"box btn\" id=\"food-op-";
        boxContent += String(i + 1);
        boxContent += "-btn\"><div class=\" opcao opcao3ecran\"><div class=\"titulo3ecran\">";
        boxContent += FOOD_ITEMS[menuName][i]._name;
        boxContent += "</div><div class=\"descricao3ecran\">";
        boxContent += FOOD_ITEMS[menuName][i]._desc;
        boxContent += "</div><div class=\"preco3ecran\">";
        boxContent += formatPrice(FOOD_ITEMS[menuName][i]._price);
        boxContent += "</div><div class=\"box btn info3ecran\">+</div></div></li>";
    }
    $("#box-order-menu ul").html(boxContent);
    $("#box-order-menu ul li").click(function () {
        $("#view-order-btn").click();
        $("#view-items-current-order").click();
        addFoodToOrder(FOOD_ITEMS[menuName][getIndexNumber(this)]);
    });
    $(".info3ecran").click(function (e) {
        e.stopPropagation();
        showInfo(FOOD_ITEMS[menuName][getIndexNumber(this)]);
    });

    $("#box-order-menu").show();
    $("#order-menu-back").show();
}

function closeOrderAgainMenu() {
    $("#box-order-menu").hide();
    $("#order-menu-back").hide();
    $("#box-order-menu ul").html("");
    $("#order-again-title").text("Fazer Novo Pedido");
}

function showAllOrders() {
    let allOrderTxt = ""
    if (lastPaidOrder > 0)
        allOrderTxt += "<tr><td colspan=\"3\" style=\"color:#009ee1;font-weight: bold; text-align:center;\">Pago:</td></tr>";
    for (var i = 0; i < sessionOrder.length; i++) {
        if (lastPaidOrder > 0 && lastPaidOrder === i)
            allOrderTxt += "<tr><td colspan=\"3\" style=\"color:#B22222;;font-weight: bold; text-align:center;\">Não pago:</td></tr>";
        allOrderTxt += "<tr><td style=\"width: 50px;\">";
        allOrderTxt += sessionOrder[i]._quantity + "x</td><td>" + sessionOrder[i]._name;
        let ofilen = sessionOrder[i]._ingredients.length;
        if (ofilen !== 0) {
            allOrderTxt += " s/ ";
            for (var j = 0; j < ofilen; j++) {
                allOrderTxt += sessionOrder[i]._ingredients[j];
                if (j === ofilen - 1)
                    allOrderTxt += ".";
                else if (j === ofilen - 2)
                    allOrderTxt += " e ";
                else
                    allOrderTxt += ", ";
            }
        }
        allOrderTxt += "</td><td style=\"width: 70px;text-align: right;\">";
        allOrderTxt += formatPrice(sessionOrder[i]._price * sessionOrder[i]._quantity);
        allOrderTxt += "</td></tr><tr class=\"vieworder-timer-row\" id=\"vieworder-timer-";
        allOrderTxt += String(i);
        allOrderTxt += "\"><th colspan=\"3\">&emsp;&emsp;Tempo previsto: <span class=\"vieworder-timer\"></span></th></tr>";
    }
    $("#view-all-orders-table").html(allOrderTxt);
    $(".vieworder-timer-row").hide();
    showingOrders = true;
    timer_update();
}

function pay_timeout() {
    addToHistory(sessionOrder.slice(lastPaidOrder, sessionOrder.length));
    sessionOrder = compactOrder(sessionOrder);
    lastPaidOrder = sessionOrder.length;
    $("#transacao").hide();
    closeWindow("order-pay-box");
    $("#view-order-pay-box").show();
    showCurrentOrder();
}
