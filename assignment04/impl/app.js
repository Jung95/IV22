"use strict";


function getTutorialInfo() {
    return {
        exerciseNum: 4, //make sure that this is the right number of the current exercise
        groupNames: "Jongho Jung, Nandita Jha", //provide the names of each team member
        isAnimated: false //if set to true, shapes will be rendered roughly 60 times per second
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
    const data = getData().dataEx4
    // class StackedTree(data, drawing area width, height, padding)
    const stackedTree = new StackedTree(data, 900, 600, 5)
    two.add(stackedTree.sketch)
}

class StackedTree {
    constructor(data, width, height, padding) {
        this.data = data
        this.width = width
        this.height = height
        this.padding = padding
        this.maxDepth = 0;
        this.totalweight = 0;
        this.xPoint = this.padding
        this.parserData(this.data, this.maxDepth)
        this.tree = this.drawTree(this.data)
        //this.totalWeight = this.parsedData['weight']
        //this.totalDepth = this.parsedData['depth']
    }

    get sketch() {
        return this.tree
    }

    parserData(data, depth) {
        if (depth > this.maxDepth) {
            this.maxDepth = depth
        }
        let weight = 0
        if (this.hasChildren(data)) {
            data['children'].forEach(child => {
                this.totalweight = this.parserData(child, depth + 1) + this.totalweight
            });
        } else {
            weight = data['weight']
        }
        return weight
    }

    hasChildren(node) {
        let result = false
        if (node['children'] != undefined) {
            result = true
        }
        return result
    }

    drawTree(data) {
        let group = new Two.Group();
        if (!this.hasChildren(data)) {
            this.xPoint = this.xPoint + data['weight'] * 18
            let rect = new Two.Rectangle(this.xPoint - data['weight'] * 18 / 2, 52, data['weight'] * 18, 100);
            rect.fill = 'rgb(250, 130, 5)';
            rect.linewidth = 1
            group.add(rect)
        } else {
            data['children'].forEach(child => {
                let childGroup = this.drawTree(child)
                childGroup.position.y = 100
                group.add(childGroup)
            });
            let childrenRectBounding = group.getBoundingClientRect()
            let rect = new Two.Rectangle((childrenRectBounding['right'] - childrenRectBounding['width'] / 2), 52, childrenRectBounding['width'] - 1, 100);
            rect.fill = 'rgb(173, 199, 234)';
            rect.linewidth = 1
            group.add(rect)

        }
        return group
    }
}

let widthPoint = 5
/*
function drawTree(data) {
    let group = new Two.Group();
    if (!hasChildren(data)) {
        widthPoint = widthPoint + data['weight'] * 18
        let rect = new Two.Rectangle(widthPoint - data['weight'] * 18 / 2, 52, data['weight'] * 18, 100);
        rect.fill = 'rgb(250, 130, 5)';
        rect.linewidth = 1
        group.add(rect)
    } else {
        data['children'].forEach(child => {
            let childGroup = drawTree(child)
            childGroup.position.y = 100
            group.add(childGroup)
        });
        let childrenRectBounding = group.getBoundingClientRect()
        let rect = new Two.Rectangle((childrenRectBounding['right'] - childrenRectBounding['width'] / 2), 52, childrenRectBounding['width'] - 1, 100);
        rect.fill = 'rgb(173, 199, 234)';
        rect.linewidth = 1
        group.add(rect)

    }
    return group
}
*/