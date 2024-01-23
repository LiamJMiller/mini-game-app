import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const PlayGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: {
        preload: function () {
          this.load.image("platform", "/Assets/platform.png");
          this.load.image("player", "/Assets/player.png");
          // Load other assets...
        },
        create: function () {
          gameOptions.score = 0;

          // Create a group for the beans
          this.beans = this.physics.add.group();

          this.platformGroup = this.add.group({
            removeCallback: function (platform) {
              platform.scene.platformPool.add(platform);
            },
          });

          this.bg1 = this.add
            .tileSprite(
              0,
              0,
              this.cameras.main.width,
              this.cameras.main.height,
              "background"
            )
            .setOrigin(0, 0);
          this.bg2 = this.add
            .tileSprite(
              0,
              0,
              this.cameras.main.width,
              this.cameras.main.height,
              "background"
            )
            .setOrigin(0, 0);
          this.bg2.x = this.bg1.width;

          this.platformPool = this.add.group({
            removeCallback: function (platform) {
              platform.scene.platformGroup.add(platform);
            },
          });

          this.playerJumps = 1;
          this.addPlatform(game.config.width, game.config.width / 2);

          this.player = this.physics.add.sprite(
            gameOptions.playerStartPosition,
            game.config.height / 2,
            "liamSpriteWalk"
          );

          if (!this.anims.exists("walk")) {
            this.anims.create({
              key: "walk",
              frames: this.anims.generateFrameNames("liamSpriteWalk", {
                start: 0,
                end: 8,
                zeroPad: 1,
                prefix: "spritesheet_walk-",
                suffix: ".png",
              }),
              frameRate: 10,
              repeat: -1,
            });
          }

          this.player.anims.play("walk", true);
          this.player.setGravityY(gameOptions.playerGravity);
          this.physics.add.collider(this.player, this.platformGroup);
          this.input.on("pointerdown", this.jump, this);

          this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            fill: gameOptions.secondaryTextColor,
          });

          gameOptions.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateScore,
            callbackScope: this,
            loop: true,
            args: [1],
          });
        },
        update: function () {
          this.player.x = gameOptions.playerStartPosition;

          // Recycle platforms
          let minDistance = game.config.width;
          let platformGroup = this.platformGroup.getChildren();
          for (let platform of platformGroup) {
            let platformDistance =
              game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if (platform.x < -platform.displayWidth / 2) {
              this.platformGroup.killAndHide(platform);
              this.platformGroup.remove(platform);
            }
          }

          // Add new platforms
          if (minDistance > this.nextPlatformDistance) {
            let nextPlatformWidth = Phaser.Math.Between(
              gameOptions.platformSizeRange[0],
              gameOptions.platformSizeRange[1]
            );
            this.addPlatform(
              nextPlatformWidth,
              game.config.width + nextPlatformWidth / 2
            );
          }

          // Scroll the background
          this.bg1.tilePositionX += gameOptions.backgroundSpeed;
          this.bg2.tilePositionX += gameOptions.backgroundSpeed;

          // Check if player has fallen off the screen
          if (this.player.y > game.config.height) {
            // Player has fallen off the screen, go to game over scene
            this.scene.start("GameOver", { score: gameOptions.score });
          }

          // Check for overlap between the player and the beans
          this.physics.overlap(
            this.player,
            this.beans,
            this.collectBean,
            null,
            this
          );
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div id="phaser-game" ref={gameRef} />;
};

export default PlayGame;
