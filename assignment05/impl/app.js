"use strict";

function getTutorialInfo() {
    return {
        exerciseNum: 5,
        groupNames: "Jane Doe, Max Mustermann",
        isAnimated: true
    }
}

function draw(two) {
    // get graph data
    let graph = getData().dataEx5;
    // This is where the outermost for-loop of the algorithm is implicitly implemented.
    two.bind('update',
        frameCount => {
            const iteration = frameCount % totalIterations;
            // reset the graph
            if (iteration === 0) {
                graph = getData().dataEx5;
            }

            fdl(graph, iteration);

            // Removes the current graph from the instance's scene
            two.clear();

            // draws the graph
            makeGraph(two, graph)
        });
}

function fdl(graph, iteration) {
    // Task 3: Insert your code. 
}
