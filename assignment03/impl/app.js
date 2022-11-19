"use strict";

function getTutorialInfo() {
    return {
        exerciseNum: 3,  //make sure that this is the right number of the current exercise
        groupNames: "Jongho Jung, Nandita Jha", //provide the names of each team member
        isAnimated: true  //if set to true, shapes will be rendered roughly 60 times per second
    };
}

function draw(two) {
    //skeleton
    const rect = two.makeRectangle(200, 100, 120, 120);
    const colorScale = getColorScale(1);
    rect.noStroke();
    rect.fill = colorScale[0];
    const promise = getFPS();

    promise.then((fps) => {
        //bind to update callback which will be called on every frame
        two.bind('update',
            frameCount => {
                //this is called roughly *fps* times per second
                rect.width = frameCount % (2*fps);
                rect.translation.x = 200 + rect.width / 2;

            }); 
    });
}

