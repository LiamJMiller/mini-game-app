import React from "react";
import { Chess } from "chess.js";
import "./ChessBoard.scss";

const Chessboard = () => {
  const chess = new Chess(); // Initialize the chess game

  // Create a chessboard grid
  const chessboardGrid = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => null)
  );

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
