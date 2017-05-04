var currentMenuSelected = "";
var currentOrderSelected = "";
var currentOrder = [];
var editingIndex = -1;

function prepareScreen2() {

    /**** Botões Principais ****/
    $("#menuPrincipalbtn").click(function () {
        if (currentOrder.length === 0)
            exitScreen2();
        else
            confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", exitScreen2);
    });

    $("#Confirmarbtn").click(enterScreen3);

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

    /**** Informacoes da comida ****/
    $("#moreInfo .Xbtn").click(function () {
        closeWindow("moreInfo");
    });

    /**** Editar ingredientes ****/
    $("#ingred-edit-save-btn").click(function () {
        closeWindow("editIngredients");
        var newIngredients = [];
        $("input[type=checkbox]").each(function () {
            if (!this.checked) {
                newIngredients.push(this.id.substring(13));
            }
        });
        currentOrder[editingIndex]._ingredients = newIngredients;
        showCurrentOrder();
    });

    $("#ingred-edit-cancel-btn").click(function () {
        closeWindow("editIngredients");
    });

}

function enterScreen2() {
    closeHistorico();
    closeDefs();

    currentOrder = []

    currentMenuSelected = "menu-entradas";
    $("#" + currentMenuSelected).addClass("selected");

    currentOrderSelected = "ord-classif";
    $("#" + currentOrderSelected).addClass("selected");

    showFoodItems();
    showCurrentOrder();

    $("#second-screen").show();

    currScreen = 2;
}

