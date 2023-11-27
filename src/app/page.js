import Chessboard from "@/components/ChessBoard";
import GamesList from "@/components/GamesList";
import styles from "./page.module.css";
import "./page.scss";
import { Chess } from "chess.js";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="home__title">My MiniGame Site</h1>
      <div className="home__games-area">
        <div className="home__game-tile">chess</div>
        <div className="home__game-tile">hangman</div>
        <div className="home__game-tile">minesweeper</div>
        <div className="home__game-tile">card matching</div>
        <div className="home__game-tile">number guesser</div>
        <div className="home__game-tile">sudoku</div>
        <div className="home__game-tile">tic tac toe</div>
        <div className="home__game-tile">2048</div>
      </div>
      <br />
      <GamesList />
      <Chessboard />
    </main>
  );
}
