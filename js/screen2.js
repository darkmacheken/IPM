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

        $("#second-screen").show();
    });

    $("#menuPrincipalbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", function () {
            closeHistorico();
            closeDefs();
            currentOrder = [];

            $("#second-screen").hide();
            $("#" + currentMenuSelected).removeClass("selected");
            $("#" + currentOrderSelected).removeClass("selected");
        });
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
        boxContent += "<li class=\"box opcao\"><div class=\"titulo\">";
        boxContent += FOOD_ITEMS[currentMenuSelected][i]._name;
        boxContent += "</div><div class=\"descricao\">";
        boxContent += FOOD_ITEMS[currentMenuSelected][i]._desc;
        boxContent += "</div><div class=\"preco\">";
        boxContent += formatPrice(FOOD_ITEMS[currentMenuSelected][i]._price);
        boxContent += "</div><div class=\"box btn info\">+ informações</div></li>";
    }
    $("#food-options").html(boxContent);
}
