import {blank,
rcross,
triangle,
circle,
corner,
nova,
heart,
beside,
stack,
overlay,
overlay_frac,
scale,
scale_independent,
translate,
show,
hollusion,
anaglyph } from "rune";


function cone(n, rune){
    return iter(n, rune, 0);
}

function iter(n, rune, count){
    return n === count 
           ? rune
           : overlay_frac(1 / (n - count), scale((count + 1) / n, rune), 
                iter(n, rune, count + 1));
}

/*

show(scale(1, circle));

show(overlay_frac(1/2, scale(1/2, circle), scale(2/2, circle)));

show(overlay_frac(1/3, scale(1/3, circle), 
            overlay_frac(1/2, scale(2/3, circle), scale(3/3, circle))));
            
show(overlay_frac(1/4, scale(1/4, circle),
            overlay_frac(1/3, scale(2/4, circle), 
                    overlay_frac(1/2, scale(3/4, circle), 
                            overlay_frac(1/1, scale(4/4, circle), circle)))));
                            
*/



//Tests
show(cone(4, circle));
//hollusion(cone(15, circle));
