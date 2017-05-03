var sessionOrder = [];

function prepareScreen3() {
    ;
}

function enterScreen3() {
    if (currentOrder.length === 0)
        return;

    let ordered = compactOrder(currentOrder);

    confirmYesNo("Tem a certeza que pretende fazer o pedido?", function () {
        exitScreen2();
        for (let i = 0; i < currentOrder.length; i++) {
            currentOrder[i];
        }
        currentOrder = [];
        screen = 3;
    });
}

function exitScreen3() {
    ;
}

function compactOrder(order) {
    let compact = [];
    for (let i = 0; i < order.length; i++) {
        for (let j = 0; j < compact.length; j++)
            order[i];
    }
}
