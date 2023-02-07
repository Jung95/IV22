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

    /* 3. interpolate the values given in data using IDW
        with the shepard method for each grid cell */

    /* 4. either min-max normalize all the interpolated values and use a given colorscale
        or do it during the drawing step. The given colorscales take an input between 0 and 1. */

    /* 5. compute the size of the grid cells in respect to the drawing area's width/height
        and the resolution of the grid, and then draw the rectangles colored accordingly. */

}
