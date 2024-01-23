import React from "react";
import Link from "next/link";
import "../styles/GameTile.scss";

const GameTile = ({ imageUrl, title }) => {
  const urlTitle = title.replace(/\s+/g, ""); // remove spaces

  return (
    <Link href={`/${urlTitle}`} className="game-tile">
      <img
        src={imageUrl}
        alt={title + " " + "image"}
        className="game-tile__img"
      />
      <h2 className="game-tile__title">{title}</h2>
    </Link>
  );
};

export default GameTile;
