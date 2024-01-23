import React, { useState } from "react";
import Instructions from "./Instructions";
import Leaderboard from "./LeaderBoard";
import PlayGame from "./PlayGame";

const StartScreen = ({ gameOptions }) => {
  const [scene, setScene] = useState("start");

  if (scene === "instructions") {
    return <Instructions setScene={setScene} />;
  }

  if (scene === "leaderboard") {
    return <Leaderboard setScene={setScene} />;
  }

  if (scene === "play") {
    return <PlayGame setScene={setScene} />;
  }

  return (
    <div>
      <h1>Liam is late to Work!</h1>
      <button onClick={() => setScene("instructions")}>
        Game Instructions
      </button>
      <button onClick={() => setScene("leaderboard")}>Leaderboard</button>
      <button onClick={() => setScene("play")}>Start Game</button>
    </div>
  );
};

export default StartScreen;
