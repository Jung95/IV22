"use strict";


function getTutorialInfo() {
  return {
    exerciseNum: 2, //make sure that this is the right number of the current exercise
    groupNames: "Jongho Jung, Nandita Jha", //provide the names of each team member
    isAnimated: false //if set to true, shapes will be rendered roughly 60 times per second
  };
}

function draw(two) {
  const numbers = getData().dataTask3;

  const X = []; // X positions
  const Y = []; // Y positions
  /*
  The accumulation of ink drops (=kernels) at any given point 𝒙 on the canvas is expressed by this formula:
  f_h(x) = 1/n*h sum i=1=>n K((x-x_i) / h)
  */
  let xiData = [];
  let range = 1000
  let startPoint = 0;
  for (let i = 0; i <= range; i++) {
    xiData[i] = (startPoint + (i * 0.1)).toFixed(1);
  }

  const h = 0.5
  const n = numbers.length
  let data = [];
  let kernel = [];
  //Create the density estimate
  for (let i = 0; i < xiData.length; i++) {
    let temp = 0;
    kernel.push([]);
    kernel[i].push(new Array(n));
    for (let j = 0; j < n; j++) {
      temp = temp + gaussianKDE((numbers[j] -xiData[i])/ h);
      kernel[i][j] = gaussianKDE((numbers[j] -xiData[i])/ h);
    }
    data.push((1 / (n*h)) * temp);
  }
  for (let x = 0; x <= 100; x += 0.1) {
    X.push(x);
    let y = (x*10).toFixed(0)
    Y.push(data[y]); // TODO: replace by KDE(x)
  }

  drawAxesForTask3(two);
  const path = createPathFromXY(X, Y);
  two.add(path);
}

function gaussianKDE(u) {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(u, 2) / -2);
}