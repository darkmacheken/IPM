function preparePongGame() {
    $("#games-pong-btn").click(function () {
        openWindow("pong-game");
    });

    $("#pong-game .Xbtn").click(function () {
        closeWindow("pong-game");
    });
}
