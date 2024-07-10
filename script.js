function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board =  [];
  for (let i=0; i<rows; i++) {
    board[i]=[];
    for (let j=0;j<columns; j++) {
      board[i].push(Cell());
    }
  };
  const getBoard = () => board;
  const markCell = (row, column, player) => {
    console.log(board[row][column].getValue())
    if (board[row][column].getValue() === 0) {
      board[row][column].addMark(player);
    } else {
      return;
    }
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };
  return {getBoard, markCell, printBoard}
}

function Cell() {
  let value = 0;
  const addMark = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {addMark, getValue};
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "x"
    },
    {
      name: playerTwoName,
      token: "o"
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(getActivePlayer().name +"'s turn.");
  };
  const playRound = (row, column) => {
    console.log(getActivePlayer().name +" is marking" + row + "/" + column);
    board.markCell(row, column, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();
  return {playRound, getActivePlayer};
}

const game = GameController();