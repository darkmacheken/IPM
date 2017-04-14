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

function existsUser(uname) {
    return contas[uname] !== undefined;
}

function createAccount(uname, pword, nif, tel) {
    contas[uname] = { _uname: uname,
        _pword: pword,
        _nif: nif,
        _tel: tel };

    login(uname);
}

function getUname() {
    return contas[loggedIn]._uname;
}

function setPword(pword) {
    contas[loggedIn]._pword = pword;
}

function getNif() {
    return contas[loggedIn]._nif;
}

function setNif(nif) {
    contas[loggedIn]._nif = nif;
}

function getTel() {
    return contas[loggedIn]._tel;
}

function setTel(tel) {
    contas[loggedIn]._tel = tel;
}

function login(uname) {
    loggedIn = uname;

    /* Atualizar dados na página: */
    updateLoginData();

    /* Mostrar caixa de utilizador autenticado: */
    $("#boxcontautilizadorlogged").show();
    $("#boxcontautilizador").hide();
    $("#screen2-logged-box").show();
}

function logout() {
    loggedIn = null;

    /* Mostrar caixa de utilizador autenticado: */
    $("#boxcontautilizador").show();
    $("#boxcontautilizadorlogged").hide();
    $("#screen2-logged-box").hide();

    /* Apagar dados da página: */
    deleteLoginData();
}
