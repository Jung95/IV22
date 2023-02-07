"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 11,
    groupNames: "Jongho Jung, Nandita Jha",
    isAnimated: false,
  };
}

function draw(two, width, height) {
  // 1. get the data
  const data = getData();
  /* 2. define the resolution of the grid
        use the makeGrid function */
  const N = 50;
  const grid = makeGrid(data, N);

  /* 3. interpolate the values given in data using IDW
        with the shepard method for each grid cell */
  const points = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array.from(Array(0), () => []))
  );
  const weights = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array.from(Array(0), () => []))
  );
  const idws = Array.from(Array(N), () => Array.from(Array(N), () => 0));
  const cells = Array.from(Array(N), () => Array.from(Array(N), () => 0));

  data["features"].forEach((feature) => {
    let i = 0;
    let j = 0;
    for (i; i < N; i++) {
      if (i == N - 1) {
        break;
      }
      if (grid[i][0][0] >= feature["geometry"]["coordinates"][0]) {
        break;
      }
    }
    for (j; j < N; j++) {
      if (j == N - 1) {
        break;
      }
      if (grid[0][j][1] >= feature["geometry"]["coordinates"][1]) {
        break;
      }
    }
    points[i][j].push(feature);
  });

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (points[i][j].length > 0) {
        points[i][j].forEach((point) => {
          let x = point["geometry"]["coordinates"][0] - grid[i][j][0];
          let y = point["geometry"]["coordinates"][1] - grid[i][j][1];
          let distance = Math.sqrt(x * x + y * y);
          let weight = Math.pow(1 / distance, 2);
          weights[i][j].push(weight);
        });
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (weights[i][j].length > 0) {
        let sumPointWeight = 0;
        let sumWeight = 0;
        for (let k = 0; k < weights[i][j].length; k++) {
          sumPointWeight =
            points[i][j][k]["properties"][property] * weights[i][j][k] +
            sumPointWeight;
          sumWeight = weights[i][j][k] + sumWeight;
        }
        idws[i][j] = sumPointWeight / sumWeight;
      }
    }
  }

  /* 4. either min-max normalize all the interpolated values and use a given colorscale
        or do it during the drawing step. The given colorscales take an input between 0 and 1. */
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (idws[i][j] < min) {
        min = idws[i][j];
      }
      if (idws[i][j] > max) {
        max = idws[i][j];
      }
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      idws[i][j] = (idws[i][j] - min) / (max - min);
      cells[i][j] = inferno(idws[i][j]);
    }
  }
  /* 5. compute the size of the grid cells in respect to the drawing area's width/height
        and the resolution of the grid, and then draw the rectangles colored accordingly. */

  let cellWidth = width/N
  let cellHeight = height/N
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        let cell = new Two.Rectangle(cellWidth*(i+0.5), height - cellHeight*(j+0.5), cellWidth, cellHeight)
        cell.fill = cells[i][j]
        cell.linewidth = 0.01
        two.add(cell)
    }
  }
  
}
