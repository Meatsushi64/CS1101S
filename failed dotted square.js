import {make_point, draw_points_full_view_proportional} from "curve";

function unit_square(t) {
    function x_coord(x) {
        return x >=0 && x <= 0.25 //t between 0 and 0.25
                     ? 0
                     : (x > 0.25 && x <= 0.5) // t between .25 and .5'
                     ? 4 * x - 1
                     : (x > 0.5 && x <= 0.75) // t between .5 and .75'
                     ? 1
                     : 4 - 4 * x;
    }
    function y_coord(y) {
        return y >=0 && y <= 0.25
                     ? 4 * y
                     : (y > 0.25 && y <= 0.5)
                     ? 1
                     : (y > 0.5 && y <= 0.75)
                     ? 3 - 4 * y
                     : 0;
    }
    return make_point(x_coord(t), y_coord(t));
}

// Test
draw_points_full_view_proportional(80)(unit_square);