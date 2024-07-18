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


function GameController(
  playerOneName,
  playerTwoName
) {
  const board = Gameboard();
  let gameOver = 0;
  const getGameover = () => gameOver;
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
      gameOver=1;
      return;
    } else if (board.getBoard()[0][0].getValue() !== 0 && board.getBoard()[0][1].getValue() !== 0 && board.getBoard()[0][2].getValue() !== 0 && board.getBoard()[1][0].getValue() !== 0 && board.getBoard()[1][1].getValue() !== 0 && board.getBoard()[1][2].getValue() !== 0 && board.getBoard()[2][0].getValue() !== 0 && board.getBoard()[2][1].getValue() !== 0 && board.getBoard()[2][2].getValue() !== 0) {
      gameOver=2;
    }

    switchPlayerTurn();
    printNewRound();
  };
  printNewRound();
  return {playRound, getActivePlayer, getGameover, getBoard: board.getBoard};
}

function Display(nameOne, nameTwo) {
  let game = GameController(nameOne, nameTwo);
  const turnDiv = document.querySelector("#playerTurn");
  const boardDiv = document.querySelector("#gameboard");
  let gameOver = 0;
  
  const updateDisplay = () => {
    if (gameOver === 1) {
      return;
    }
    boardDiv.textContent = "";
    board = game.getBoard();
    turnDiv.textContent = game.getActivePlayer().name + "'s turn.";
    let i=0;
    board.forEach(row => {
      let j = i++;
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          cellButton.dataset.row = j;
          cellButton.dataset.column = index;
          if (cell.getValue() === "x"){
            cellButton.style.backgroundImage = "url(images/X2.jpeg)"
          } else if (cell.getValue() === "o"){
            cellButton.style.backgroundImage = "url(images/O2.jpg)"
          }
          boardDiv.appendChild(cellButton);
      })
    })
    }
    function clickHandlerBoard(e) {
      if (gameOver === 1) {
        return;
      }
      const selectedRow = e.target.dataset.row;
      const selectedColumn = e.target.dataset.column;
      game.playRound(selectedRow, selectedColumn);
      updateDisplay();
      if(game.getGameover() === 1) {
        turnDiv.textContent = game.getActivePlayer().name + " wins!";
        gameOver = 1;
        const restart = document.createElement("button");
        restart.textContent = "Restart";
        restart.addEventListener("click", () => {Form()});
        restart.classList.add("restart");
        turnDiv.appendChild(restart);
      } else if (game.getGameover() === 2) {
        turnDiv.textContent = "It's a tie!";
        gameOver = 1;
        const restart =document.createElement("button")
        restart.textContent = "Restart";
        restart.addEventListener("click", () => {Form()});
        restart.classList.add("restart");
        turnDiv.appendChild(restart);
      }
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
  updateDisplay()
}

function Form() {
  let nameOne;
  let nameTwo;
  if (document.querySelector("#NameOne").value === "") {
    nameOne = "Player One"
  } else{
    nameOne = document.querySelector("#NameOne").value;
  }
  document.querySelector("#NameOne").textContent = "";
  if (document.querySelector("#NameTwo").value === "") {
    nameTwo = "Player Two"
  } else{
    nameTwo = document.querySelector("#NameTwo").value;
  }
  document.querySelector("#NameTwo").textContent = "";
  Display(nameOne, nameTwo);
}
document.querySelector("#newGame").addEventListener("click", () => {Form()});