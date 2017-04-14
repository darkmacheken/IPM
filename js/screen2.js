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
    $(".menuEmenta").click(function () {
        /* Selecionar botao do menu clicado */
        $("#" + currentMenuSelected).removeClass("selected");
        $(this).addClass("selected");
        currentMenuSelected = $(this).attr("id");

        /* Mostrar items */

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

    });

}
