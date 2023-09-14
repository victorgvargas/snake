const canvas = document.getElementById("canvas");

class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * @param {string} key
 * @returns {string}
 */
function mapKeyToDirection(key) {
  switch (key) {
    case "ArrowUp":
      return "up";
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    case "ArrowDown":
      return "down";
    default:
      return "";
  }
}

/**
 * @param {string} direction
 */
function moveSnake(direction) {
  if (!direction) return;

  let head = { ...state.position[0] };

  switch (direction) {
    case "up":
      head.y -= 20;
      break;
    case "left":
      head.x -= 20;
      break;
    case "right":
      head.x += 20;
      break;
    case "down":
      head.y += 20;
      break;
  }

  state.position.unshift(head);
  state.position.pop();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Point} cell
 */
function drawSnakeCell(ctx, cell) {
  ctx.fillStyle = "green";
  ctx.fillRect(cell.x, cell.y, 20, 20);
}

// GAME LIFECYLE AREA
const state = {
  position: [
    { x: 0, y: 40 },
    { x: 0, y: 20 },
    { x: 0, y: 0 },
  ],
  direction: "down",
};

function render() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    moveSnake(state.direction);
    state.position.forEach((cell) => drawSnakeCell(ctx, cell));
  }
}

document.addEventListener("keydown", (event) => {
  state.direction = mapKeyToDirection(event.key);
});

setInterval(render, 300);
