var esmurristo_players;
var esmurristo_timeleft;
var esmurristo_timeouts = [];

function prepareEsmurristoGame() {
    $("#games-esmurristo-btn").click(function () {
        esmurristo_resetGame();
        games_windowAdjust();
        openWindow("esmurristo-game", windowPosition.BOTTOM_RIGHT);
        esmurristo_startGame();
    });

    $("#esmurristo-game .Xbtn").click(function () {
        closeWindow("esmurristo-game");
        while (esmurristo_timeouts.length > 0) {
            clearTimeout(esmurristo_timeouts[0]);
            esmurristo_timeouts.splice(0, 1);
        }
    });

    $("#esmurristo-btn").click(function () {
        if (esmurristo_timeleft > 0) {
            esmurristo_players[0]++;
            esmurristo_simulatePlayers(0.1);
            esmurristo_updateScreen();
        }
    });
}

function esmurristo_resetGame() {
    esmurristo_players = [0, 0, 0, 0];
    esmurristo_timeleft = 50;
    $("#esmurristo-game .blockerWhiteText").text("À espera de jogadores...");
    $("#esmurristo-game .blockerWhite").show();
    esmurristo_updateScreen();
}

function esmurristo_startGame() {
    esmurristo_timeouts.push(setTimeout(function () {
        $("#esmurristo-game .blockerWhiteText").text("Prepare-se!");
        esmurristo_timeouts.push(setTimeout(function () {
            $("#esmurristo-game .blockerWhiteText").text("3");
            esmurristo_timeouts.push(setTimeout(function () {
                $("#esmurristo-game .blockerWhiteText").text("2");
                esmurristo_timeouts.push(setTimeout(function () {
                    $("#esmurristo-game .blockerWhiteText").text("1");
                    esmurristo_timeouts.push(setTimeout(function () {
                        $("#esmurristo-game .blockerWhite").hide();
                        esmurristo_timeouts.push(setTimeout(esmurristo_timerUpdate, 100));
                    }, 500));
                }, 500));
            }, 500));
        }, 1000));
    }, 2000));
}

function esmurristo_endGame() {
    let won = 2; // 2 - ganhou, 1 - empatou, 0 - perdeu
    for (let i = 1; i < esmurristo_players.length; i++) {
        if (esmurristo_players[i] > esmurristo_players[0]) {
            won = 0;
            break;
        }
        else if (esmurristo_players[i] === esmurristo_players[0] && won > 0) {
            won = 1;
        }
    }
    if (won === 2)
        $("#esmurristo-game .blockerWhiteText").text("Você ganhou! :)");
    else if (won === 1)
        $("#esmurristo-game .blockerWhiteText").text("Foi empate!");
    else
        $("#esmurristo-game .blockerWhiteText").text("Você perdeu! :(");
    $("#esmurristo-game .blockerWhite").show();

    esmurristo_timeouts.push(setTimeout(function () {
        esmurristo_resetGame();
        esmurristo_startGame();
    }, 2000));
}

function esmurristo_updateScreen() {
    for (let i = 0; i < esmurristo_players.length; i++)
        $("#esmurristo-player" + String(i+1) + "-score span").text(esmurristo_players[i]);
    $("#esmurristo-count-score span").text(esmurristo_players[0]);
    $("#esmurristo-time-left span").text(Math.floor(esmurristo_timeleft / 10));
}

function esmurristo_timerUpdate() {
    esmurristo_timeleft--;
    if (esmurristo_timeleft > 0) {
        esmurristo_timeouts.push(setTimeout(esmurristo_timerUpdate, 100));
        esmurristo_simulatePlayers(0.6);
    }
    else {
        if (esmurristo_timeleft < 0)
            esmurristo_timeleft = 0;
        esmurristo_endGame();
    }
    esmurristo_updateScreen();
}

function esmurristo_simulatePlayers(chance) {
    for (let i = 1; i < esmurristo_players.length; i++)
        if (Math.random() < chance)
            esmurristo_players[i]++;
}
