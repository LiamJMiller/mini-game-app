import React from "react";

const GameOver = ({ finalScore, setScene }) => {
  const addToLeaderboard = () => {
    let leaderboard = localStorage.getItem("leaderboard");
    leaderboard = leaderboard ? JSON.parse(leaderboard) : [];

    leaderboard.push({
      attempt: leaderboard.length + 1,
      score: finalScore,
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  return (
    <div>
      <h1>Game Over</h1>
      <p>Final Score: {finalScore}</p>
      <button onClick={() => setScene("play")}>Try Again</button>
      <button onClick={() => setScene("leaderboard")}>Leaderboard</button>
      <button onClick={() => setScene("start")}>Exit</button>
    </div>
  );
};

export default GameOver;
