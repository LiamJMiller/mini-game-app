import Chessboard from "@/components/ChessBoard/ChessBoard";
import styles from "./page.module.css";
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
      <div>
        <h1>My MiniGame Site</h1>
        <div>
          <Chessboard />
        </div>
      </div>
    </main>
  );
}
