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
    let t = cool(iteration)
    //foreach 𝑣 ∈ 𝑉 do
    graph.nodes.forEach((nodeV) => {
        //𝑣. 𝑑𝑖𝑠𝑝 ≔ 0; /* initialize displacement vector */
        nodeV.displacement.x = 0
        nodeV.displacement.y = 0
        //for 𝑢 ∈ 𝑉 do
        graph.nodes.forEach((nodeU) => {
            //if (𝑢 ≠ 𝑣) then
            if(nodeV.nodeID !== nodeU.nodeID){
                //∆← 𝑣. 𝑝𝑜𝑠 − 𝑢. 𝑝𝑜𝑠 ; /* vector between u and v */
                let vectorVU = Two.Vector.sub(nodeV.position, nodeU.position)
                let d = vectorVU.length()
                //𝑣. 𝑑𝑖𝑠𝑝 ← 𝑣. 𝑑𝑖𝑠𝑝 + Δ/ | Δ | ∗ 𝑓𝑟( ∆ ) ;  /* displacement from repulsive forces */
                nodeV.displacement.x = nodeV.displacement.x + ((vectorVU.x/d)*fr(d))
                nodeV.displacement.y = nodeV.displacement.y + ((vectorVU.y/d)*fr(d))
            }
        });
    });
    //foreach e ∈ E do /* e is ordered vertex pair .v and .u */
    graph.nodes.forEach((nodeV) => {
        nodeV.adjacentNodes.forEach((nodeU) => {
            //∆← 𝑒. 𝑣. 𝑝𝑜𝑠 − 𝑒. 𝑢. 𝑝𝑜𝑠 ; 
            let vectorVU = Two.Vector.sub(nodeV.position, nodeU.position)
            let d = vectorVU.length()
            //𝑒. 𝑣. 𝑑𝑖𝑠𝑝 ← 𝑒. 𝑣. 𝑑𝑖𝑠𝑝 − Δ/ | Δ | ∗ 𝑓𝑎( ∆ ); /* displacement from attractive forces */
            nodeV.displacement.x = nodeV.displacement.x - ((vectorVU.x/d)*fa(d))
            nodeV.displacement.y = nodeV.displacement.y - ((vectorVU.y/d)*fa(d))
            //𝑒. 𝑢. 𝑑𝑖𝑠𝑝 ← 𝑒. 𝑢. 𝑑𝑖𝑠𝑝 + Δ/ | Δ | ∗ 𝑓𝑎( ∆ ); /* displacement from attractive forces */
            nodeU.displacement.x = nodeU.displacement.x + ((vectorVU.x/d)*fa(d))
            nodeU.displacement.y = nodeU.displacement.y + ((vectorVU.y/d)*fa(d))
        });
    });

    //foreach 𝑣 ∈ 𝑉 do
    graph.nodes.forEach((nodeV) => {
        /* use temp. t to scale; limit max displacement to frame */
        //𝑣. 𝑝𝑜𝑠 ← 𝑣. 𝑝𝑜𝑠 + 𝑣. 𝑑𝑖𝑠𝑝/ |𝑣.𝑑𝑖𝑠𝑝| ∗ min(|𝑣.𝑑𝑖𝑠𝑝|,𝑡);
        let displacementLength = nodeV.displacement.length()
        nodeV.position.x = nodeV.position.x + (nodeV.displacement.x / displacementLength) * Math.min(displacementLength,t)
        nodeV.position.y = nodeV.position.y + (nodeV.displacement.y / displacementLength) *  Math.min(displacementLength,t)
        //𝑣. 𝑝𝑜𝑠. 𝑥 ← min(𝑊/2, max(−𝑊/2, 𝑣. 𝑝𝑜𝑠. 𝑥)); 
        nodeV.position.x = Math.min(drawingArea.width, Math.max(0,  nodeV.position.x))
        nodeV.position.y = Math.min(drawingArea.height, Math.max(0,  nodeV.position.x))

    });
}