function exitScreen2() {
    closeHistorico();
    closeDefs();

    $("#second-screen").hide();
    $("#" + currentMenuSelected).removeClass("selected");
    $("#" + currentOrderSelected).removeClass("selected");
    $("#food-options").html("");

    currScreen = 1;
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
                    return b._classif - a._classif; // decrescente
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
        case "ord-alfa":
            FOOD_ITEMS[currentMenuSelected].sort(function (a, b) {
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
    $(".info").click(function (e) {
        e.stopPropagation();
        showInfo(FOOD_ITEMS[currentMenuSelected][getIndexNumber(this)]);
    });
}

function showCurrentOrder() {
    var orderHtml = "";
    var total = 0;
    for (var i = 0; i < currentOrder.length; i++) {
        var price = currentOrder[i]._price * currentOrder[i]._quantity;
        orderHtml += "<li class=\"box\" id=\"current-order-";
        orderHtml += String(i + 1);
        orderHtml += "\"><div class=\"background-li-box-compras\"> </div><div class=\"box btn editBox\"></div><div class=\"tituloCompra\">";
        orderHtml += currentOrder[i]._name;
        orderHtml += "</div>";
        if (isCostumized(currentOrder[i]))
            orderHtml += "<div class=\"attentionText costumizedWarning\">Personalizado</div>";
        orderHtml += "<input type=\"text\" class=\"qtd\" value=\"";
        orderHtml += currentOrder[i]._quantity;
        orderHtml += "\" disabled>\n<br />\n<div class=\"btn arrow-up\"></div><div class=\"btn arrow-down\"></div><div class=\"precoCompra\">";
        orderHtml += formatPrice(price);
        orderHtml += "</div><div class=\"box btn deleteBox\">X</div></li>";
        total += price;
    }
    if (currScreen === 3) {
        $("#view-order-items-box ul").html(orderHtml);
        $("#view-order-pay-box-total span").text(formatPrice(total+totalPrice(sessionOrder)));
    }
    else {
        $("#boxCompras ul").html(orderHtml);
        $("#totalBox span").text(formatPrice(total));
    }

    if (currentOrder.length === 0)
        $(".confirmarbtn .disabler").show();
    else
        $(".confirmarbtn .disabler").hide();

    $(".editBox").click(function () {
        editingIndex = getIndexNumber(this);
        let food = currentOrder[editingIndex];
        let origFood = getFoodByName(food._name);
        $("#editIngredients .foodImage").css("background-image", "url(" + origFood._img + ")");
        $("#editIngredients .foodTitle").text(food._name);
        let bgPos = "46% ";
        switch (origFood._classif) {
            case 0:
                bgPos += "70%";
                break;
            case 1:
                bgPos += "60%";
                break;
            case 2:
                bgPos += "50%";
                break;
            case 3:
                bgPos += "43%";
                break;
            case 4:
                bgPos += "30%"
                break;
            case 5:
                bgPos += "17%"
                break;
            default:
                // Não pode acontecer.
                ;
        }
        $("#editIngredients .classificacao").css("background-position", bgPos);
        $("#editIngredients .precoTitle span").text(formatPrice(food._price));
        $("#editIngredients #editIngredients-desc").text(origFood._desc);
        $("#editIngredients #editIngredients-ingredients").text(origFood._ingredientsString);

        let ingred = "";
        for (let i = 0; i < origFood._ingredients.length; i++) {
            ingred += "<li><input type=\"checkbox\" id=\"check-ingred-";
            ingred += origFood._ingredients[i];
            ingred += "\" ";
            let checked = true;
            for (let j = 0; j < food._ingredients.length; j++) {
                if (food._ingredients[j] === origFood._ingredients[i]) {
                    checked = false;
                    break;
                }
            }
            if (checked)
                ingred += "checked ";
            ingred += "/><label class=\"textIngredient\" for=\"check-ingred-";
            ingred += origFood._ingredients[i];
            ingred += "\">";
            ingred += origFood._ingredients[i];
            ingred += "</label></li>";
        }
        $("#editIngredients ul").html(ingred);
        openWindow("editIngredients");
    });

    $(".deleteBox").click(function () {
        deleteFromOrder(getIndexNumber(this));
    });

    $(".arrow-up").click(function () {
        currentOrder[getIndexNumber(this)]._quantity++;
        showCurrentOrder();
    });

    $(".arrow-down").click(function () {
        let id = getIndexNumber(this);
        if (currentOrder[id]._quantity > 1) {
            currentOrder[id]._quantity--;
            showCurrentOrder();
        }
        else {
            deleteFromOrder(id);
        }
    });
}

function addFoodToOrder(food, quantity, ingredients) {
    /*for (var i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i]._name === food._name &&
            currentOrder[i]._ingredients.length === food._ingredients.length) {
                currentOrder[i]._quantity++;
                showCurrentOrder();
                return;
            }
    }*/
    let q = 1;
    let ing = [];
    if (typeof quantity === "number")
        q = quantity;
    if (typeof ingredients === "object")
        ing = ingredients;
    currentOrder.push({
        _name: food._name,
        _price: food._price,
        _quantity: q,
        _ingredients: ing
    });
    showCurrentOrder();
}

function showInfo(food) {
    $("#moreInfo .foodImage").css("background-image", "url(" + food._img + ")");
    $("#moreInfo .foodTitle").text(food._name);
    let bgPos = "46% ";
    switch (food._classif) {
        case 0:
            bgPos += "70%";
            break;
        case 1:
            bgPos += "60%";
            break;
        case 2:
            bgPos += "50%";
            break;
        case 3:
            bgPos += "43%";
            break;
        case 4:
            bgPos += "30%"
            break;
        case 5:
            bgPos += "17%"
            break;
        default:
            // Não pode acontecer.
            ;
    }
    $("#moreInfo .classificacao").css("background-position", bgPos);
    $("#moreInfo .precoTitle span").text(formatPrice(food._price));
    $("#moreInfo #moreInfo-desc").text(food._desc);
    let ingred = "";
    for (var i = 0; i < food._ingredients.length; i++)
        ingred += food._ingredients[i] + ", ";
    $("#moreInfo #moreInfo-ingredients").text(ingred.substring(0, ingred.length - 2) + ".");
    openWindow("moreInfo");
}

function deleteFromOrder(foodId) {
    confirmYesNo("Tem a certeza que pretende eliminar \"" + currentOrder[foodId]._name + "\" do seu pedido?", function () {
        currentOrder.splice(foodId, 1);
        showCurrentOrder();
    });
}

function getIndexNumber(obj) {
    if ($.contains($("#food-options")[0], obj) || $.contains($("#box-order-menu ul")[0], obj)) {
        var id = $(obj).attr("id");
        if (typeof id === "undefined")
            id = $(obj).parent().attr("id");
        return parseInt(id.substring(8, id.length - 4)) - 1;
    }
    else if ($.contains($("#boxCompras")[0], obj) || $.contains($("#view-order-items-box")[0], obj)) {
        return parseInt($(obj).parent().attr("id").substring(14)) - 1;
    }
}

function isCostumized(food) {
    //return getFoodByName(food._name)._ingredients.length !== food._ingredients.length;
    return food._ingredients.length !== 0;
}
