import React from "react";
import GameTile from "./GameTile"; // Import the GameTile component
import styles from "../app/page.module.css";
import "../styles/GamesList.scss";

const GameList = () => {
  const games = [
    "Late To Work",
    "Chess",
    "Hangman",
    "Number Guesser",
    "Tic Tac Toe",
    // Add more games as needed
  ];

  return (
    <div className="games-list">
      {games.map((game, index) => (
        <GameTile key={index} title={game} />
      ))}
    </div>
  );
};

export default GameList;
