const BLOCK_SIZE = 10

let grid
let cols, rows
let hue = 200

function make2dArray(cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0
    }
  }
  return arr
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 360, 255, 255)
  cols = floor(width / BLOCK_SIZE)
  rows = floor(height / BLOCK_SIZE)
  grid = make2dArray(cols, rows)
}

function mouseDragged() {
  let mouseCol = floor(mouseX / BLOCK_SIZE)
  let mouseRow = floor(mouseY / BLOCK_SIZE)

  let ext = 2
  for (let i = -ext; i <= ext; i++) {
    for (let j = -ext; j <= ext; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (mouseCol >= 0 && mouseCol < cols && mouseRow >= 0 && mouseRow < rows) {
          grid[col][row] = hue
        }
      }
    }
  }
  hue = hue > 360 ? 1 : hue + 1
}

function draw() {
  background(0)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke()
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255)
        let x = i * BLOCK_SIZE
        let y = j * BLOCK_SIZE
        square(x, y, BLOCK_SIZE)
      }
    }
  }

  let nextGrid = make2dArray(cols, rows)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let curr = grid[i][j]
      if (curr > 0) {
        let dir = Math.random() < 0.5 ? -1 : 1
        let below = grid[i][j + 1]

        let belowA = i + dir >= 0 && i + dir < cols ? grid[i + dir][j + 1] : -1
        let belowB = i - dir >= 0 && i - dir < cols ? grid[i - dir][j + 1] : -1

        if (below === 0) {
          nextGrid[i][j + 1] = curr
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = curr
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = curr
        } else {
          nextGrid[i][j] = curr
        }
      }
    }
  }
  grid = nextGrid
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
