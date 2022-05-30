// Code to make algo art consisting of vertically long, skinny rectangles and circles.

// Basic variables that other stuff needs
let loops = 1600, loopsRan = 0;
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
    }
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
    document.getElementById('theColorScheme').innerHTML =
        `<b>${jsonNFT["Basic Data"]["Color Scheme Name"]}</b> color scheme used.`;
    

    // Set canvas
    // size
    createCanvas(3840, 2160);
    // color
    background(jsonNFT["Basic Data"]["Canvas Color"]);

    // run code for rendering shapes
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
        let GenerateTime = new Date();
        let fileName = 'Bleached Rain ' + GenerateTime.getFullYear() +
            GenerateTime.getMonth().toString().padStart(2, '0') +
            GenerateTime.getDate().toString().padStart(2, '0') +
            '-' + GenerateTime.getHours().toString().padStart(2, '0') +
            GenerateTime.getMinutes().toString().padStart(2, '0') +
            GenerateTime.getSeconds().toString().padStart(2, '0');
        saveCanvas(fileName, 'png');

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
    
    // draw it
    redraw();
}
