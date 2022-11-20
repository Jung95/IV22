"use strict";

function getTutorialInfo() {
    return {
        exerciseNum: 3, //make sure that this is the right number of the current exercise
        groupNames: "Jongho Jung, Nandita Jha", //provide the names of each team member
        isAnimated: true //if set to true, shapes will be rendered roughly 60 times per second
    };
}

function draw(two) {
    //  each bar has a unique color
    const colorScale = getColorScale(24);
    //  array of 24 entries with random numbers between 10 and 400
    const arrayA = new Array()
    for (let i = 0; i < 24; i++) {
        arrayA.push(Math.floor(Math.random() * (400 - 10 + 1)) + 10)
    }
    // This array represents plot A and each number corresponds to the height of the respective bar.
    //The width of each bar is fixed at 20 pixels, and between each bar there should be a gap of 10 pixels.
    const rectsA = new Two.Group()
    for (let i = 0; i < 24; i++) {
        let rect = new Two.Rectangle(30 + i * 30, 430 - arrayA[i] / 2, 20, arrayA[i]);
        rect.fill = colorScale[i];
        rect.noStroke();
        rectsA.add(rect)
    }
    two.add(rectsA)
    //Now create a second array representing the bar heights of plot B by cloning the first array.
    const arrayB = arrayA.slice();
    //Randomly choose one bar of plot B
    const randomBar = Math.floor(Math.random() * (24))
    //increase its value by a certain amount (e.g., 5 pixels).
    arrayB[randomBar] = arrayB[randomBar] + 5
    const rectsB = new Two.Group()
    for (let i = 0; i < 24; i++) {
        let rect = new Two.Rectangle(30 + i * 30, 430 - arrayB[i] / 2, 20, arrayB[i]);
        rect.fill = colorScale[i];
        rect.noStroke();
        rectsB.add(rect)
    }
    //log changed randomBar
    console.log(randomBar)
    
    const promise = getFPS();
    promise.then((fps) => {
        //bind to update callback which will be called on every frame
        two.bind('update',
            frameCount => {
                 //this is called roughly *fps* times per second
                if (frameCount % (fps * 4 + 20) == 0) {
                    //Show plot A for 2×fps frames 
                    two.add(rectsA)
                } else if (frameCount % (fps * 4 + 20) == fps * 2) {
                    //Show nothing for 10 frames
                    two.remove(rectsA)
                } else if (frameCount % (fps * 4 + 20) == fps * 2 + 10) {
                    //Show plot B for 2×fps frames
                    two.add(rectsB)
                } else if (frameCount % (fps * 4 + 20) == fps * 4) {
                    //Show nothing for 10 frames
                    two.remove(rectsB)
                }
            });
    });
}