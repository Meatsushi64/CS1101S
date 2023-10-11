const mA = ev3_motorA();
const mB = ev3_motorB();
const mC = ev3_motorC();
const radius = 2.8;
const circumference = 2 * math_PI * radius;
const pause = ev3_pause;

display(ev3_connected(mA)?"connected A":"disconnected A");
display(ev3_connected(mB)?"connected B":"disconnected B");

function distance_to_tachos(distance) {
    return math_floor(distance / circumference * 360);
}

function move_forward(motor, speed, distance, time) {
    let speed_tacho = 0;
    const tacho = distance_to_tachos(distance);
    if (time !== 0) {
        speed_tacho = distance / time / radius / math_PI * 180;
        ev3_runToRelativePosition(motor, tacho, speed_tacho);
    } else {
        time = distance / speed;
        speed_tacho = speed / radius / math_PI * 180;
        ev3_runToRelativePosition(motor, tacho, speed_tacho);
    }
}

function move_backward(motor, speed, distance, time) {
    let speed_tacho = 0;
    const tacho = distance_to_tachos(distance);
    if (time !== 0) {
        speed_tacho = distance / time / radius / math_PI * 180;
        ev3_runToRelativePosition(motor, -1 * tacho, speed_tacho);
    } else {
        time = distance / speed;
        speed_tacho = speed / radius / math_PI * 180;
        ev3_runToRelativePosition(motor, -1 * tacho, speed_tacho);
    }
    
}

function vehicle_forward(speed, distance, time) {
    move_forward(mA, speed, distance, time);
    move_forward(mB, speed, distance, time);
}

function vehicle_backward(speed, distance, time){
    move_backward(mA, speed, distance, time); 
    move_backward(mB, speed, distance, time);
}

function turn_90_counterclockwise(){
    move_forward(mA, 0, circumference * 1.25, 2);
    pause(1000);
}

function turn_90_clockwise(){
    move_forward(mB, 0, circumference * 1.25, 2);
    pause(1000);
}

// Qn 1

// It is time to get started with the ultrasonic sensor
// Write a program that will display (in the Source Academy) 
// the distance as measured by the ultrasonic sensor once every second.
// Note: you may need to apply a scaling factor.

const ultrasonic_sensor = ev3_ultrasonicSensor();

function check_distance() {
    return ev3_ultrasonicSensorDistance(ultrasonic_sensor);
}

function question_1() {
    for (let i = 0; i < 10; i = i + 1) {
        display(check_distance());
        ev3_pause(500);
    }
}

// question_1();

// Qn 2
// Your next task is to use this distance information to 
// prevent your robot from crashing into obstacles!
// One such obstacle is the black box your robot came in!
// Write a program to achieve the following behaviour:
// Your robot should drive straight forward until it gets
// close the Lego box. Once the robot is approximately 10 cm
// from the Lego box it should stop and then reverse backwards for 30 cm.

function question_2(){
    while (display(check_distance()) > 100) {
        // keeping moving forward 
        vehicle_forward(10, 2, 0);
        pause(200);
    }
    vehicle_backward(15, 30, 0);
    pause(2000);
}

// question_2();

// Qn 3
// Your next task is to program your robot to drive around obstacles.
// For this task we will again using the Lego box as an obstacle.
// Your program must randomly choose which direction to go around 
// the box. That is, on approach, it should decide to either go around 
// the left of the box or the right of the box (a 50-50 chance).
// Write a program to navigate around the Lego box. Your robot may be 
// placed pointing at any side of the box.

const distance_from_obstacle = 150;

function move_forward_without_hitting(distance_from_obstacle) {
    while (display(check_distance()) > distance_from_obstacle) {
        // keeping moving forward 
        vehicle_forward(10, 2, 0);
        pause(200);
    }
}

function left_or_right() {
    return (math_random() <= 0.5);
}

function is_obstacle_still_there() {
    return check_distance() < distance_from_obstacle;
}

// left is true, right is false

function rotate_eyes(direction_to_go){
    if (direction_to_go) {
        ev3_runToRelativePosition(mC, 95, 90);
    } else {
        ev3_runToRelativePosition(mC, -95, 90);
    }
}


function move_left_or_right(direction_to_go){
    if (direction_to_go) {
        // move left
        turn_90_counterclockwise();
    } else {
        // move right
        turn_90_clockwise();
    } 
    rotate_eyes(direction_to_go);
}

function move_sideways_without_hitting(distance_from_obstacle){
    while (display(check_distance()) <= distance_from_obstacle) {
        // keeping moving forward
        vehicle_forward(10, 2, 0);
        pause(200);
    }
    vehicle_forward(10, 20, 0);
    pause(4000);
}

function question_3() {
    for (let j = 0; j < 10; j = j + 1) {
        let direction_to_go = left_or_right();
        move_forward_without_hitting(distance_from_obstacle);
        move_left_or_right(direction_to_go);
        pause(2000);
        move_sideways_without_hitting(distance_from_obstacle);
        move_left_or_right(!direction_to_go);
        pause(2000);
    }
}
question_3();
ev3_pause(1000); 