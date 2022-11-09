"use strict";


function getTutorialInfo() {
    return {
        exerciseNum: 2,  //make sure that this is the right number of the current exercise
        groupNames: "Jane Doe, Max Mustermann", //provide the names of each team member
        isAnimated: false  //if set to true, shapes will be rendered roughly 60 times per second
    };
}

function draw(two) {
  const numbers = getData().dataTask3;

  const X = [];  // X positions
  const Y = [];  // Y positions
  for (let x = 0; x <= 100; x += 0.1) {
    X.push(x);

    Y.push(0);  // TODO: replace by KDE(x)
  }

  drawAxesForTask3(two);
  const path = createPathFromXY(X, Y);
  two.add(path);
}
