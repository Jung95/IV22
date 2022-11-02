"use strict";


function getTutorialInfo() {
    return {
        exerciseNum: 1,
        groupNames: "Jongho Jung, Nandita Jha",
        isAnimated: false
    };
}


function draw(two) {

    //add part A title
    two.makeText("Global Land and Ocean Temperature Anomalies 1880 - 2021", 0, 10, {
        size: 20,
        alignment: "left",
        family: "monospace",
        weight: "Bold"
    })
    //draw axis for exercise part A
    drawAxes(two);
    //draw exercise part A
    drawTask4a(two);

    //add part B title
    two.makeText("Global Warming Stripes 1880 - 2021", 0, 500, {
        size: 20,
        alignment: "left",
        family: "monospace",
        weight: "Bold"
    })
    //draw exercise part B
    drawTask4b(two);
}

function drawTask4a(two) {

    // data for bar chart
    const barWidth = 4;
    const maxBarHeight = 550;

    let x = 30;
    let y = maxBarHeight / 2;

    const data = getData().a01Task4;

    //insert your code here

    // init x position = x + 2.5 
    const posInitX = x + 2.5
    // x position += barwidth + spacing between bars 1 pixel(=5)
    const spacingPixel = 1 + barWidth
    // y position is y ± height / 2
    // positiv red, negativ blue
    // linewidth = 0
    const linewidth = 0
    // positiv max height = 200
    const posMaxHeight = 200
    // negativ max height = 125
    const negMaxHeight = 125
    let cnt = 0
    for (const [key, value] of Object.entries(data['tempAnomalies'])) {
        let color = 'red';
        let barHeight = 0;
        if (value > 0) {
            barHeight = value / 1 * posMaxHeight
        } else {
            barHeight = value / 0.5 * negMaxHeight
            color = 'blue'
        }
        let bar = two.makeRectangle(posInitX + (spacingPixel * cnt), y - barHeight / 2, barWidth, Math.abs(barHeight))
        bar.linewidth = linewidth
        bar.fill = color

        cnt++
    }
}

function drawTask4b(two) {

    // data for stripes
    const barWidth = 4;
    const maxBarHeight = 550;

    let x = 30;
    let y = maxBarHeight + 240;

    const data = getData().a01Task4;

    //insert your code here
    const colorScale = getStripesColorScale(-0.5, 0, 1)
    // init x position = x + 2.5 
    const posInitX = x + 2.5
    // x position += barwidth
    const spacingPixel = barWidth
    // linewidth = 0
    const linewidth = 0
    let cnt = 0
    for (const [key, value] of Object.entries(data['tempAnomalies'])) {
        let color = colorScale(value).hex();
        let bar = two.makeRectangle(posInitX + (spacingPixel * cnt), y, barWidth, maxBarHeight)
        bar.linewidth = linewidth
        bar.fill = color

        cnt++
    }
}