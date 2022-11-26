"use strict";


function getTutorialInfo() {
    return {
        exerciseNum: 4,  //make sure that this is the right number of the current exercise
        groupNames: "Jongho Jung, Nandita Jha", //provide the names of each team member
        isAnimated: false  //if set to true, shapes will be rendered roughly 60 times per second
    };
}

function draw(two) {
    /* perform drawing operations using 'two'
     * the drawing area comprises 900px (width) x 600px (height)
     * you can find a comprehensive documentation on https://two.js.org
     *
     * for instance, draw a rectangle like this:
     * (replace the following code with your actual drawing logic of the exercise)
     */

    //draw rectangle with x, y, width, height in constructor (x,y relate to center of rect!)
    const rect = two.makeRectangle(213, 100, 100, 100);
    rect.fill = 'rgb(0, 200, 255)'; //fill with blueish color
    rect.opacity = 0.75; //make it a little bit transparent
    rect.noStroke();  //make sure that the rectangle does not have a border
}