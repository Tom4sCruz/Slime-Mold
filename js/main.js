import { Mold } from "./mold.js"

const WIDTH = 400;
const HEIGHT = 400;

export const PARTICLE_RADIUS = 10;


function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(0);
}

let m = new Mold(WIDTH/2, HEIGHT/2, 50, -Math.PI/2, Math.PI/4);

function draw() {
    background(150);
    m.display();
    m.update();
}

window.setup = setup;
window.draw = draw;