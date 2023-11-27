import React, { useState, useEffect } from "react";

const Hangman = () => {
  const [word, setWord] = useState("programming"); // Replace with your word list or API call
  const [guessedWord, setGuessedWord] = useState("");
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [maxAttempts, setMaxAttempts] = useState(6); // Adjust this as needed
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'

  useEffect(() => {
    // Initialize the guessed word with underscores
    setGuessedWord("_".repeat(word.length));
  }, [word]);

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || incorrectGuesses.includes(letter)) {
      return;
    }

    const wordArray = word.split("");
    let newGuessedWord = "";

    for (let i = 0; i < word.length; i++) {
      if (wordArray[i] === letter) {
        newGuessedWord += letter;
      } else {
        newGuessedWord += guessedWord[i];
      }
    }

    setGuessedWord(newGuessedWord);

    if (!word.includes(letter)) {
      setIncorrectGuesses([...incorrectGuesses, letter]);
      setAttemptsLeft(attemptsLeft - 1);
    }

    if (newGuessedWord === word) {
      setGameStatus("won");
    }

    if (attemptsLeft === 0) {
      setGameStatus("lost");
    }
  };

  const renderWord = () => (
    <div className="word">
      {guessedWord.split("").map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ))}
    </div>
  );

  const renderAlphabet = () => (
    <div className="alphabet">
      {Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).map(
        (letter) => (
          <button
            key={letter}
            className={`letter-button ${
              incorrectGuesses.includes(letter) ? "incorrect" : ""
            }`}
            onClick={() => handleGuess(letter)}
            disabled={
              incorrectGuesses.includes(letter) ||
              guessedWord.includes(letter) ||
              gameStatus !== "playing"
            }
          >
            {letter}
          </button>
        )
      )}
    </div>
  );

  return (
    <div className="hangman">
      <h1>Hangman Game</h1>
      <div className="attempts-left">
        Attempts Left: {attemptsLeft}/{maxAttempts}
      </div>
      {renderWord()}
      <div className="incorrect-guesses">
        Incorrect Guesses: {incorrectGuesses.join(", ")}
      </div>
      {renderAlphabet()}
      <div className="game-status">
        {gameStatus === "won" && "Congratulations! You won!"}
        {gameStatus === "lost" && "Sorry, you lost. The word was: " + word}
      </div>
    </div>
  );
};

export default Hangman;
