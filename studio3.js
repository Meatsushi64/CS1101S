import {heart, blank, stack, beside, show, square, ribbon, circle,
stack_frac, beside_frac
} from "rune";
//qn 1
function moony_1(bottom_right) {
    return beside(stack(circle, square), stack(blank, bottom_right));
}

show(moony_1(circle));

//qn 2
function moony_2(n) {
    return n === 1
           ? circle
           : beside(stack(circle, square), stack(blank, moony_2(n-1))); 
}

show(moony_2(5));

//qn 3
function moony(n) {
    return n === 1
           ? circle
           : beside_frac(1 / n,
                    stack_frac(1 / n, circle, square),
                    stack_frac(1 / n, blank, moony(n-1)));  
}

show(moony(3));

//qn 4
/*
Solutions is recursive
time complexity is 0(n)
space complexity is O(n)
assumption is that primitive functions are constant

