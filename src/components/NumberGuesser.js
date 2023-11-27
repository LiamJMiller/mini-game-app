import React, { useState } from "react";

const NumberGuesser = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function checkGuess() {
    if (!userGuess || isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100.");
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === randomNumber) {
      setMessage(
        `Congratulations! You guessed the correct number (${randomNumber}) in ${
          attempts + 1
        } attempts.`
      );
      setGameOver(true);
    } else if (userGuess < randomNumber) {
      setMessage("Try a higher number.");
    } else {
      setMessage("Try a lower number.");
    }
  }

  return (
    <div>
      <h1>Guess the Number Game</h1>
      <p>Guess a number between 1 and 100:</p>
      <input
        type="number"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        disabled={gameOver}
      />
      <button onClick={checkGuess} disabled={gameOver}>
        Submit Guess
      </button>
      <p>{message}</p>
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default NumberGuesser;
