let fireworks;
let booms = [];
let last_firwork_frame_time = 0

function preload() {
    fontRegular = loadFont('/fonts/Roboto-Medium.ttf');
    booms = [loadSound('sounds/booma.mp3'),
        loadSound('sounds/boomb.mp3'),
        loadSound('sounds/boomc.mp3')];
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 1.0);
    background(255);
    stroke(0, 0.0, 0.9);
    strokeWeight(0);
    fireworks = [];
    background(0, 0, 0, 1);
    mic = new p5.AudioIn();
    mic.start();
}


function newFirework(h, s, b, x, y, radius, decay_frames, num_lines, flame_size) {
    let particles = [];
    for (let i = 0; i < num_lines; i++) {
        theta = i / num_lines * 4 * Math.PI + (Math.random() - 0.5) * Math.PI;
        px = x + Math.random() * 10 - 5
        py = y + Math.random() * 10 - 5
        particles.push({
            x: x + Math.random() * 10 - 5,
            y: y + Math.random() * 10 - 5,
            dx: Math.cos(theta) * radius + Math.random() * 0.1,
            dy: Math.sin(theta) * radius + Math.random() * 0.1,
            last_x: px,
            last_y: py,
        })
    }
    return {
        h: h,
        s: s,
        b: b,
        t: 0,
        decay_frames: decay_frames,
        num_dots: 50,
        num_lines: num_lines,
        particles: particles,
        particleWidth: flame_size
    };
}

function randInt(minimum, maximum) {
    return Math.floor(Math.random() * maximum);

}

function addFirework(x, y) {
    let h = Math.random();
    fireworks.push(newFirework(h,
        0.7,
        1.0,
        x,
        y,
        Math.random() * 10 + 5,
        60,
        Math.random() * 10 + 30,
        Math.random() * 5.0));
    booms[randInt(0, booms.length)].play();
}

function renderFirework(f) {
    if (f.t < f.decay_frames) {
        let prog = f.t / f.decay_frames;
        strokeWeight(f.particleWidth);
        for (const p of f.particles) {
            stroke(f.h, f.s, f.b, 1.0 - prog);
            p.last_x = p.x;
            p.last_y = p.y;
            p.x += p.dx;
            p.y += p.dy;
            line(p.last_x, p.last_y, p.x, p.y);
            p.dy += 0.2;
            p.dx *= 0.99;
            p.dy *= 0.99;
        }
        f.t += 1;
        return false;
    } else {
        return true;
    }
}

function renderfireworks() {
    offset = 0;
    offsets_to_remove = [];
    for (const f of fireworks) {
        if (renderFirework(f)) {
            offsets_to_remove.push(offset);
        }
        offset++;
    }
    for (const index of offsets_to_remove) {
        fireworks.splice(index, 1);
    }

}

function draw() {
    renderfireworks();
    fill(0, 0, 0, 0.1);
    strokeWeight(0);
    rect(0, 0, windowWidth, windowHeight);
    let vol = mic.getLevel(0.01);
    if (vol>0.02 && frameCount-last_firwork_frame_time>5) {
        addFirework(Math.random() * windowWidth * 0.9 + windowWidth * 0.1,
                Math.random() * windowHeight * 0.5);
        last_firwork_frame_time = frameCount;
    }

}

function mouseClicked() {
    addFirework(Math.random() * windowWidth * 0.9 + windowWidth * 0.1,
        Math.random() * windowHeight * 0.5);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0, 0, 0, 1);
}
