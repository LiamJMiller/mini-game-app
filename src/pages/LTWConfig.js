import Phaser from "phaser";
import { gameOptions } from "./LTWGameOptions.js";

function createInteractiveText(
  scene,
  text,
  xOffset,
  yOffset,
  fontSize,
  onClick,
  color = "#fff"
) {
  let interactiveText = scene.add.text(
    scene.cameras.main.width / 2 + xOffset, // Center horizontally
    scene.cameras.main.height / 2 + yOffset, // Center vertically
    text,
    { fontSize: fontSize, fill: color }
  );
  interactiveText.setOrigin(0.5);

  if (onClick !== null && onClick !== undefined) {
    if (typeof onClick === "function") {
      interactiveText.setInteractive();
      interactiveText.on("pointerdown", onClick);
    } else {
      console.error("onClick must be a function");
    }
  }

  return interactiveText;
}

function animateButton(scene, button) {
  // Create a tween that makes the button grow and shrink
  scene.tweens.add({
    targets: button,
    scaleX: 1.1,
    scaleY: 1.1,
    yoyo: true,
    duration: 500,
    repeat: -1,
    ease: "Sine.easeInOut",
  });
}

// function startGame() {
//   let gameContainer = document.getElementById("gameContainer");
//   let gameWidth = gameContainer.offsetWidth;
//   let gameHeight = gameContainer.offsetHeight;

//   gameOptions.playerStartPosition = gameHeight * PLAYER_START_POSITION_RATIO;
//   gameOptions.platformHeight = gameHeight * PLATFORM_HEIGHT_RATIO;

//   gameOptions.spawnRange =
//     gameWidth <= 375 ? SMALL_SCREEN_SPAWN_RANGE : LARGE_SCREEN_SPAWN_RANGE;

//   // Configuration options for the game
//   let gameConfig = {
//     type: Phaser.CANVAS,
//     backgroundColor: GAME_BACKGROUND_COLOR,
//     scale: {
//       mode: Phaser.Scale.FIT,
//       parent: "gameContainer",
//       width: gameWidth - 4,
//       height: gameHeight,
//       autoCenter: Phaser.Scale.CENTER_BOTH,
//     },
//     scene: [
//       StartScreen,
//       playGame,
//       GameOver,
//       LeaderboardScene,
//       InstructionsScene,
//     ],
//     physics: {
//       default: "arcade",
//     },
//   };
//   // Create a new Phaser Game with the specified configuration
//   game = new Phaser.Game(gameConfig);
//   // Focus the window
//   window.focus();
// }

// Start screen scene
const MOBILE_SCREEN_WIDTH_THRESHOLD = 500;
const TITLE_POSITION_Y_OFFSET = -100;
const INSTRUCTIONS_POSITION_Y_OFFSET = -30;
const START_BUTTON_POSITION_Y_OFFSET = 100;
const LEADERBOARD_BUTTON_POSITION_Y_OFFSET = 30;
export class StartScreen extends (Phaser ? Phaser.Scene : Object) {
  constructor() {
    super("StartScreen");
  }

  create() {
    let isMobile = this.game.scale.width < MOBILE_SCREEN_WIDTH_THRESHOLD;

    // Display the game title
    let titleText = isMobile
      ? "Liam is late\n  to Work!"
      : "Liam is late to Work!";
    createInteractiveText(
      this,
      titleText,
      0, // x position
      TITLE_POSITION_Y_OFFSET,
      "40px",
      null,
      gameOptions.secondaryTextColor
    );

    // Display the game instructions
    createInteractiveText(
      this,
      "Game Instructions",
      0, // x position
      INSTRUCTIONS_POSITION_Y_OFFSET,
      "20px",
      () => this.scene.start("InstructionsScene"),
      gameOptions.quaternaryTextColor
    );

    // Display the "Leaderboard" button
    createInteractiveText(
      this,
      "Leaderboard",
      0, // x position
      LEADERBOARD_BUTTON_POSITION_Y_OFFSET,
      "22px",
      () => this.scene.start("LeaderboardScene")
    );

    // Display the "Start Game" button
    let startGame = createInteractiveText(
      this,
      "Start Game",
      0, // x position
      START_BUTTON_POSITION_Y_OFFSET,
      "40px",
      () => this.scene.start("PlayGame"),
      gameOptions.tertiaryTextColor
    );

    // Animate the "Start Game" button
    animateButton(this, startGame);
  }
}

// The main game scene
export class playGame extends (Phaser ? Phaser.Scene : Object) {
  constructor() {
    super("PlayGame");
  }
  preload() {
    this.load.image("platform", "/assets/platform.png");
    this.load.image("player", "/assets/player.png");
    this.load.image("background", "/assets/skyline-8285171_1280.png");
    this.load.image("bean", "/assets/coffeebean.png");
    this.load.atlas(
      "liamSpriteWalk",
      "/assets/sprites/liamSpritewalk.png",
      "/assets/sprites/liamSpriteWalk.json"
    );
  }

  create() {
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
    this.addPlatform(
      this.sys.game.config.width,
      this.sys.game.config.width / 2
    );

    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      this.sys.game.config.height / 2,
      "liamSpriteWalk"
    );

