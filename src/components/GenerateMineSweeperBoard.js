const numRows = 10;
const numCols = 10;
const numMines = 20;

function generateBoard() {
  // Create an empty board with all cells initially hidden
  const board = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill({ isMine: false, isRevealed: false }));

  // Place mines randomly on the board
  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate the number of mines adjacent to each cell
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (!board[row][col].isMine) {
        // Calculate the number of mines in the adjacent cells (8 directions)
        let mineCount = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (
              newRow >= 0 &&
              newRow < numRows &&
              newCol >= 0 &&
              newCol < numCols &&
              board[newRow][newCol].isMine
            ) {
              mineCount++;
            }
          }
        }
        board[row][col].mineCount = mineCount;
      }
    }
  }

  return board;
}

export default generateBoard;
