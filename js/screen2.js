var currentMenuSelected = "";
var currentOrderSelected = "";
var currentOrder = [];

function prepareScreen2() {

    /**** Botões Principais ****/
    $("#orderfoodbtn").click(function () {
        closeHistorico();
        closeDefs();

        currentMenuSelected = "menu-entradas";
        $("#" + currentMenuSelected).addClass("selected");

        currentOrderSelected = "ord-classif";
        $("#" + currentOrderSelected).addClass("selected");

        showFoodItems();
        showCurrentOrder();

        $("#second-screen").show();
    });

    $("#menuPrincipalbtn").click(function () {
        if (currentOrder.length === 0)
            exitScreen2();
        else
            confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", exitScreen2);
    });

    $("#Confirmarbtn").click(function () {
        if (currentOrder.length === 0)
            return;

        confirmYesNo("Tem a certeza que pretende fazer o pedido?", exitScreen2)
    });

    /**** Menu lateral esquerdo ****/
    $(".menuEmenta").click(function () {
        /* Selecionar botao do menu clicado */
        $("#" + currentMenuSelected).removeClass("selected");
        $(this).addClass("selected");
        currentMenuSelected = $(this).attr("id");

        /* Mostrar items */
        showFoodItems();
    });

    /**** Ordenação ****/
    $("#textOrdenacao span").click(function () {
        /* Selecionar botao do menu clicado */
        $("#" + currentOrderSelected).removeClass("selected");
        $(this).addClass("selected");
        currentOrderSelected = $(this).attr("id");

        /* Mostrar items */
        showFoodItems();
    });

}

function exitScreen2() {
    closeHistorico();
    closeDefs();
    currentOrder = [];

    $("#second-screen").hide();
    $("#" + currentMenuSelected).removeClass("selected");
    $("#" + currentOrderSelected).removeClass("selected");
}

function showFoodItems() {
    /* Ordenação dos items */
    switch (currentOrderSelected) {
        case "ord-price":
            FOOD_ITEMS[currentMenuSelected].sort(function (a, b) {
                if (a._price !== b._price)
                    return a._price - b._price;
                else
                    return a._name > b._name ? 1 : -1;
            });
            break;
        case "ord-classif":
            FOOD_ITEMS[currentMenuSelected].sort(function (a, b) {
                if (a._classif !== b._classif)
                    return a._classif - b._classif;
                else
                    return a._name > b._name ? 1 : -1;
            });
            break;
        case "ord-ctime":
            FOOD_ITEMS[currentMenuSelected].sort(function (a, b) {
                if (a._ctime !== b._ctime)
                    return a._ctime - b._ctime;
                else
                    return a._name > b._name ? 1 : -1;
            });
            break;
        default:
            console.log("Erro ao selecionar ordenação: '" + currentOrderSelected + "'");
    }

    /* Mostrar items */
    var boxContent = "";
    for (var i = 0; i < FOOD_ITEMS[currentMenuSelected].length; i++) {
        boxContent += "<li class=\"box btn opcao\" id=\"food-op-";
        boxContent += String(i + 1);
        boxContent += "-btn\"><div class=\"titulo\">";
        boxContent += FOOD_ITEMS[currentMenuSelected][i]._name;
        boxContent += "</div><div class=\"descricao\">";
        boxContent += FOOD_ITEMS[currentMenuSelected][i]._desc;
        boxContent += "</div><div class=\"preco\">";
        boxContent += formatPrice(FOOD_ITEMS[currentMenuSelected][i]._price);
        boxContent += "</div><div class=\"box btn info\">+ informações</div></li>";
    }
    $("#food-options").html(boxContent);
    $(".opcao").click(function () {
        addFoodToOrder(FOOD_ITEMS[currentMenuSelected][getIndexNumber(this)]);
    });
}

function showCurrentOrder() {
    var orderHtml = "";
    var total = 0;
    for (var i = 0; i < currentOrder.length; i++) {
        var price = currentOrder[i]._price * currentOrder[i]._quantity;
        orderHtml += "<li class=\"box\" id=\"current-order-";
        orderHtml += String(i + 1);
        orderHtml += "\"><div class=\"box btn editBox\"></div><div class=\"tituloCompra\">";
        orderHtml += currentOrder[i]._name;
        orderHtml += "</div><input type=\"text\" class=\"qtd\" value=\"";
        orderHtml += currentOrder[i]._quantity;
        orderHtml += "\" disabled>\n<br />\n<div class=\"btn arrow-up\"></div><div class=\"btn arrow-down\"></div><div class=\"precoCompra\">";
        orderHtml += formatPrice(price);
        orderHtml += "</div><div class=\"box btn deleteBox\">X</div></li>";
        total += price;
    }
    $("#boxCompras ul").html(orderHtml);
    $("#totalBox span").text(formatPrice(total));

    if (currentOrder.length === 0)
        $("#Confirmarbtn .disabler").show();
    else
        $("#Confirmarbtn .disabler").hide();

    $(".deleteBox").click(function () {
        deleteFromOrder(getIndexNumber(this));
    });

    $(".arrow-up").click(function () {
        currentOrder[getIndexNumber(this)]._quantity++;
        showCurrentOrder();
    });

    $(".arrow-down").click(function () {
        var id = getIndexNumber(this);
        if (currentOrder[id]._quantity > 1) {
            currentOrder[id]._quantity--;
            showCurrentOrder();
        }
        else {
            deleteFromOrder(id);
        }
    });
}

function addFoodToOrder(food) {
    for (var i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i]._name === food._name &&
            currentOrder[i]._ingredients.length === food._ingredients.length) {
                currentOrder[i]._quantity++;
                showCurrentOrder();
                return;
            }
    }
    currentOrder.push({
        _name: food._name,
        _price: food._price,
        _quantity: 1,
        _ingredients: food._ingredients
    });
    showCurrentOrder();
}

function deleteFromOrder(foodId) {
    confirmYesNo("Tem a certeza que pretende eliminar \"" + currentOrder[foodId]._name + "\" do seu pedido?", function () {
        currentOrder.splice(foodId, 1);
        showCurrentOrder();
    });
}

function getIndexNumber(obj) {
    if ($.contains($("#food-options")[0], obj)) {
        var id = $(obj).attr("id");
        return parseInt(id.substring(8, id.length - 4)) - 1;
    }
    if ($.contains($("#boxCompras")[0], obj)) {
        return parseInt($(obj).parent().attr("id").substring(14)) - 1;
    }
}
