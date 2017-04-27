var loggedIn = "";

var contas = {
    "admin" : {
        _uname: "admin",
        _pword: "root",
        _nif: "999888777",
        _tel: "912345678",
        _history: [
            { /* pedido 1 */
                _date: new Date(2017, 3, 8, 19, 38),
                _number: 1,
                _foods: [
                    {
                        _name: "Salada de Polvo",
                        _price: 400,
                        _quantity: 1,
                        _ingredients: ["Cebola", "Alho", "Pimentos"]
                    },
                    {
                        _name: "Bitoque de Porco",
                        _price: 600,
                        _quantity: 1,
                        _ingredients: ["Arroz", "Ovo", "Batatas fritas"]
                    }
                ]
            },
            { /* pedido 2 */
                _date: new Date(2017, 4, 12, 13, 38),
                _number: 2,
                _foods: [
                    {
                        _name: "Salada de Polvo",
                        _price: 400,
                        _quantity: 2,
                        _ingredients: ["Cebola", "Alho"]
                    }
                ]
            }
        ]
    },
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
    return uname !== loggedIn && contas[uname] !== undefined;
}

function createAccount(uname, pword, nif, tel) {
    contas[uname] = { _uname: uname,
        _pword: pword,
        _nif: nif,
        _tel: tel,
        _history: []
    };

    login(uname);
}

function getUname() {
    return contas[loggedIn]._uname;
}

function setUname(uname) {
    contas[loggedIn]._uname = uname;
    contas[uname] = contas[loggedIn];
    delete contas[loggedIn];
    loggedIn = uname;
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

function getOrderPrice(order) {
    var price = 0;
    var orderFoods = getOrderFoods(order);
    for (var i = 0; i < orderFoods.length; i++)
        price += orderFoods[i]._price * orderFoods[i]._quantity;
    return price;
}

function cellNumExists(tel) {
    for (var uname in contas)
        if (contas[uname]._tel === String(tel))
            return true;
    return false;
}

function deleteFromHistory(id) {
    getHistory().splice(id, 1);
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
    loggedIn = "";

    /* Mostrar caixa de utilizador autenticado: */
    $("#boxcontautilizador").show();
    $("#boxcontautilizadorlogged").hide();
    $("#screen2-logged-box").hide();

    /* Apagar dados da página: */
    deleteLoginData();
}
