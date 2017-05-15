function preparePongGame() {
    $("#games-pong-btn").click(function () {
        games_windowAdjust();
        openWindow("pong-game", windowPosition.BOTTOM_RIGHT);
    });

    $("#pong-game .Xbtn").click(function () {
        closeWindow("pong-game");
    });
}
