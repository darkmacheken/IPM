var sessionOrder = [];
var whoOpenedViewOrder = 0;

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
        $("#view-order-items-box").show();
        $(this).hide();
    });

    $("#view-order-hide-btn").click(function () {
        whoOpenedViewOrder = 0;
        $("#view-order-btn").show();
        $("#view-order-items-box").hide();
        $(this).hide();
    });

    $("#pay-btn").click(function () {
        $("#view-order-hide-btn").click();
        $("#order-pay-box").show();
        $("#view-order-pay-box").hide();
    });

    $("#order-pay-cancel-btn").click(function () {
        $("#order-pay-box").hide();
        $("#view-order-pay-box").show();
    });
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
        //addFoodToOrder(FOOD_ITEMS[menuName][getIndexNumber(this)]);
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