    // Create the animation
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

    // Play the animation
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
  }

  // Method to spawn a bean on a platform or in the air
  spawnBean(platform) {
    let yPosition = platform.y - platform.displayHeight / 2 - 50;
    // Add a random offset to the y-coordinate
    yPosition -= Math.random() * 100; // Adjust the multiplier to control the maximum height

    let bean = this.beans.create(platform.x, yPosition, "bean");
    bean.setVelocityX(platform.body.velocity.x);
    bean.setImmovable();
    bean.setScale(0.1); // Shrink the size of the bean by 10%
  }

  // Method to collect a bean
  collectBean(player, bean) {
    this.beans.remove(bean);
    bean.destroy();
    this.updateScore(3); // Increase score by 5
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(
        posX,
        gameOptions.platformHeight,
        "platform"
      );
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );

    // Spawn a bean on the platform
    if (Math.random() < 0.2) {
      // 50% chance to spawn a bean
      this.spawnBean(platform);
    }
  }

  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
    if (this.player.body.touching.down) {
      this.updateScore(1);
    }
  }

  updateScore(score) {
    gameOptions.score += score;
    this.scoreText.setText("Score: " + gameOptions.score);
    this.registry.set("score", gameOptions.score); // Add this line
  }

  update() {
    this.player.x = gameOptions.playerStartPosition;

    // Recycle platforms
    let minDistance = this.sys.game.config.width;
    let platformGroup = this.platformGroup.getChildren();
    for (let platform of platformGroup) {
      let platformDistance =
        this.sys.game.config.width - platform.x - platform.displayWidth / 2;
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
        this.sys.game.config.width + nextPlatformWidth / 2
      );
    }

    // Scroll the background
    this.bg1.tilePositionX += gameOptions.backgroundSpeed;
    this.bg2.tilePositionX += gameOptions.backgroundSpeed;

    // Check if player has fallen off the screen
    if (this.player.y > this.sys.game.config.height) {
      // Player has fallen off the screen, go to game over scene
      this.scene.start("GameOver", { score: gameOptions.score });
    }

    // Check for overlap between the player and the beans
    this.physics.overlap(this.player, this.beans, this.collectBean, null, this);
  }
}

// The leaderboard scene
export class LeaderboardScene extends (Phaser ? Phaser.Scene : Object) {
  constructor() {
    super("LeaderboardScene");
  }

  create() {
    this.scoresPerPage = 10;
    this.currentPage = 0;

    let leaderboard = localStorage.getItem("leaderboard");
    this.leaderboard = leaderboard ? JSON.parse(leaderboard) : [];

    if (!this.leaderboard || this.leaderboard.length === 0) {
      let noAttemptsText = createInteractiveText(
        this,
        "No attempts yet!",
        0,
        0,
        "30px",
        null,
        gameOptions.primaryTextColor
      );
    } else {
      let highScore = Math.max(...this.leaderboard.map((item) => item.score));
      let highScoreText = createInteractiveText(
        this,
        `High Score: ${highScore}`,
        0,
        -200,
        "30px",
        null,
        gameOptions.secondaryTextColor
      );

      let underline = this.add.rectangle(
        this.cameras.main.centerX,
        highScoreText.y + highScoreText.height / 2 + 5, // 10 is the offset, adjust as needed
        highScoreText.width,
        5, // 2 is the height of the rectangle, adjust as needed
        0x569cd6
      );
      underline.setOrigin(0.5, 0);
    }

    this.scoreContainer = this.add.container(0, 150);

    // Calculate the y position of the buttons container
    let buttonsY = this.scoreContainer.y + this.scoreContainer.height + 30;

    // Create a container for the buttons
    this.buttonContainer = this.add.container(0, buttonsY);

    this.createButtons();

    this.displayPage(this.currentPage);
  }

  displayPage(page) {
    this.scoreContainer.removeAll(true);
    let start = page * this.scoresPerPage;
    let end = Math.min(start + this.scoresPerPage, this.leaderboard.length);

    for (let i = start; i < end; i++) {
      let scoreText = createInteractiveText(
        this,
        `Attempt ${this.leaderboard[i].attempt} : ${this.leaderboard[i].score}`,
        0,
        (i - start) * 32 - 300,
        "28px",
        null,
        "#ffffff"
      );
      this.scoreContainer.add(scoreText);
    }

    // Update the visibility of the buttons
    this.previousButton.setVisible(page > 0);
    this.nextButton.setVisible(
      (page + 1) * this.scoresPerPage < this.leaderboard.length
    );
  }

