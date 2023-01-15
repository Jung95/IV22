"use strict";

function getTutorialInfo() {
  return {
    exerciseNum: 8,
    groupNames: "Jongho Jung, Nandita Jha",
  };
}

// feel free to tweak this DURING TESTING
const quadtreeMaxDepth = 3; //default 10
const canvasLength = 512;

/**
 * Initialize the quadtree.
 *
 * @param circles: Array<Two.Circle>: The array of data to add to the quadtree.
 *                                    Each datum is a `Two.Circle` object. Its
 *                                    position is stored in its `position`
 *                                    property, which is a `Two.Vector` with an
 *                                    `x` and `y` value.
 * @param x0: number:                 left boundary
 * @param x1: number:                 right boundary
 * @param y0: number:                 upper boundary
 * @param y1: number:                 lower boundary
 *
 * @return: any:                      The quadtree root node. The shape of this
 *                                    object is up to you. This is the same
 *                                    object that will be passed to
 *                                    `getQuadtreeAreas` and
 *                                    `getClosestCircles`.
 */
function initQuadtree(circles, x0, x1, y0, y1) {
  //console.log(x0, x1, y0, y1);
  //circles[0].position.x
  // TODO
  //Calc Now Depth
  let nowDepth = 0;
  let length = x1 - x0;
  while (length < canvasLength) {
    nowDepth = nowDepth + 1;
    length = length * 2;
  }
  // if now depth is bigger than max depth, retrun leaf-node
  if (nowDepth > quadtreeMaxDepth) {
    let node = {
      isLeaf: true,
      circles: circles,
      x0: x0,
      x1: x1,
      y0: y0,
      y1: y1,
      children: [],
    };
    return node;
  }

  // if number of circle is 0, return leaf-node with zero - circles
  if (circles.length == 0) {
    let node = {
      isLeaf: true,
      circles: null,
      x0: x0,
      x1: x1,
      y0: y0,
      y1: y1,
      children: [],
    };
    return node;
  }
  //Check Merge

  //Split Quad
  let subWidth = (x1 - x0) / 2;
  let subHeight = (y1 - y0) / 2;
  // index
  let TopLeftQuad = new Array();
  let TopRightQuad = new Array();
  let BottomLeftQuad = new Array();
  let BottomRightQuad = new Array();
  circles.forEach((circle) => {
    //belong Top Left
    if (
      circle.position.x <= x0 + subWidth &&
      circle.position.y <= y0 + subHeight
    ) {
      TopLeftQuad.push(circle);
    }
    //belong Top Right
    else if (circle.position.x <= x1 && circle.position.y <= y0 + subHeight) {
      TopRightQuad.push(circle);
    }
    //belong Bottom Left
    else if (circle.position.x <= x0 + subWidth && circle.position.y <= y1) {
      BottomLeftQuad.push(circle);
    }
    //belong Bottom Top
    else if (circle.position.x <= x1 && circle.position.y <= y1) {
      BottomRightQuad.push(circle);
    }
  });

  //Top Left
  let topLeftNode = initQuadtree(
    TopLeftQuad,
    x0,
    x1 - subWidth,
    y0,
    y1 - subHeight
  );
  //Top Right
  let topRightNode = initQuadtree(
    TopRightQuad,
    x0 + subWidth,
    x1,
    y0,
    y1 - subHeight
  );
  //Bottom Left
  let bottomLeftNode = initQuadtree(
    BottomLeftQuad,
    x0,
    x1 - subWidth,
    y0 + subHeight,
    y1
  );
  //Bottom Right
  let bottomRightNode = initQuadtree(
    BottomRightQuad,
    x0 + subWidth,
    x1,
    y0 + subHeight,
    y1
  );

  return {
    isLeaf: false,
    x0: x0,
    x1: x1,
    y0: y0,
    y1: y1,
    children: [topLeftNode, topRightNode, bottomLeftNode, bottomRightNode],
  };
}

/**
 * Get all quadtree boundary squares.
 *
 * @param quadtreeRoot: any:  The root of the quadtree, as returned by
 *                            `initQuadtree`
 *
 * @return: Array<{ x0: number, x1: number, y0: number, y1: number }>:
 *                            An array of objects with the minimal and maximal
 *                            x and y values for each node of the quadtree (not
 *                            only the leaves!). The return value will be used
 *                            to draw the squares.
 */
function getQuadtreeAreas(quadtreeRoot) {
  return []; // TODO
}

/**
 * Find candidates for data (`Two.Circle` objects) within `radius` of (`x`,`y`).
 *
 * @param quadtreeRoot: any:    The root of the quadtree, as returned by
 *                              `initQuadtree`
 * @param x: number:            The x coordinate component
 * @param y: number:            The y coordinate component
 * @param radius: number:       The radius within which to return results.
 *
 * @return: Array<Two.Circle>:  An array of the data which *could be* within that
 *                              radius. Specifically, all data from all
 *                              quadtree leaves that at least partially lie
 *                              within the radius.
 */
function quadtreeSearchAround(quadtreeRoot, x, y, radius) {
  // TODO: implement search in quadtree
  const candidates = [];
  return candidates;
}
