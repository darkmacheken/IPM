var sessionOrder = [];

function prepareScreen3() {
    $("#order-again-btn").click(function () {
        $(this).hide();
        $("#order-again-hide-btn").show();
        $("#box-order-again").show();
    });

    $("#order-again-hide-btn").click(function () {
        $(this).hide();
        $("#box-order-again").hide();
        $("#order-again-btn").show();
    });

    $("#menu-order-again-entradas").click(function () {
        openOrderAgainMenu("menu-entradas");
    });

    $("#menu-order-again-sopas").click(function () {
        openOrderAgainMenu("menu-sopas");
    });

    $("#menu-order-again-pratos").click(function () {
        openOrderAgainMenu("menu-pratos");
    });

    $("#menu-order-again-bebidas").click(function () {
        openOrderAgainMenu("menu-bebidas");
    });

    $("#menu-order-again-sobremesas").click(function () {
        openOrderAgainMenu("menu-sobremesas");
    });

    $("#menu-order-again-cafetaria").click(function () {
        openOrderAgainMenu("menu-cafetaria");
    });

    $("#order-menu-back").click(function () {
        closeOrderAgainMenu();
    });
}

function enterScreen3() {
    if (currentOrder.length === 0)
        return;

    //var ordered = compactOrder(currentOrder);

    confirmYesNo("Tem a certeza que pretende fazer o pedido?", function () {
        exitScreen2();
        sessionOrder = sessionOrder.concat(compactOrder(currentOrder));
        currentOrder = [];
        screen = 3;
        $("#view-order-pay-box-total span").text(formatPrice(totalPrice(sessionOrder)));
        $("#order-again-btn").show();
        $("#view-order-pay-box").show();
    });
}

function exitScreen3() {
    ;
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

function openOrderAgainMenu(menuName) {
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
}
