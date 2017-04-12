var contas = {}

function isLoginValid(username, password) {
    return contas[username] == password;
}

function createAccount(username, password) {
    contas[username] = password;
}
