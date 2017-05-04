var sessionOrder = [];
var whoOpenedViewOrder = 0;
var paying = false;

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
    });

    $("#view-order-hide-btn").click(function () {
        whoOpenedViewOrder = 0;
        $("#view-order-btn").show();
        $("#view-order-items-box").hide();
        $("#view-all-orders-items-box").hide();
        $("#box-conta-utilizador-all").show();
        $(this).hide();
    });

    $("#pay-btn").click(function () {
        if (totalPrice(sessionOrder) === 0)
            return;
        $("#view-order-hide-btn").click();
        currScreen = 1;
        openWindow("order-pay-box");
        currScreen = 3;
        $("#view-order-pay-box").hide();
    });

    $("#order-pay-cancel-btn").click(function () {
        if (paying)
            return;
        closeWindow("order-pay-box");
        $("#view-order-pay-box").show();
    });

    $("#view-order-confirmarbtn").click(function () {
        if (currentOrder.length === 0)
            return;

        confirmYesNo("Tem a certeza que pretende fazer o pedido?", function () {
            $("#view-order-hide-btn").click();
            sessionOrder = sessionOrder.concat(currentOrder);
            sessionOrder = compactOrder(sessionOrder);
            currentOrder = [];
            //$("#view-order-pay-box-total span").text(formatPrice(totalPrice(sessionOrder)));
            showCurrentOrder();
        });
    });

    $("#view-items-current-order").click(function () {
        showCurrentOrder();
        $("#view-order-items-box").show();
        $("#view-all-orders-items-box").hide();
    });

    $("#view-items-all-orders").click(function () {
        showAllOrders();
        $("#view-all-orders-items-box").show();
        $("#view-order-items-box").hide();
    });

    $("#order-pay-money-btn, #order-pay-creditcard-btn").click(function () {
        $("#transacao").show();
        paying = true;
        $("#order-pay-cancel-btn .disabler").show();
        setTimeout(function () {
            if (loggedIn.length !== 0) {
                ;
            }
            sessionOrder = [];
            //$("#view-order-pay-box-total span").text(formatPrice(0));
            $("#transacao").hide();
            closeWindow("order-pay-box");
            $("#view-order-pay-box").show();
            paying = false;
            $("#order-pay-cancel-btn .disabler").hide();
            showCurrentOrder();
        }, 5000);
    });

    $("#order-pay-cancel-btn .disabler, #pay-btn .disabler").hide();

}

function enterScreen3() {
    if (currentOrder.length === 0)
        return;

    //var ordered = compactOrder(currentOrder);

    confirmYesNo("Tem a certeza que pretende fazer o pedido?", function () {
        $("#orderfoodbtn").hide();
        exitScreen2();
        sessionOrder = sessionOrder.concat(compactOrder(currentOrder));
        currentOrder = [];
        currScreen = 3;
        $("#view-order-pay-box-total span").text(formatPrice(totalPrice(sessionOrder)));
        $("#order-again-btn").show();
        $("#view-order-pay-box").show();
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

function totalPrice(order) {
    let price = 0;
    for (let i = 0; i < order.length; i++)
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
        boxContent += "-btn\"><div class=\"titulo3ecran\">";
        boxContent += FOOD_ITEMS[menuName][i]._name;
        boxContent += "</div><div class=\"descricao3ecran\">";
        boxContent += FOOD_ITEMS[menuName][i]._desc;
        boxContent += "</div><div class=\"preco3ecran\">";
        boxContent += formatPrice(FOOD_ITEMS[menuName][i]._price);
        boxContent += "</div><div class=\"box btn info3ecran\">+ informações</div></li>";
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
    for (var i = 0; i < sessionOrder.length; i++) {
        allOrderTxt += "<tr><td>";
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
        allOrderTxt += "</td><td>";
        allOrderTxt += formatPrice(sessionOrder[i]._price * sessionOrder[i]._quantity);
        allOrderTxt += "</td></tr>";
    }
    $("#view-all-orders-table").html(allOrderTxt);
}
