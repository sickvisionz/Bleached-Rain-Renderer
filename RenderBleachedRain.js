// Code to make algo art consisting of vertically long, skinny rectangles and circles.

// Basic variables that other stuff needs
let loops = 1600, loopsRan = 0, counter = 0, maxCount = 0, drawSpeed = 10;
let s;
let jsonNFT;

class myShape {
    // class defining everything needed to make a shape
    constructor(random, rolandmod, borderweight, bordercolor,
        shape, shapecolor, shapex, shapey, shapesize1, shapesize2) {
        this.Random = random;
        this.RolandMod = rolandmod;
        this.BorderWeight = borderweight;
        this.BorderColor = bordercolor;
        this.Shape = shape;
        this.ShapeColor = shapecolor;
        this.ShapeX = shapex;
        this.ShapeY = shapey;
        this.ShapeSize1 = shapesize1;
        this.ShapeSize2 = shapesize2;
        this.ShapeType = '';
        this.Shadow;
    }
}

function defineShadows(useShadows) {
    if (useShadows == true) {
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 25;
    } else {
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 0;
    }
    drawingContext.shadowColor = 'black';
}

function setup() {
    // double check for empty json box
    if (document.getElementById("theJSON").value == "") {
        alert("Paste JSON into text box.");
        noLoop();
        return;
    }
    loop();
    
    jsonNFT = JSON.parse(document.getElementById('theJSON').value);

    // Update the DOM
    // titles
    document.getElementById('theTitle').innerHTML = 'Algo Art 01 - Bleached Rain Render';
    document.getElementById('theName').innerHTML = jsonNFT["Basic Data"]["Title"];
    document.getElementById('theColorScheme').innerHTML =
        `<b>${jsonNFT["Basic Data"]["Color Scheme Name"]}</b> color scheme used.`;
    

    // Set canvas
    // size
    createCanvas(jsonNFT["Basic Data"]["Width"], jsonNFT["Basic Data"]["Height"]);
    // color
    background(jsonNFT["Basic Data"]["Canvas Color"]);

    // run code for picking shapes
    MainThing();
}

function draw() {
    if (s == undefined) {
        // this should only happen on the initial page load
        console.clear();
        return;
    } else {
        // create shape
        smooth();
        strokeWeight(s.BorderWeight);
        stroke(s.BorderColor);
        fill(s.ShapeColor);
        defineShadows(s.Shadow);
        if (s.ShapeType == 'Circle') {
            // Circle
            circle(s.ShapeX, s.ShapeY, s.ShapeSize1);
        } else {
            // Rectangle
            rect(s.ShapeX, s.ShapeY, s.ShapeSize1, s.ShapeSize2);
        }
        
        loopsRan++;
        MainThing();
    }
}

function MainThing() {
    // Check if we're done making shapes
    if (loopsRan > loops) {
        // notify user of completion
        alert('Art rendered.  Enjoy!');
        noLoop();
        // save art as PNG
        saveCanvas(jsonNFT["Basic Data"]["Title"], 'png');
        return;
    }

    // Code gets here if we aren't done making shpaes
    // assign all data for current shape
    s = new myShape();
    s.BorderWeight = jsonNFT["Shape Data"]["Shape " + loopsRan]["Border Details"].Weight;
    s.BorderColor = jsonNFT["Shape Data"]["Shape " + loopsRan]["Border Details"].Color;
    s.ShapeType = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Type;
    s.ShapeColor = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Color;
    s.ShapeX = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].X;
    s.ShapeY = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Y;
    s.ShapeSize1 = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Size1;
    s.ShapeSize2 = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Size2;
    // get stuff that was added later and isn't in earlier JSONs
    try {
        s.Shadow = jsonNFT["Shape Data"]["Shape " + loopsRan]["Shape Details"].Shadow == "true";

    } catch {
        s.Shadow = false;
    }

    
    // draw it
    redraw();
}
