import React from "react";

const GameTile = ({ imageUrl, title }) => {
  return (
    <div class="game-tile">
      <img src={imageUrl} alt={title} class="game-image" />
      <h2 class="game-title">{title}</h2>
    </div>
  );
};

export default GameTile;
