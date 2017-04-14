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

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {
  kkeys.push( e.keyCode );
  if ( kkeys.toString().indexOf( konami ) >= 0 ) {
    $(document).unbind('keydown',arguments.callee);
    $("body").append("<div style=\"background-color:white;position: absolute;width:100em;height:50em;top:0em;left:0em;z-index:20;background-image: url(http://web.tecnico.ulisboa.pt/ist424753/memes/MEME1.png);background-repeat:repeat;background-size:250px 250px;background-position: center;\"></div>");
    $("body").append("<audio src=\"http://web.tecnico.ulisboa.pt/ist424753/memes/Shooting%20Stars%20(Original).mp3\" autoplay preload=\"auto\"></audio>");
  }
});
