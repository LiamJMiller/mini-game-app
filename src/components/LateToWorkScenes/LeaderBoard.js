import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const scoresPerPage = 10;

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    setLeaderboard(storedLeaderboard ? JSON.parse(storedLeaderboard) : []);
  }, []);

  const highScore =
    leaderboard.length > 0
      ? Math.max(...leaderboard.map((item) => item.score))
      : null;

  const displayPage = (page) => {
    const start = page * scoresPerPage;
    const end = Math.min(start + scoresPerPage, leaderboard.length);
    return leaderboard.slice(start, end).map((item, index) => (
      <p key={index}>
        Attempt {item.attempt} : {item.score}
      </p>
    ));
  };

  const resetLeaderboard = () => {
    localStorage.removeItem("leaderboard");
    setLeaderboard([]);
  };

  return (
    <div>
      {highScore && <h2>High Score: {highScore}</h2>}
      {displayPage(currentPage)}
      {currentPage > 0 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
      )}
      {(currentPage + 1) * scoresPerPage < leaderboard.length && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      )}
      <button onClick={resetLeaderboard}>Reset</button>
    </div>
  );
};

export default Leaderboard;
