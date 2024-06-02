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

let grid
let blockSize = 10
let cols, rows
let hue = 200

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, 360, 255, 255)
  cols = floor(width / blockSize)
  rows = floor(height / blockSize)
  grid = make2dArray(cols, rows)
}

function mouseDragged() {
  let col = floor(mouseX / blockSize)
  let row = floor(mouseY / blockSize)

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    grid[col][row] = hue
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
        let x = i * blockSize
        let y = j * blockSize
        square(x, y, blockSize)
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
