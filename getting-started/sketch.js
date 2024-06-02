function make2dArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let blockSize = 10;
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / blockSize);
  rows = floor(height / blockSize);
  grid = make2dArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function mouseClicked() {
  let col = floor(mouseX / blockSize)
  let row = floor(mouseY / blockSize)

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    grid[col][row] = 1
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke()
      if (grid[i][j] == 1) {
        fill(255)
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
      if (curr === 1) {
        let dir = Math.random() < 0.5 ? -1 : 1;
        let below = grid[i][j + 1]

        let belowA = i + dir >= 0 && i + dir < cols ? grid[i + dir][j + 1] : -1;
        let belowB = i - dir >= 0 && i - dir < cols ? grid[i - dir][j + 1] : -1;

        if (below === 0) {
          nextGrid[i][j + 1] = 1
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = curr;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = curr;
        } else {
          nextGrid[i][j] = 1
        }
      }
    }
  }
  grid = nextGrid
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
