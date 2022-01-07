let fontRegular

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
}

function draw() {
    if (mouseX > 10) {
        fill(frameCount % 1000 / 1000.0, 0.9, 0.9);
        text("Happy\nBirthday\nKatie", mouseX-50, mouseY-100);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
