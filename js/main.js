let fontRegular
let px = 0;
let py = 0;
let dx = 3.9;
let dy = 0;
let boxWidth = 0;
let boxHeight = 0;
let bString = "Happy\nBirthday\nKatie"

function preload() {
    fontRegular = loadFont('/fonts/Roboto-Medium.ttf');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 1.0);
    background(255);
    strokeWeight(2);
    stroke(0, 0, 0)
    textSize(36);
    textFont(fontRegular);
    boxWidth = textWidth("Birthday");
    boxHeight = 36*3;
    px = 20;
    py = 20;

}

function draw() {
    // if (mouseX > 1) {
    //     fill(frameCount % 1000 / 1000.0, 0.9, 0.9);
    //     text("Happy\nBirthday\nKatie", mouseX - boxWidth / 2.0, mouseY - boxHeight);
    //     px = mouseX;
    //     py = mouseY;
    // } else {
        fill(frameCount % 1000 / 1000.0, 0.9, 0.9);
        text("Happy\nBirthday\nKatie", px - boxWidth / 2.0, py - boxHeight);
        px += dx;
        py += dy;
        dy+= 0.2;
        if (py>windowHeight){
            dy = -dy*0.7;
            py=windowHeight;
        }
        if (px>windowWidth) {
            px = 10;
            py = 10;
            dx = Math.random() * 5.0 + 1.2;

        }
    //     }
    // }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
