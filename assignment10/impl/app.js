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
  const stepSize = 10 * (Math.PI / 180);
  //set pitch
  const m = 2;
  // already arranged texts
  const texts = [];

  data.forEach((element) => {
    const fontSize = getFontSize(element["frequency"], tfMax, fontSizeMax);
    let stepCount = 0;
    let isCollided = true;
    //Place biggest unplaced bounding box in centre of canvas
    let x = 0;
    let y = 0;
    //While this bounding box overlaps with already placed boxes
    while (isCollided) {
      isCollided = false;
      //Move bounding box a small fraction along a spiral pattern
      //x = x0 + mθ · cos θ
      x = stepCount * stepSize * m * Math.cos(stepCount * stepSize);
      //y = y0 + mθ · sin θ
      y = stepCount * stepSize * m * Math.sin(stepCount * stepSize);
      const position = getTextBoundingBox(two, element.term, x, y, fontSize);
      const sparklinePosition = {
        top: position.bottom,
        bottom: position.bottom + 15,
        left: x - 30,
        right: x + 30,
      };
      if (texts.length !== 0) {
        texts.forEach((text) => {
          const textPosition = getTextBoundingBox(
            two,
            text.term,
            text.x,
            text.y,
            text.fontSize
          );
          const textSparklinePosition = {
            top: textPosition.bottom,
            bottom: textPosition.bottom + 15,
            left: text.x - 30,
            right: text.x + 30,
          };

          if (checkCollision(position, textPosition)) {
            isCollided = true;
          }
          if (checkCollision(sparklinePosition, textPosition)) {
            isCollided = true;
          }
          if (checkCollision(sparklinePosition, textSparklinePosition)) {
            isCollided = true;
          }
          if (checkCollision(position, textSparklinePosition)) {
            isCollided = true;
          }
        });
      }
      // if it is collided, go to next step
      if (isCollided) {
        stepCount = stepCount + 1;
      }
    }
    //Place bounding box and draw corresponding word inside
    texts.push({ term: element.term, x: x, y: y, fontSize: fontSize });
    two.makeText(element.term, x, y, { size: fontSize });
    const position = getTextBoundingBox(two, element.term, x, y, fontSize);
    makeSparkLine(two, x, position.bottom, element.timeseries);
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

// check collision with SparkLine
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

function makeSparkLine(two, x, y, timeseries) {
  let anchors = [];
  y = y + 15;
  anchors.push(new Two.Anchor(x - 30, y));
  anchors.push(new Two.Anchor(x - 30, -15 * timeseries[0] + y));
  anchors.push(new Two.Anchor(x - 20, -15 * timeseries[1] + y));
  anchors.push(new Two.Anchor(x - 10, -15 * timeseries[2] + y));
  anchors.push(new Two.Anchor(x, -15 * timeseries[3] + y));
  anchors.push(new Two.Anchor(x + 10, -15 * timeseries[4] + y));
  anchors.push(new Two.Anchor(x + 20, -15 * timeseries[5] + y));
  anchors.push(new Two.Anchor(x + 30, -15 * timeseries[6] + y));
  anchors.push(new Two.Anchor(x + 30, y));
  anchors.push(new Two.Anchor(x, y));
  const path = new Two.Path(anchors, false, false);
  path.stroke = "blue";
  path.linewidth = 1;
  path.closed = true;
  path.fill = "blue";
  two.add(path);
  return true;
}
