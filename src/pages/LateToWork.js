import { useEffect, useRef, useState } from "react";
import { gameOptions } from "./LTWGameOptions";

function LateToWork() {
  const gameContainerRef = useRef(null);
  const [Phaser, setPhaser] = useState(null);
  const [gameInitialized, setGameInitialized] = useState(false);

  useEffect(() => {
    import("phaser").then((Phaser) => {
      setPhaser(Phaser);
    });
  }, []);

  useEffect(() => {
    if (Phaser && gameContainerRef.current && !gameInitialized) {
      if (!gameContainerRef.current.firstChild) {
        let gameWidth = gameContainerRef.current.offsetWidth;
        let gameHeight = gameContainerRef.current.offsetHeight;

        gameOptions.playerStartPosition =
          gameHeight * gameOptions.playerStartPositionRatio;
        gameOptions.platformHeight =
          gameHeight * gameOptions.platformHeightRatio;

        gameOptions.spawnRange =
          gameWidth <= 375
            ? gameOptions.smallScreenSpawnRange
            : gameOptions.largeScreenSpawnRange;

        import("./LTWConfig").then(
          ({
            StartScreen,
            playGame,
            GameOver,
            LeaderboardScene,
            InstructionsScene,
          }) => {
            let gameConfig = {
              type: Phaser.CANVAS,
              backgroundColor: gameOptions.gameBackgroundColor,
              scale: {
                mode: Phaser.Scale.FIT,
                parent: gameContainerRef.current,
                width: gameWidth - 4,
                height: gameHeight,
                autoCenter: Phaser.Scale.CENTER_BOTH,
              },
              scene: [
                StartScreen,
                playGame,
                GameOver,
                LeaderboardScene,
                InstructionsScene,
              ],
              physics: {
                default: "arcade",
              },
            };

            let game = new Phaser.Game(gameConfig);

            game.scene.start("StartScreen");

            window.focus();

            return () => {
              game.destroy(true);
            };
          }
        );
      }
    }
  }, [Phaser, gameInitialized]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div id="gameContainer" ref={gameContainerRef} />
    </main>
  );
}

export default LateToWork;
