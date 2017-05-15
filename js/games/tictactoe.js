tictactoe_boardStatus = {
    UNPLAYED : 101,
    XPLAYED : 201,
    OPLAYED : 301,
}
tictactoe_winType = {
    ROW : 102,
    COLUMN : 202,
    DIAGONAL_POS : 302,
    DIAGONAL_NEG : 402
}

var tictactoe_board = [[0,0,0],[0,0,0],[0,0,0]];

var tictactoe_user = 0;
var tictactoe_computer = 0;
var tictactoe_status = { _won: false,
    _type: tictactoe_winType.ROW,
    _pos: 0,
    _winner: tictactoe_boardStatus.UNPLAYED };
var tictactoe_xTurn;
var tictactoe_timeouts = [];
//var moves = 0, x, y, rand;

function prepareTicTacToeGame() {
    $("#games-tic-tac-toe-btn").click(function () {
        tictactoe_resetGame();
        if (currScreen === 3) {
            $("#tic-tac-toe-game").css("width", "350px").css("height", "350px");
            $("#tic-tac-toe-game-div").css("font-size","9px");
        }
        openWindow("tic-tac-toe-game");
    });

    $("#tic-tac-toe-game .Xbtn").click(function () {
        closeWindow("tic-tac-toe-game");
        while (tictactoe_timeouts.length > 0) {
            clearTimeout(tictactoe_timeouts[0]);
            tictactoe_timeouts.splice(0, 1);
        }
    });

    $("#tic-tac-toe-reset-btn").click(tictactoe_resetGame);

    $("#tic-tac-toe-game .hitbox").click(function () {
        let xPos = parseInt($(this).attr("id").substr(7, 1));
        let yPos = parseInt($(this).attr("id").substr(8, 1));
        tictactoe_userPlay(xPos, yPos);
    });
}

function tictactoe_resetGame() {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        tictactoe_board[i][j] = tictactoe_boardStatus.UNPLAYED;

    tictactoe_status._won = false;
    tictactoe_xTurn = true;
    moveIndex = 0;

    tictactoe_updateBoard();
}

function tictactoe_userPlay(xPos, yPos) {
    if (tictactoe_xTurn && tictactoe_board[xPos][yPos] === tictactoe_boardStatus.UNPLAYED) {
        tictactoe_board[xPos][yPos] = tictactoe_boardStatus.XPLAYED;
        tictactoe_xTurn = false;
        tictactoe_checkWin();
        if (!tictactoe_status._won)
            tictactoe_computerPlay();
    }
}

function tictactoe_computerPlay() {
    tictactoe_timeouts.push(setTimeout(function () {
        let tieCount = 0;
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            let xPos = Math.floor((i % 9) / 3);
            let yPos = i % 3;

            if (tictactoe_board[xPos][yPos] === tictactoe_boardStatus.UNPLAYED) {
                if (Math.random() < 0.2) {
                    tictactoe_board[xPos][yPos] = tictactoe_boardStatus.OPLAYED;
                    break;
                }
            }
            else if (tieCount === i) {
                if (i >= 9) {
                    break;
                }
                else {
                    tieCount++;
                }
            }
        }
        tictactoe_xTurn = true;
        tictactoe_checkWin();
    }, 500));
}

function tictactoe_checkWin() {
    tictactoe_crossed();
    if (tictactoe_status._won) {
        switch (tictactoe_status._winner) {
            case tictactoe_boardStatus.XPLAYED:
                tictactoe_user++;
                break;
            case tictactoe_boardStatus.OPLAYED:
                tictactoe_computer++;
                break;
            default:
                console.log("Erro ao decidir vencedor.");
        }
    }
    tictactoe_updateBoard();
}

function tictactoe_crossed() {
    // linhas
    for(let i = 0; i < 3; i++)
        if (tictactoe_board[i][0] === tictactoe_board[i][1] &&
                tictactoe_board[i][1] === tictactoe_board[i][2] &&
                tictactoe_board[i][0] !== tictactoe_boardStatus.UNPLAYED) {
            tictactoe_status._won = true;
            tictactoe_status._type = tictactoe_winType.ROW;
            tictactoe_status._pos = i;
            tictactoe_status._winner = tictactoe_board[i][0];
            return;
        }

    // colunas
    for(let i = 0; i < 3; i++)
        if (tictactoe_board[0][i] === tictactoe_board[1][i] &&
                tictactoe_board[1][i] === tictactoe_board[2][i] &&
                tictactoe_board[0][i] !== tictactoe_boardStatus.UNPLAYED) {
            tictactoe_status._won = true;
            tictactoe_status._type = tictactoe_winType.COLUMN;
            tictactoe_status._pos = i;
            tictactoe_status._winner = tictactoe_board[0][i];
            return;
        }

    // diagonais
    if (tictactoe_board[0][2] === tictactoe_board[1][1] &&
            tictactoe_board[1][1] === tictactoe_board[2][0] &&
            tictactoe_board[0][2] !== tictactoe_boardStatus.UNPLAYED) {
        tictactoe_status._won = true;
        tictactoe_status._type = tictactoe_winType.DIAGONAL_POS;
        tictactoe_status._winner = tictactoe_board[0][2];
    }
    else if (tictactoe_board[0][0] == tictactoe_board[1][1] &&
            tictactoe_board[1][1] === tictactoe_board[2][2] &&
            tictactoe_board[0][0] !== tictactoe_boardStatus.UNPLAYED) {
        tictactoe_status._won = true;
        tictactoe_status._type = tictactoe_winType.DIAGONAL_NEG;
        tictactoe_status._winner = tictactoe_board[0][0];
    }
    else {
        tictactoe_status._won = false;
    }
}

function tictactoe_updateBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            switch (tictactoe_board[i][j]) {
                case tictactoe_boardStatus.UNPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "none").addClass("btn");
                    break;
                case tictactoe_boardStatus.XPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "url(\"images/games/tic-tac-toe-x-blue.png\")").removeClass("btn");
                    break;
                case tictactoe_boardStatus.OPLAYED:
                    $("#hitbox-"+String(i)+String(j)).css("background-image", "url(\"images/games/tic-tac-toe-o-red.png\")").removeClass("btn");
                    break;
                default:
                    console.log("Erro ao decidir estado de célula.");
            }
            if (!tictactoe_xTurn || tictactoe_status._won)
                $("#hitbox-"+String(i)+String(j)).removeClass("btn");
        }
    }

    if (tictactoe_status._won) {
        switch (tictactoe_status._type) {
            case tictactoe_winType.ROW:
                $('#reta-horizontal').show();
                break;
            case tictactoe_winType.COLUMN:
                $('#reta-vertical').show();
                break;
            case tictactoe_winType.DIAGONAL_POS:
                $('#reta-diagonal-positivo').show();
                break;
            case tictactoe_winType.DIAGONAL_NEG:
                $('#reta-diagonal-negativo').show();
                break;
            default:
                console.log("Erro ao decidir estado ganho.");
        }
    }
    else {
        $('#reta-horizontal').hide();
        $('#reta-vertical').hide();
        $('#reta-diagonal-positivo').hide();
        $('#reta-diagonal-negativo').hide();
    }

    $("#tic-tac-toe-computer-score span").text(tictactoe_computer);
    $("#tic-tac-toe-user-score span").text(tictactoe_user);
}
