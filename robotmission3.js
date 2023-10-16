const mA = ev3_motorA();
const mB = ev3_motorB();
const mC = ev3_motorC();
const colourSensor = ev3_colorSensor();
const touchSensor = ev3_touchSensor1();
const ultrasonic_sensor = ev3_ultrasonicSensor();

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

function turn(angle){
    if (angle < 0) {
        move_forward(mA, 0, radius * -1 * angle / 180 * math_PI, 0.5);
        move_backward(mB, 0, radius * -1 * angle / 180 * math_PI, 0.5);
    } else {
        move_forward(mB, 0, radius * angle / 180 * math_PI, 0.5);
        move_backward(mA, 0, radius * angle / 180 * math_PI, 0.5);
    }
    pause(800);
}

/*
Write a program that will print out the reflected light 
intensity as measured from the color sensor once every second
*/

function light_intensity() {
    return ev3_reflectedLightIntensity(colourSensor);
}

function sample_sensor(sensor_callback, interval) {
    while(!ev3_touchSensorPressed(touchSensor)){
        display(sensor_callback());
        pause(interval * 1000);
    }
}

/*
Write a program which makes your robot track the straight 
black line section on the first printed A4 page by using 
the color sensor.

Important: the robot should make use of the color sensor 
to detect the line and make course corrections accordingly.

*/

function detect_black(){
    sample_sensor(light_intensity, 1);
}

// detect_black();

function line_forward() {
    let lightlvl = 0;
    while ((lightlvl < 7) &&(!ev3_touchSensorPressed(touchSensor))) {
        lightlvl = light_intensity();
        vehicle_forward(0, 1, 0.5);
        pause(600);
    }
    pause(500);
}

function turn_check(angle) {
    pause(500);
    vehicle_backward(0, 2, 0.5);
    pause(600);
    display("moved back for sensing");
    turn(angle);
    pause(500);
    let right_lvl = display(light_intensity());
    turn(-2 * angle);
    pause(500);
    let left_lvl = display(light_intensity());
    if (left_lvl <= right_lvl) {
        if (right_lvl - left_lvl < 2) {
            turn(-20);
            display("left darker than right and level similar");
            line_forward();
        } else {
            display("left darker than right and level different");
            line_forward();
        }
    } else {
        turn(2 * angle);
        if (left_lvl - right_lvl < 2) {
            turn(20);
            display("right darker than left and level similar");
            line_forward();
        } else {
            display("right darker than left and level different");
            line_forward();
        }
    }
}

function follow_line() {
    line_forward();
    while (!ev3_touchSensorPressed(touchSensor)) {
        turn_check(30);
    }
}


//follow_line();


function topsy_turvy(direction, angle) {
    let light_level = 0;
    while (light_level < 7) {
        direction === 'right'
        ? move_forward(mB, 0, radius * angle / 180 * math_PI, 0.5)
        : move_forward(mA, 0, radius * angle / 180 * math_PI, 0.5);
    }
    topsy_turvy('left', 30);
}
pause(300);
//topsy_turvy('right', 30);

/* function one_wheel_forward(angle){
    if (angle < 0) {
        move_forward(mA, 0, radius * -1 * angle / 180 * math_PI, 2);
    } else {
        move_forward(mB, 0, radius * angle / 180 * math_PI, 2););
    }
    pause(3000);
}


/* function check_left_right() {
    while (!ev3_touchSensorPressed(touchSensor)) {
    //turn left, if white turn right until hit black
        one_wheel_forward(-30);
        while (white) {
            turn right until hit black
        }
        one_wheel_forward(30);
        while (white){
            turn left until hit black
        }
    }
} */

/*
Write a program which makes your robot correctly navigate 
each of the three example maze lines in the printed A4 sheets.

Your robot should be able to navigate from one end of this 
line to the other. Though a long shot, your robot should also 
be able to make the journey both ways.

On the off chance that your robot reboots due to excessive 
radiation exposure, it is necessary that your robot should 
be able to navigate each puzzle starting from any point on the line.
*/




