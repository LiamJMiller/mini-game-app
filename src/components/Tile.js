import React from "react";

const Tile = ({ value }) => (
  <div className={`tile tile-${value}`}>{value !== 0 ? value : ""}</div>
);

export default Tile;
