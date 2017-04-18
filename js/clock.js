/* Começar a contar tempo */
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
	$("#clock").text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}

/* Adicionar um zero se o número for menor que 10 */
function checkTime(i) {
    if (i < 10)
        {i = "0" + i};
    return i;
}
