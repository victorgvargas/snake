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

function moveSnake() {
  const direction = state.direction;
  const prevDirection = state.initialDirection;

  if (!direction) return;

  let head = { ...state.position[0] };

  switch (direction) {
    case "up":
      if (prevDirection === "down") return;
      head.y -= 20;
      break;
    case "left":
      if (prevDirection === "right") return;
      head.x -= 20;
      break;
    case "right":
      if (prevDirection === "left") return;
      head.x += 20;
      break;
    case "down":
      if (prevDirection === "up") return;
      head.y += 20;
      break;
  }

  head = checkBorderCollision(head);

  state.position.unshift(head);
  state.position.pop();
}
/**
 * @param {Point} cell
 */
function checkBorderCollision(cell) {
  const finalCell = { ...cell };

  if (cell.x > 400) finalCell.x = 0;
  else if (cell.x < 0) finalCell.x = 400;
  else if (cell.y > 400) finalCell.y = 0;
  else if (cell.y < 0) finalCell.y = 400;

  return finalCell;
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
  initialDirection: "down",
};

function render() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    moveSnake();
    state.initialDirection = state.direction;
    state.position.forEach((cell) => drawSnakeCell(ctx, cell));
  }
}

document.addEventListener("keydown", (event) => {
  const newDirection = mapKeyToDirection(event.key);
  const prevDirection = state.initialDirection;

  switch (newDirection) {
    case "up":
      if (prevDirection !== "down") state.direction = newDirection;
      break;
    case "left":
      if (prevDirection !== "right") state.direction = newDirection;
      break;
    case "right":
      if (prevDirection !== "left") state.direction = newDirection;
      break;
    case "down":
      if (prevDirection !== "up") state.direction = newDirection;
      break;
  }
});

setInterval(render, 300);
