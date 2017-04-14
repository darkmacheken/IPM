var currentMenuSelected = "";

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
        $("#" + currentMenuSelected).removeClass("selected");
        $(this).addClass("selected");
        currentMenuSelected = $(this).attr("id");
    });

}
