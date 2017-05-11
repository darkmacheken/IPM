function prepareTicTacToeGame() {
    $("#games-tic-tac-toe-btn").click(function () {
        openWindow("tic-tac-toe-game");
    });

    $("#tic-tac-toe-game .Xbtn").click(function () {
        closeWindow("tic-tac-toe-game");
    });
}
