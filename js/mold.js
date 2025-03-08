import { PARTICLE_RADIUS } from "./main.js"

export class Mold {
    constructor (x, y, sensor_distance, start_angle, turn_angle) {
        this.x = x;
        this.y = y;

        this.vx = Math.cos(start_angle);
        this.vy = Math.sin(start_angle);
        
        this.sensor_distance = sensor_distance;
        this.start_angle = start_angle;
        this.turn_angle = turn_angle;

        this.fSensor = [ x + sensor_distance * Math.cos(start_angle), y + sensor_distance * Math.sin(start_angle) ];
        this.lSensor = [ x + sensor_distance * Math.cos(start_angle - turn_angle), y + sensor_distance * Math.sin(start_angle - turn_angle) ];
        this.rSensor = [ x + sensor_distance * Math.cos(start_angle + turn_angle), y + sensor_distance * Math.sin(start_angle + turn_angle) ];
    }

    update() {
        
    }

    display() {

        stroke(0);
        line(this.x , this.y, this.fSensor[0], this.fSensor[1]);
        line(this.x, this.y, this.lSensor[0], this.lSensor[1]);
        line(this.x, this.y, this.rSensor[0], this.rSensor[1]);

        noStroke();
        fill(255);
        circle(this.x, this.y, 2*PARTICLE_RADIUS);  // Particle
        fill(255, 0, 0);
        circle(this.fSensor[0], this.fSensor[1], 2*PARTICLE_RADIUS);    // Front Sensor
        fill(255, 0, 255);
        circle(this.lSensor[0], this.lSensor[1], 2*PARTICLE_RADIUS);    // Left Sensor
        circle(this.rSensor[0], this.rSensor[1], 2*PARTICLE_RADIUS);    // Rigth Sensor

        
    }
}