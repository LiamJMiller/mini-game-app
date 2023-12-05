import React from "react";
import "../styles/GameTile.scss";

const GameTile = ({ imageUrl, title }) => {
  return (
    <div class="game-tile">
      <img
        src={imageUrl}
        alt={title + " " + "image"}
        className="game-tile__img"
      />
      <h2 className="game-tile__title">{title}</h2>
    </div>
  );
};

export default GameTile;
