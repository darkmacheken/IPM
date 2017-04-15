var currentMenuSelected = "";
var currentOrderSelected = "";
var ordered = [];

function prepareScreen2() {

    /**** Botões Principais ****/
    $("#orderfoodbtn").click(function () {
        currentMenuSelected = "menu-entradas";
        $("#" + currentMenuSelected).addClass("selected");
        showFoodItems();

        currentOrderSelected = "ord-classif";
        $("#" + currentOrderSelected).addClass("selected");

        $("#second-screen").show();
    });

    $("#menuPrincipalbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", function () {
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

function formatPrice(price) {
    var cents = String(price % 100);
    if (cents.length === 1)
        cents = "0" + cents;
    return String(Math.floor(price/100)) + "," + cents + "€";
}
