"use client";

import GamesList from "@/components/GamesList";
import LateToWork from "@/pages/LateToWork";
import styles from "./page.module.css";
import "./page.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="home__title">My MiniGame Site</h1>
      <GamesList />
    </main>
  );
}
