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
  f_h(x) = 1/n*h sum i=1=>n K((x-x_i) / h) with K(u) = 1/ sqrt(1/PI)*e^(u^2/-2)
  */
  //bandwidth h is 0.5
  const h = 0.5
  const n = numbers.length

  for (let x = 0; x <= 100; x += 0.1) {
    X.push(x);
    let temp = 0;
    // sum i=1=>n K((x-x_i) / h)
    for (let i = 0; i < n; i++) {
      // K((x-x_i) / h) = K(u) = 1/ sqrt(1/PI)*e^(u^2/-2)
      // x = numbers[i], x_i = x
      let kde =  (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(( (numbers[i] - x) / h), 2) / -2)
      temp = temp + kde;
    }
    // 1/n*h 
    temp = (1 / (n * h)) * temp
    Y.push(temp); // TODO: replace by KDE(x)
  }

  drawAxesForTask3(two);
  const path = createPathFromXY(X, Y);
  two.add(path);
}