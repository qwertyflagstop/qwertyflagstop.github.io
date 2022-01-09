let fontRegular
let px = 0;
let py = 0;
let dx = 25.0;
let dy = 25.0;
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
    stroke(0, 0.0, 0.9)
    textSize(46);
    textFont(fontRegular);
    boxWidth = textWidth("Birthday");
    boxHeight = 56;
    px = windowWidth / 2.0;
    py = windowHeight / 2.0;

}

function draw() {
    stroke(0, 0.0, 0.9)
    fill(frameCount % 1000 / 1000.0, 0.7, 0.8);
    rect(px - boxWidth / 2 - 20, py - (boxHeight * 3.7 / 2), boxWidth + 40, boxHeight * 3.5)
    fill((frameCount + 500) % 1000 / 1000.0, 0.7, 0.8);
    text("Happy\nBirthday\nKatie", px - boxWidth / 2.0, py - boxHeight);
    px += dx;
    py += dy;
    if (py + boxHeight * 1.5 > windowHeight) {
        dy = -dy;
        py = windowHeight - boxHeight * 1.5
    }

    if (py - boxHeight * 1.5 < 0) {
        dy = -dy;
        py = 0 + boxHeight * 1.5;
    }

    if (px > windowWidth - boxWidth / 2.0 || px - boxWidth / 2 < 0) {
        dx = -dx;
    }
    let ms = 20.0;

    if (mouseIsPressed) {
        let jx = px - mouseX;
        let jy = py - mouseY;
        let dmag = Math.sqrt(jx * jx + jy * jy)

        if (dmag > 30) {
            dx -= jx * 0.025;
            dy -= jy * 0.025;
            stroke(1.0 - dmag / windowWidth * 0.5, 1.0, 1.0);
            line(px, py, mouseX, mouseY);
        }
    }
    let mag = Math.sqrt(dx * dx + dy * dy);
    if (mag > ms) {
        dx = dx / mag * ms * 0.99;
        dy = dy / mag * ms * 0.99;
    }
    //console.log('X: ' + dx +' Y:' + dy);
}


// function mouseMoved() {
//     let jx = px-mouseX;
//     let jy = py-mouseY;
//     dx -= jx*0.001;
//     dy -= jy*0.001;
//     console.log('clocked');
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
