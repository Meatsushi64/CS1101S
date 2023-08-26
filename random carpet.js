import {beside_frac,
stack_frac,
stackn,
heart,
random_color,
show } from "rune";


// you may need helper functions

function randomly_colored_carpet(n, m, rune) {
    return randomiser(n, m, rune);
}

function randomiser(n, m, rune) {
    return n === 1
           ? stackr(m, rune)
           : beside_frac(1 / n, stackr(m, rune),
                    randomiser(n - 1, m, rune));
}

function stackr(n, rune) {
    return n === 1
           ? random_color(rune)
           : stack_frac(1 / n, random_color(rune),
                    stackr(n - 1, rune));
}
// Test
show(randomly_colored_carpet(10, 10, heart));
// should produce a carpet as shown in the title picture of this quest.