"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 10,
    groupNames: "Jongho Jung, Nandita Jha",
    isAnimated: false,
  };
}
//getTextBoundingBox(two, text, x, y, size)
function draw(two) {
  // Enter code for Task 1 here
  const data = getData();
  data.sort(function (a, b) {
    return b["frequency"] - a["frequency"];
  });
  const fontSizeMax = 36;
  const tfMax = getTfMax(data);
  //set step size
  const stepSize = 15 * (Math.PI / 180);
  //set pitch
  const m = 1;

  //sample
  const sampleData = data.splice(0, 50);
  const texts = [];

  sampleData.forEach((element) => {
    const fontSize = getFontSize(element["frequency"], tfMax, fontSizeMax);
    let stepCount = 0;
    let isCollided = true;
    let x = 0;
    let y = 0;
    while (isCollided) {
      isCollided = false;
      //x = x0 + mθ · cos θ
      x = stepCount * stepSize * m * Math.cos(stepCount * stepSize);
      //y = y0 + mθ · sin θ
      y = stepCount * stepSize * m * Math.sin(stepCount * stepSize);
      const position = getTextBoundingBox(two, element.term, x, y, fontSize);
      if (texts.length !== 0) {
        texts.forEach((text) => {
          const textPosition = getTextBoundingBox(
            two,
            text.term,
            text.x,
            text.y,
            text.fontSize
          );
          if (checkCollision(position, textPosition)) {
            isCollided = true;
          }
        });
      } else {
        isCollided = false;
      }
      if (isCollided) {
        stepCount = stepCount + 1;
      }
    }
    texts.push({ term: element.term, x: x, y: y, fontSize: fontSize });
    two.makeText(element.term, x, y, { size: fontSize });
  });
}

// get tf Max
function getTfMax(data) {
  let max = 0;
  data.forEach((element) => {
    if (element["frequency"] > max) {
      max = element["frequency"];
    }
  });
  return max;
}

// get Fontsize
function getFontSize(tfT, tfMax, fontSizeMax) {
  return Math.sqrt(tfT / tfMax) * fontSizeMax;
}

// check collision
function checkCollision(a, b) {
  if (contains(a, b)) {
    return true;
  }
  if (overlaps(a, b)) {
    return true;
  }
  if (touches(a, b)) {
    return true;
  }

  return false;
}

function contains(a, b) {
  return !(
    b.left < a.left ||
    b.top < a.top ||
    b.right > a.right ||
    b.bottom > a.bottom
  );
}

function overlaps(a, b) {
  if (a.left >= b.right || b.left >= a.right) return false;
  if (a.top >= b.bottom || b.top >= a.bottom) return false;

  return true;
}

function touches(a, b) {
  if (a.left > b.right || b.left > a.right) return false;
  if (a.top > b.bottom || b.top > a.bottom) return false;

  return true;
}
