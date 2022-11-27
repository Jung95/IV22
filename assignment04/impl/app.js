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
        // tree data
        this.data = data
        // canvas width
        this.width = width
        // canvas height
        this.height = height
        //right, top padding
        this.padding = padding
        // init max depth
        this.maxDepth = 0;
        // init total weight
        this.totalweight = 0;
        this.xPoint = this.padding
        this.parserData(this.data, this.maxDepth)
        //set height for a cell
        this.nodeHeight = parseInt((this.height - padding * 2 - (this.maxDepth + 1) * (this.padding * 2)) / (this.maxDepth + 1))
        console.log(this.nodeHeight)
        //set multiply for a cell width
        this.nodeWidth = parseInt((this.width - padding) / this.totalweight)
        // if multiply for a cell width is odd, make even with -1
        if (this.nodeWidth % 2 == 1) {
            this.nodeWidth = this.nodeWidth - 1
        }
        // sketch tree
        this.tree = this.drawTree(this.data)
    }

    get sketch() {
        //getter for tree sketch
        return this.tree
    }

    parserData(data, depth) {
        // set max Depth and total Width
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
        // if a node has children, return true
        let result = false
        if (node['children'] != undefined) {
            result = true
        }
        return result
    }

    drawTree(data) {
        // implemented with recursive function
        // return two.group with rects of children and rect of itself(data)
        let group = new Two.Group();
        if (!this.hasChildren(data)) {
            // set x Point
            this.xPoint = this.xPoint + data['weight'] * this.nodeWidth
            // make rect for leaf node
            let rect = new Two.Rectangle(this.xPoint - (data['weight'] * this.nodeWidth / 2), (this.nodeHeight + this.padding), data['weight'] * this.nodeWidth, this.nodeHeight);
            // set Color Orange
            rect.fill = 'rgb(250, 130, 5)';
            // set linewidth
            rect.linewidth = 1
            // add rect into group
            group.add(rect)
            // make text
            let text = new Two.Text(data['name'], this.xPoint - (data['weight'] * this.nodeWidth / 2), (this.nodeHeight + this.padding), {
                size: 11,
            })
            //rotate text
            text.rotation = 3.14 * 0.5
            // add text
            group.add(text)
        } else {
            data['children'].forEach(child => {
                let childGroup = this.drawTree(child)
                // move down child node rect.
                childGroup.position.y = this.nodeHeight
                // add child node rect. into parent group
                group.add(childGroup)
            });
            //get position and total width of children rect.
            let childrenRectBounding = group.getBoundingClientRect()
            // make rect for parant node 
            let rect = new Two.Rectangle((childrenRectBounding['right'] - childrenRectBounding['width'] / 2), (this.nodeHeight + this.padding), childrenRectBounding['width'] - 1, this.nodeHeight);
            // set Color blue
            rect.fill = 'rgb(173, 199, 234)';
            // set linewidth
            rect.linewidth = 1
            // add rect into group
            group.add(rect)
            // make text
            let text = new Two.Text(data['name'], (childrenRectBounding['right'] - childrenRectBounding['width'] / 2), (this.nodeHeight + this.padding), {
                size: 11,
            })
            //rotate text
            text.rotation = 3.14 * 0.5
            // add text
            group.add(text)
        }

        return group
    }
}