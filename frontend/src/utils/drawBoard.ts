import { PIECES_COLORS, BLOCK_SIZE} from "../constants";

export const drawBoard = (canvas, board) => {

  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {

      const color = PIECES_COLORS[board[row][col]];
      ctx.fillStyle = color;
      ctx.strokeStyle = "#eee";
      ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

    }
  }

}