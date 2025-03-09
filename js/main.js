

const PARTICLES_NUM = 10000;

const SENSOR_DIST = 10;
const SENSOR_ANGLE = Math.PI / 4;
const ABSOLUTE_VELOCITY = 2;

const DIAMETER = 2;
const DELTA = 1;

let molds = [];
let d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  d = pixelDensity();
  for (let i=0; i < PARTICLES_NUM; i++) {
    molds[i] = new Mold(windowWidth * Math.random(), windowHeight * Math.random(), ABSOLUTE_VELOCITY, SENSOR_DIST, SENSOR_ANGLE, 2 * Math.PI * Math.random());
  }
}

function draw() {
  background(0, 15);
  loadPixels();

  for (let i=0; i < PARTICLES_NUM; i++) {
    molds[i].update(DELTA);
    molds[i].display();
  }
}

class Mold {
  constructor(x, y, abs_vel, sensor_dist, sensor_angle, heading) {
    this.pos = createVector(x, y);
    this.abs_vel = abs_vel;
    this.vel = createVector(abs_vel * Math.cos(heading), abs_vel * Math.sin(heading));
    this.sensor_dist = sensor_dist;
    this.sensor_angle = sensor_angle;
    this.heading = heading;

    this.frontSensor = createVector(x + sensor_dist * Math.cos(heading), y + sensor_dist * Math.sin(heading));
    this.leftSensor = createVector(x + sensor_dist * Math.cos(heading - sensor_angle), y + sensor_dist * Math.sin(heading - sensor_angle));
    this.rightSensor = createVector(x + sensor_dist * Math.cos(heading + sensor_angle), y + sensor_dist * Math.sin(heading + sensor_angle));
  }

  update(t) {
    let f, l, r;
    f = this.getPixelColor(this.frontSensor);
    l = this.getPixelColor(this.leftSensor);
    r = this.getPixelColor(this.rightSensor);


    if (l > r && l > f) {
      this.heading -= this.sensor_angle;
    }
    if (r > l && r > f) {
      this.heading += this.sensor_angle;
    }
    if (l == r && l > f) { 
      if (Math.random()) {
        this.heading -= this.sensor_angle;
      } else {
        this.heading += this.sensor_angle;
      }
    }

    this.moveMold(t);
    this.updateSensors();
  }

  getPixelColor(pos) {
    let index = 4 * (d * windowWidth) * (d * floor(pos.y)) + 4 * (d * floor(pos.x));
    return pixels[index];
  }

  moveMold(t) {
    this.pos.x = (windowWidth + this.pos.x + this.abs_vel * Math.cos(this.heading) * t) % windowWidth;
    this.pos.y = (windowHeight + this.pos.y + this.abs_vel * Math.sin(this.heading) * t) % windowHeight;
  }

  updateSensors() {
    this.frontSensor.x = this.pos.x + this.sensor_dist * Math.cos(this.heading);
    this.frontSensor.y = this.pos.y + this.sensor_dist * Math.sin(this.heading);

    this.leftSensor.x = this.pos.x + this.sensor_dist * Math.cos(this.heading - this.sensor_angle);
    this.leftSensor.y = this.pos.y + this.sensor_dist * Math.sin(this.heading - this.sensor_angle);

    this.rightSensor.x = this.pos.x + this.sensor_dist * Math.cos(this.heading + this.sensor_angle);
    this.rightSensor.y = this.pos.y + this.sensor_dist * Math.sin(this.heading + this.sensor_angle);
  }

  display() {
    noStroke();
    fill(255);
    circle(this.pos.x, this.pos.y, DIAMETER);
    //fill(0, 255, 0);
    //circle(this.frontSensor.x, this.frontSensor.y, this.diameter / 2);
    //circle(this.leftSensor.x, this.leftSensor.y, this.diameter / 2);
    //circle(this.rightSensor.x, this.rightSensor.y, this.diameter / 2);
  }
}