function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board =  [];
  const Cell = () =>{
    let value = 0;
    const addMark = (player) => {
      value = player;
    };
    const getValue = () => value;
    return {addMark, getValue};
  }
  for (let i=0; i<rows; i++) {
    board[i]=[];
    for (let j=0;j<columns; j++) {
      board[i].push(Cell());
    }
  };
  const getBoard = () => board;
  const markCell = (row, column, player) => {
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

// function Cell() {
//   let value = 0;
//   const addMark = (player) => {
//     value = player;
//   };
//   const getValue = () => value;
//   return {addMark, getValue};
// }

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
    if (board.getBoard()[row][column].getValue() !== 0) {
      switchPlayerTurn();
    }
    board.markCell(row, column, getActivePlayer().token);
    if ((board.getBoard()[row][0].getValue() === board.getBoard()[row][1].getValue() && board.getBoard()[row][0].getValue() === board.getBoard()[row][2].getValue()) || (board.getBoard()[0][column].getValue() === board.getBoard()[1][column].getValue() && board.getBoard()[0][column].getValue() === board.getBoard()[2][column].getValue()) || (board.getBoard()[1][1].getValue() !== 0 && board.getBoard()[1][1].getValue() === board.getBoard()[0][0].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[2][2].getValue()) || (board.getBoard()[1][1].getValue() !== 0 && board.getBoard()[1][1].getValue() === board.getBoard()[0][2].getValue() && board.getBoard()[1][1].getValue() === board.getBoard()[2][0].getValue())) {
      board.printBoard();
      console.log(getActivePlayer().name + " wins!");
      game = GameController();
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();
  return {playRound, getActivePlayer};
}

let game = GameController();