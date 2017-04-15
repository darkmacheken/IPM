var currentMenuSelected = "";
var currentOrderSelected = "";
var ordered = [];

function prepareScreen2() {

    /**** Botões Principais ****/
    $("#orderfoodbtn").click(function () {
        $("#second-screen").show();
    });

    $("#menuPrincipalbtn").click(function () {
        confirmYesNo("Tem a certeza que pretende sair?<br />O seu pedido será eliminado.", function () {
            $("#second-screen").hide();
        });
    });

    /**** Menu lateral esquerdo ****/
    currentMenuSelected = "menu-entradas";
    $("#" + currentMenuSelected).addClass("selected");
    showFoodItems();

    $(".menuEmenta").click(function () {
        /* Selecionar botao do menu clicado */
        $("#" + currentMenuSelected).removeClass("selected");
        $(this).addClass("selected");
        currentMenuSelected = $(this).attr("id");

        /* Mostrar items */
        showFoodItems();
    });

    /**** Ordenação ****/
    currentOrderSelected = "ord-classif";
    $("#" + currentOrderSelected).addClass("selected");
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
    for (var i = 0; i < FOOD_ITEMS[currentMenuSelected].length; i++) {
        $("#food-option-box-" + (i+1) + " .titulo").text(FOOD_ITEMS[currentMenuSelected][i]._name);
        $("#food-option-box-" + (i+1) + " .descricao").text(FOOD_ITEMS[currentMenuSelected][i]._desc);
        $("#food-option-box-" + (i+1) + " .preco").text(formatPrice(FOOD_ITEMS[currentMenuSelected][i]._price));
    }
}

function formatPrice(price) {
    var cents = String(price % 100);
    if (cents.length === 1)
        cents = "0" + cents;
    return String(Math.floor(price/100)) + "," + cents + "€";
}
