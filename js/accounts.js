var loggedIn = "";

var contas = {
    "admin" : { _uname: "admin",
        _pword: "root",
        _nif: "999888777",
        _tel: "943555555" }
};

function isLoginValid(uname, pword) {
    try {
        return contas[uname]._pword === pword;
    }
    catch (err) { /* TypeError */
        // Caso o username nao exista:
        return false;
    }
}

function createAccount(uname, pword, nif, tel) {
    contas[uname] = { _uname: uname,
        _pword: pword,
        _nif: nif,
        _tel: tel };

    login(uname);
}

function login(uname) {
    loggedIn = uname;

    /* Atualizar dados na página: */
    $("#logged-uname").text(contas[loggedIn]._uname);
    if (contas[loggedIn]._nif === "")
        $("#logged-nif").addClass("attentionText").text("Não fornecido.");
    else
        $("#logged-nif").text(contas[loggedIn]._nif);
    $("#logged-tel").text(contas[loggedIn]._tel);

    /* Mostrar caixa de utilizador autenticado: */
    $("#boxcontautilizadorlogged").show();
    //$("#boxcontautilizador").hide();
}

function logout() {
    loggedIn = null;

    /* Mostrar caixa de utilizador autenticado: */
    //$("#boxcontautilizador").show();
    $("#boxcontautilizadorlogged").hide();

    /* Apagar dados da página: */
    $("#logged-uname").text("");
    $("#logged-nif").removeClass().text("");
    $("#logged-tel").text("");
}
