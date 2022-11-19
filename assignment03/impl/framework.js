"use strict";

let metaInfo;
let colorScale = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",
        "#7f7f7f", "#bcbd22", "#17becf","#98e2bb","#f3d1aa","#fdaaf3","#fbffc2","#ecacac","#a1b7f7","#dbd643",
        "#41d8d8","#4368d6","#8a3dd6","#d83bb1"];

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area

    const main = document.getElementById("main");
    
    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo)
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };


    const mainTitle = document.createElement("h1");
    mainTitle.style.fontFamily = "sans-serif";
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Exercise " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Exercise " + metaInfo.exerciseNum;


    const groupBlock = document.createElement("h2");
    groupBlock.style.fontFamily = "sans-serif";
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "900px";
    drawingArea.style.height = "600px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}


function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 900,
        height: 600
    };

    const two = new Two(params);
    two.appendTo(drawingArea);

    //perform drawing instructions, this is defined in app.js
    draw(two);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated)
        two.play();
    else
        two.update();
}

// functions for exercise 3 (change blindness)
async function getFPS() {
    let promise = new Promise((resolve, reject)=> {
        // calculate fps
        let fps = 1;
        let times = [];
        let fpsLoop = function (timestamp) {
            while (times.length > 0 && times[0] <= timestamp - 1000) {
                times.shift();
            }
            times.push(timestamp);
            fps = times.length;
            if(times[times.length-1] > 1000) {
                cancelAnimationFrame(fpsLoop);
                resolve(fps);
            }        
            else
                requestAnimationFrame(fpsLoop);
        }

        requestAnimationFrame(fpsLoop);    
    });
    

    let result = await promise;
    return result;
}

// functions for exercise 3 (change blindness)
function getColorScale(numColors) {
    let newColorScale = new Array();
    if(numColors <= colorScale.length)
        newColorScale = colorScale.slice(0, numColors);        
    else if(numColors > colorScale.length) {
        newColorScale = colorScale.slice(0, colorScale.length);
        for(let i = 0; i < numColors - colorScale.length; i++)
            newColorScale.push(colorScale[Math.floor(Math.random()*colorScale.length)]);
    }        
    return newColorScale;    
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
