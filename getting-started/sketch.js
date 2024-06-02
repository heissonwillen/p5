function make2dArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr.length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 30;
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(width)
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2dArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function mouseDragged() {
  let col = floor(mouseX / w)
  let row = floor(mouseY / w)

  grid[col][row] = 1


}

function draw() {
  background('#000000');
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(255)
      fill(grid[i][j] * 255);
      let x = i * w
      let y = j * w
      square(x, y, w)

      // noStroke()
      // if (grid[i][j] == 1) {
      //   fill(255)
      //   let x = i * w
      //   let y = j * w
      //   square(x, y, w)
      // }
    }
  }

  let nextGrid = make2dArray(cols, rows)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]
      if (state === 1) {
        let below = grid[i][j + 1]
        if (below === 0 && j < rows - 1) {
          nextGrid[i][j + 1] = 1
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
