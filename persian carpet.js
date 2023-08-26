import {from_url,
stack_frac,
stack,
beside_frac,
beside,
quarter_turn_right,
quarter_turn_left,
make_cross,
rcross,
stackn,
show, heart } from "rune";


function persian(rune, count) {
    return stack_frac(1 / count, 
                rows(rune, count), 
                stack_frac(1 - 1 / (count - 1), 
                    beside_frac(1 / count, 
                        stackn(count - 2, rune), 
                            beside_frac(1 - 1 / (count - 1),
                                make_cross(rune), 
                                stackn(count - 2, rune))), 
                    rows(rune, count)));
}

function row(rune, count) {
    return quarter_turn_right(stackn(count, quarter_turn_left(rune)));
}
//Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));
