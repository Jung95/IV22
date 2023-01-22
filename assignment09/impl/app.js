"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 9,
    groupNames: "Jongho Jung, Nandita Jha",
    isAnimated: false,
  };
}

function draw(two) {
  //TODO (b): Play around with different values of k
  const k = 5;
  //-------------
  const colors = getTenDistinctColors();
  const data = getData().dataEx9;
  const clusters = getClustering(k, data);
  drawUnitSquareScatterPlotAxes(two);
  for (let i = 0; i < clusters.length; i++) {
    drawToUnitSquareScatterPlot(two, clusters[i], colors[i]);
  }
}

function getClustering(k, data) {
  if (k <= 1) return [data];
  //TODO (a): Perform k-Means clustering
}
