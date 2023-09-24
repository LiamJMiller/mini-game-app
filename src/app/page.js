import Chessboard from "@/components/ChessBoard/ChessBoard";
import styles from "./page.module.css";
import "./page.scss";
import { Chess } from "chess.js";

export default function Home() {
  // const chess = new Chess();

  // while (!chess.isGameOver()) {
  //   const moves = chess.moves();
  //   const move = moves[Math.floor(Math.random() * moves.length)];
  //   chess.move(move);
  // }
  // console.log(chess.pgn());

  return (
    <main className={styles.main}>
      <h1 className="home__title">My MiniGame Site</h1>
      <div className="home__games-area">
        <div class="home__game-tile">chess</div>
        <div class="home__game-tile">hangman</div>
        <div class="home__game-tile">minesweeper</div>
        <div class="home__game-tile">card matching</div>
        <div class="home__game-tile">number guesser</div>
        <div class="home__game-tile">sudoku</div>
        <div class="home__game-tile">tic tac toe</div>
        <div class="home__game-tile">2048</div>
      </div>
    </main>
  );
}
