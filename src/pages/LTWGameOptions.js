// Global game options
let gameOptions = {
  // Player options
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  playerStartPositionRatio: 0.25,
  maxConsecutiveJumps: 3,

  // Platform options
  platformStartSpeed: 350,
  platformSizeRange: [50, 250],
  platformHeightRatio: 0.8,

  // Spawn options
  spawnRange: [100, 350],
  smallScreenSpawnRange: [50, 150],
  largeScreenSpawnRange: [100, 350],

  // Score options
  initialScore: 0,
  scoreTimer: null,

  // Visual options
  backgroundSpeed: 1,
  gameBackgroundColor: 0x444444,
  primaryTextColor: "#fff",
  secondaryTextColor: "#569cd6",
  tertiaryTextColor: "#d6565c",
  quaternaryTextColor: "#d69056",
};
export { gameOptions };
