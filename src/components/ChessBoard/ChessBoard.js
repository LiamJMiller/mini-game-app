import useState from "react";
import { Chess } from "chess.js";
import "./ChessBoard.scss";

const Chessboard = (game, setGame) => {
  // Create a chessboard grid
  const chessboardGrid = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => null)
  );

  function handleSquareClick(row, col) {
    const move = game.move({
      from: `${String.fromCharCode(97 + col)}${8 - row}`,
      to: `${String.fromCharCode(97 + col)}${8 - row - 1}`,
    });

    // If the move is valid, update the game state
    if (move) {
      const updatedGrid = [...chessboardGrid];
      updatedGrid[row][col] = game.get(move.to);
      updatedGrid[row + 1][col] = null;
      setGame(game);
    }
  }

  // Render the chessboard
  return (
    <div className="chessboard">
      {chessboardGrid.map((row, rowIndex) => (
        <div className="chessboard__row" key={rowIndex}>
          {row.map((square, colIndex) => (
            <div
              className={`chessboard__square ${
                (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
              }`}
              key={colIndex}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {square}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
