"use client";

import Chessboard from "@/components/ChessBoard/ChessBoard";
import styles from "./page.module.css";
import { Chess } from "chess.js";
import { useState } from "react";

export default function Home() {
  const [game, setGame] = useState(new Chess()); // Initialize the chess game

  return (
    <main className={styles.main}>
      <div>
        <div>My MiniGame Site</div>
        <div>
          <Chessboard game={game} setGame={setGame} />
        </div>
      </div>
    </main>
  );
}
