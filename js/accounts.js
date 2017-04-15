var loggedIn = "";

var contas = {
    "admin" : {
        _uname: "admin",
        _pword: "root",
        _nif: "999888777",
        _tel: "943555555",
        _history: [
            { /* pedido 1 */
                _date: new Date(2017, 3, 8, 19, 38),
                _number: 1,
                _foods: [
                    {
                        _name: "Salada de Polvo",
                        _quantity: 1,
                        _ingredients: ["Cebola", "Alho", "Pimentos"]
                    },
                    {
                        _name: "Bitoque de Porco",
                        _quantity: 1,
                        _ingredients: ["Arroz", "Ovo", "Batatas fritas"]
                    }
                ]
            },
            { /* pedido 2 */
                _date: new Date(2017, 4, 12, 13, 8),
                _number: 2,
                _foods: [
                    {
                        _name: "Salada de Polvo",
                        _quantity: 2,
                        _ingredients: ["Cebola", "Alho"]
                    }
                ]
            }
        ]
    }
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

function getHistory() {
    return contas[loggedIn]._history;
}

function getOrderDate(order) {
    return order._date;
}

function getOrderNumber(order) {
    return order._number;
}

function getOrderFoods(order) {
    return order._foods;
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
