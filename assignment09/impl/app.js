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
  /**
   * get array, that contains k arrays each containing the corresponding data items of the respective cluster.
   */
  // get random centroids from data
  const centroids = getRandomCentroids(k, data);
  // Assign labels to each datapoint based on centroids
  // prep data structure:
  const labels = [];
  for (let c = 0; c < centroids.length; c++) {
    labels[c] = [centroids[c]];
  }
  // For each element in the dataset, choose the closest centroid.
  // Make that centroid the element's label.
  for (let i = 0; i < data.length; i++) {
    const a = data[i];
    let closestCentroid, closestCentroidIndex, prevDistance;
    for (let j = 0; j < centroids.length; j++) {
      let centroid = centroids[j];
      if (j === 0) {
        closestCentroid = centroid;
        closestCentroidIndex = j;
        prevDistance = math.distance(a, closestCentroid);
      } else {
        // get  distance:
        const distance = math.distance(a, centroid);
        if (distance < prevDistance) {
          prevDistance = distance;
          closestCentroid = centroid;
          closestCentroidIndex = j;
        }
      }
    }
    // push point to centroid labels array:
    labels[closestCentroidIndex].push(a);
  }
  return labels;
}

// help functions

function getRandomCentroids(k, data) {
  /**
   * get random centroids from data
   */

  const CentroidIndex = new Array();
  const numSample = data.length;
  let index;
  while (CentroidIndex.length < k) {
    index = getRandomNumber(0, numSample);
    if (CentroidIndex.indexOf(index) === -1) {
      CentroidIndex.push(index);
    }
  }
  const centroids = [];
  for (let i = 0; i < CentroidIndex.length; i++) {
    const centroid = [...data[CentroidIndex[i]]];
    centroids.push(centroid);
  }
  return centroids;
}
