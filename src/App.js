import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [message, setMessage] = useState("It is X turn");

  const [isXTurn, setIsXTurn] = useState(true);

  const [canReset, setCanReset] = useState(false);

  const handleReset = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ])
    setMessage("It is X turn");
    setIsXTurn(true);
    setCanReset(false);
  }

  const handleCellClick = (row, cell) => {
    if (board[row][cell] === "") {
      const boardCopy = board.map((row) => [...row]);
      boardCopy[row][cell] = isXTurn ? "X" : "O";
      setBoard(boardCopy);
      setIsXTurn(!isXTurn);
      setMessage(`It is ${!isXTurn ? 'X' : 'O'} turn`)
      if (checkWinner(boardCopy)) {
        setMessage(`yay you won: ${isXTurn ? "X" : "O"}`);
        setCanReset(true);
      } else {
        if (didTheyDraw(boardCopy)) {
          setMessage("No one won");
          setCanReset(true);
        }
      }
    }
  };

  const checkWinner = (board) => {
    // Check rows for a win
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] !== "" &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return true;
      }
    }

    // Check columns for a win
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] !== "" &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return true;
      }
    }

    // Check diagonals for a win
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return true;
    }

    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return true;
    }

    // If no winner is found, return false
    return false;
  };

  const didTheyDraw = (board) => {
    for (let row of board) {
      for (let cell of row) {
        if (cell === "") return false;
      }
    }
    return true;
  };

  return (
    <div>
      <h1>{message}</h1>
      {canReset && <button onClick={handleReset}>Reset</button>}
      <div className="board">
        {board.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((cell, cIndex) => (
              <div
                onClick={() => handleCellClick(rIndex, cIndex)}
                className="cell"
                key={cIndex}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
        {/* <div className="row">
          <div className="cell">X</div>
          <div className="cell">O</div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="cell"></div>
          <div className="cell">X</div>
          <div className="cell"></div>
        </div>
        <div className="row">
          <div className="cell"></div>
          <div className="cell">O</div>
          <div className="cell"></div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