  createButtons() {
    // Create the "Previous" button
    this.previousButton = createInteractiveText(
      this,
      "Prev",
      -100,
      0, // Position at the top of the container
      "32px",
      () => {
        if (this.currentPage > 0) {
          this.currentPage--;
          this.displayPage(this.currentPage);
        }
      },
      gameOptions.tertiaryTextColor
    );
    this.previousButton.setVisible(this.currentPage > 0); // Hide if on the first page
    this.buttonContainer.add(this.previousButton);

    // Create the "Next" button
    this.nextButton = createInteractiveText(
      this,
      "Next",
      100,
      0, // Position at the top of the container
      "32px",
      () => {
        let nextPageStart = (this.currentPage + 1) * this.scoresPerPage;
        if (nextPageStart < this.leaderboard.length) {
          this.currentPage++;
          this.displayPage(this.currentPage);
        }
      },
      gameOptions.tertiaryTextColor
    );
    this.nextButton.setVisible(
      (this.currentPage + 1) * this.scoresPerPage < this.leaderboard.length
    ); // Hide if on the last page
    this.buttonContainer.add(this.nextButton);

    // Create the "Back" button
    let backButton = createInteractiveText(
      this,
      "Back",
      -100,
      50, // Position 50 pixels below the top of the container
      "32px",
      () => this.scene.start("StartScreen"),
      gameOptions.quaternaryTextColor
    );
    this.buttonContainer.add(backButton);

    // Create the "Reset" button
    let resetButton = createInteractiveText(
      this,
      "Reset",
      100,
      50, // Position 50 pixels below the top of the container
      "32px",
      () => {
        localStorage.removeItem("leaderboard");
        this.scene.restart();
      },
      gameOptions.quaternaryTextColor
    );
    this.buttonContainer.add(resetButton);
  }
}

export class InstructionsScene extends (Phaser ? Phaser.Scene : Object) {
  constructor() {
    super("InstructionsScene");
  }

  create() {
    // Determine title size based on screen width
    let titleSize = this.sys.game.config.width < 800 ? "28px" : "40px";
    // Determine text size based on screen width
    let textSize = this.sys.game.config.width < 800 ? "16px" : "20px";

    // Display the title
    let instructionsTitle = createInteractiveText(
      this,
      "Game Instructions",
      0, // x position
      -200, // y position
      titleSize,
      null,
      gameOptions.secondaryTextColor
    );

    // Create an underline
    let underline = this.add.rectangle(
      instructionsTitle.x,
      instructionsTitle.y + instructionsTitle.height / 4 + 8, // Position it below the titleinstructionsTitle
      instructionsTitle.width,
      4, // Height of the underline
      0x569cd6
    );

    // Add the underline to the scene
    this.add.existing(underline);

    // Display the instructions
    let instructionsText = `
      1. Tap the screen or left 
         click on mouse to jump.

      2. Avoid falling into the
         void.

      3. Get as high a score as 
         possible!

      4. The score is increased by 1 
         every second and every 
         platform you land on.

      5. Collect coffee beans for
         bonus points!
    `;
    createInteractiveText(
      this,
      instructionsText,
      -25, // x position
      -25, // y position
      textSize,
      null,
      gameOptions.primaryTextColor
    );

    // Display the "Back" button
    createInteractiveText(
      this,
      "Back",
      0, // x position
      200, // y position
      "22px",
      () => this.scene.start("StartScreen"),
      gameOptions.quaternaryTextColor
    );
  }
}

// The game over scene
const FINAL_SCORE_POSITION_Y_OFFSET = -100;
const TRY_AGAIN_BUTTON_POSITION_Y_OFFSET = -30;
// Remove the duplicate declaration of 'LEADERBOARD_BUTTON_POSITION_Y_OFFSET'
// const LEADERBOARD_BUTTON_POSITION_Y_OFFSET = 30; // dont remove this for future implementation
const EXIT_BUTTON_POSITION_Y_OFFSET = 100;
export class GameOver extends (Phaser ? Phaser.Scene : Object) {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.finalScore =
      typeof data.score === "number" && !isNaN(data.score) ? data.score : 0;
    this.addToLeaderboard();
  }

  create() {
    // Determine text size based on screen width
    let textSize = this.sys.game.config.width < 800 ? "30px" : "40px";

    // Display the final score
    createInteractiveText(
      this,
      "Final Score: " + this.finalScore,
      0,
      FINAL_SCORE_POSITION_Y_OFFSET,
      textSize,
      null,
      gameOptions.secondaryTextColor
    );

    // Display the "Try Again" button
    let tryagainbutton = createInteractiveText(
      this,
      "Try Again",
      0,
      TRY_AGAIN_BUTTON_POSITION_Y_OFFSET,
      "28px",
      () => this.scene.start("PlayGame"),
      gameOptions.tertiaryTextColor
    );

    animateButton(this, tryagainbutton);

    // Display the "Leaderboard" button
    createInteractiveText(
      this,
      "Leaderboard",
      0,
      LEADERBOARD_BUTTON_POSITION_Y_OFFSET,
      "22px",
      () => this.scene.start("LeaderboardScene")
    );

    // Display the "Exit" button
    createInteractiveText(
      this,
      "Exit",
      0,
      EXIT_BUTTON_POSITION_Y_OFFSET,
      "22px",
      () => this.scene.start("StartScreen"),
      gameOptions.quaternaryTextColor
    );
  }

  addToLeaderboard() {
    let leaderboard = localStorage.getItem("leaderboard");
    leaderboard = leaderboard ? JSON.parse(leaderboard) : [];

    leaderboard.push({
      attempt: leaderboard.length + 1,
      score: this.finalScore,
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
}
