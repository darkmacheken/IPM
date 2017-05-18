var pong_timeouts = [];
var pong_gameTimeout = 0;
var pong_ballPos = { x: 0.0, y: 0.0 };
var pong_ballVel = { x: 0.0, y: 0.0 };
var pong_computerPos = 0.5;
var pong_computerVel = 1;
var pong_userScore = 0;
var pong_computerScore = 0;
var PONG_MAXWIDTH = 487;//337

function preparePongGame() {
    $("#games-pong-btn").click(function () {
        $("#user-player").draggable({ axis: "x", containment: "#pong-game-field" });

        games_windowAdjust();
        if (currScreen === 3)
            PONG_MAXWIDTH = 337;

        $("#pong-game .blockerWhiteText").text("Faça passar a bola pelo adversário para ganhar o jogo!");
        $("#pong-game .blockerWhite").show();
        $("#pong-play-btn").show();
        $("#pong-rematch-btn").hide();
        pong_throwBall();
        $("#user-player").css("left", String(($("#pong-game-field").width() - $("#computer-player").width()) / 2) + "px").css("top","100%");
        pong_updateScreen();

        openWindow("pong-game", windowPosition.BOTTOM_RIGHT);
    });

    $("#pong-game .Xbtn").click(function () {
        $("#user-player").draggable("destroy");

        closeWindow("pong-game");
        while (pong_timeouts.length > 0) {
            clearTimeout(pong_timeouts[0]);
            pong_timeouts.splice(0, 1);
        }
        clearTimeout(pong_gameTimeout);
    });

    $("#pong-reset-btn").click(function () {
        $("#pong-game .Xbtn").click();
        $("#games-pong-btn").click();
    });

    $("#pong-play-btn, #pong-rematch-btn").click(pong_startGame);
}

function pong_game() {
    pong_ballPos.x += pong_ballVel.x * 0.008;
    pong_ballPos.y += pong_ballVel.y * 0.006;
    pong_computerPos += pong_computerVel * 0.008;
    pong_gameTimeout = setTimeout(pong_game, 1);
    pong_collideComputer();
    pong_collide();
    pong_updateScreen();
}

function pong_resetGame() {
    $("#pong-game .blockerWhiteText").text("Prepare-se!");
    $("#pong-game .blockerWhite").show();
    $("#pong-play-btn").hide();
    $("#pong-rematch-btn").hide();
    pong_throwBall();
    pong_computerPos = 0.5;
    pong_computerVel = (Math.floor(Math.random()) * 2) - 1;
    pong_userScore = 0;
    pong_computerScore = 0;
    pong_updateScreen();
}

function pong_startGame() {
    pong_resetGame();
    pong_updateScreen();
    pong_timeouts.push(setTimeout(function () {
        $("#pong-game .blockerWhiteText").text("3");
        pong_timeouts.push(setTimeout(function () {
            $("#pong-game .blockerWhiteText").text("2");
            pong_timeouts.push(setTimeout(function () {
                $("#pong-game .blockerWhiteText").text("1");
                pong_timeouts.push(setTimeout(function () {
                    $("#pong-game .blockerWhite").hide();
                    pong_gameTimeout = setTimeout(pong_game, 1);
                }, 500));
            }, 500));
        }, 500));
    }, 1000));
}

function pong_updateScreen() {
    let gameWidth = $("#pong-game-field").width();
    let $pongBall = $("#pong-ball");
    $pongBall.css("left", String(pong_ballPos.x * (gameWidth - $pongBall.width())) + "px");
    $pongBall.css("top", String(pong_ballPos.y * 100) + "%");
    $("#computer-player").css("left", String(pong_computerPos * (gameWidth - $("#computer-player").width())) + "px").css("top","0%");
    $("#user-player").css("top", "100%");
    $("#pong-computer-score span").text(pong_computerScore);
    $("#pong-user-score span").text(pong_userScore);
}

function pong_centerBall() {
    pong_ballPos.x = 0.5;
    pong_ballPos.y = 0.5;
}

function pong_throwBall() {
    pong_centerBall();
    let initVDir = Math.random() * 4.0 * Math.PI / 3.0;

    if (initVDir < (2.0 * Math.PI / 3.0))
        initVDir += Math.PI / 6.0;
    else
        initVDir += Math.PI / 2.0;

    pong_ballVel.x = Math.cos(initVDir);
    pong_ballVel.y = Math.abs(Math.sin(initVDir)); // abs para mandar a bola sempre para baixo
}

function pong_collideComputer() {
    if (pong_computerPos <= 0 || pong_computerPos >= 1)
        pong_computerVel = -pong_computerVel;
}

function pong_collide() {
    if (pong_ballPos.x <= 0 || pong_ballPos.x >= 1)
        pong_ballVel.x = -pong_ballVel.x;
    else if (pong_ballPos.y <= 0 || pong_ballPos.y >= 1)
        pong_lost();
    else if (pong_obstacleCollide($("#user-player"))) {
        pong_ballVel.y = -Math.abs(pong_ballVel.y);
        pong_ballVel.y -= 0.01;
    }
    else if (pong_obstacleCollide($("#computer-player")))
        pong_ballVel.y = Math.abs(pong_ballVel.y);
}

function pong_obstacleCollide($player) {
    let ball = $("#pong-ball");
    let x1 = ball.offset().left;
    let y1 = ball.offset().top;
    let h1 = ball.outerHeight(true);
    let w1 = ball.outerWidth(true);
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = $player.offset().left;
    let y2 = $player.offset().top;
    let h2 = $player.outerHeight(true);
    let w2 = $player.outerWidth(true);
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
}

function pong_lost() {
    if (pong_ballPos.y <= 0)
        pong_userScore++;
    else
        pong_computerScore++;

    pong_centerBall();

    if (pong_userScore >= 5 || pong_computerScore >= 5) {
        pong_stopBall();
        if (pong_userScore > pong_computerScore)
            $("#pong-game .blockerWhiteText").text("Você ganhou! :)");
        else
            $("#pong-game .blockerWhiteText").text("Você perdeu! :(");
        $("#pong-rematch-btn").show();
        $("#pong-game .blockerWhite").show();
    }
    else {
        pong_stopBall();
        pong_timeouts.push(setTimeout(pong_throwBall,500));
    }
}

function pong_stopBall() {
    pong_ballVel.x = 0.0;
    pong_ballVel.y = 0.0;
}
