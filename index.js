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

    switch (direction) {
        case "up":
            state.position.map(cell => ({x: cell.x, y: cell.y - 20}));
            break;
        case "left":
            state.position.map(cell => ({x: cell.x - 20, y: cell.y}));
            break;
        case "right":
            state.position.map(cell => ({x: cell.x + 20, y: cell.y}));
            break;
        case "down":
            state.position.map(cell => ({x: cell.x, y: cell.y + 20}));
            break;
    }
}   

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} direction
 */
function drawSnake(ctx) {
    ctx.fillStyle = "green";
    state.position.forEach(cell => ctx.fillRect(cell.x, cell.y, 20, 20));
}

// GAME LIFECYLE AREA
const state = {
    position: [{ x: 0, y: 40 }, { x: 0, y: 20 }, { x: 0, y: 0 }],
    direction: "down"
};

function render() {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 400, 400);

        moveSnake();
        drawSnake(ctx);
    }
}

document.addEventListener('keydown', (event) => mapKeyToDirection(event.key));

render();