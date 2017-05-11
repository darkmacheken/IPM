var board=[[0,0,0],[0,0,0],[0,0,0]];

var user=0;
var computer=0;
var gameover=false;
var whoseTurn=1;
var moves=0, x, y, rand;

function prepareTicTacToeGame() {
    $("#games-tic-tac-toe-btn").click(function () {
        openWindow("tic-tac-toe-game");
    });
    $('#reta-horizontal').hide();
    $('#reta-vertical').hide();
    $('#reta-diagonal-positivo').hide();
    $('#reta-diagonal-negativo').hide();
    for(var i=0; i<3; i++){
      for(var j=0; j<3; j++){
        board[i][j]=0;
      }
    }
    showBoard();
    user=0;
    computer=0;
    gameover=false;
    whoseTurn=2;
    moveIndex=0

    

    $("#tic-tac-toe-game .Xbtn").click(function () {
        closeWindow("tic-tac-toe-game");
    });
}

function rowCrossed(){
    for(var i=0; i<3; i++){
      if(board[i][0]==board[i][1] &&
         board[i][1]==board[i][2] &&
         board[i][0]!=0)
         return true;
    }
    return false;
}

function columnCrossed(){
  for(var i=0; i<3; i++)
    if(board[0][i]==board[1][i] &&
       board[1][i]==board[2][i] &&
       board[0][i]!=0)
       return true;

  return false;
}

function diagonalCrossed(){
  if(board[0][0] == board[1][1] &&
     board[1][1] == board[2][2] &&
     board[0][0] != 0)
     return true;

  if (board[0][2] == board[1][1] &&
      board[1][1] == board[2][0] &&
      board[0][2] != 0)
      return true;

    return false;
}

function showBoard(){
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      switch (board[i][j]) {
        case 0:
          $("#hitbox-"+String(i)+String(j)).css("background-image","");
          break;
        case 1:
          $("#hitbox-"+String(i)+String(j)).css("background-image","url(\"images/games/tic-tac-toe-x-blue.png\")").removeClass("btn");
          break;
        case 2:
          $("#hitbox-"+String(i)+String(j)).css("background-image","url(\"images/games/tic-tac-toe-o-red.png\")").removeClass("btn");
          break;
        default:
          break;

      }
    }
  }
}
