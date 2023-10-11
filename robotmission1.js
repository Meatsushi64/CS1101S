// Qn 1 
//ev3_speak("Hello World!");

// Qn 2
const mA = ev3_motorA();
const mB = ev3_motorB();
const radius = 2.8;
const circumference = 2 * math_PI * radius;
const pause = () => ev3_pause(200);

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
    pause();
}

function vehicle_backward(speed, distance, time){
    move_backward(mA, speed, distance, time); 
    move_backward(mB, speed, distance, time);
    pause();
}

//vehicle_forward(7, 10, 0);
//ev3_pause(1000);

// Qn 3

function turn_90_counterclockwise(){
    move_forward(mA, 0, circumference * 1.25, 2);
    pause();
}

function turn_90_clockwise(){
    move_forward(mB, 0, circumference * 1.25, 2);
    pause();
}

turn_90_counterclockwise();
ev3_pause(1000);

// Qn 4

function qn_4(){
    vehicle_forward(10, 10, 0); //10 cm
    turn_90_counterclockwise(); // turn counter clockwise
    vehicle_forward(10, 5, 0); // 5cm
    turn_90_clockwise(); // turn clockwise
    vehicle_forward(10, 15, 0); // 15cm
}

qn_4();
pause();