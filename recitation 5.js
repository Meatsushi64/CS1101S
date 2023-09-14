
// QN 1
const LoL = list(list(1, 2), list(3, 4, 5, 6), null, list(7, 8, 9));

/*
function flatten(xs) {
    return is_null(xs)
           ? null 
           : append(head(xs),flatten(tail(xs)));
}
*/

function flatten(xs) {
    return accumulate((x, y) => append(x, y), null, xs);
}


// QN 2
const my_tree = list(1, list(2, list(3,null, 4), 5), list(6, 7));

function tree_sum(tree) {
    return is_null(tree)
           ? 0
           : (is_list(head(tree))  
                ? tree_sum(head(tree))
                : head(tree))
                    + tree_sum(tail(tree));
}

/* 
is_list is used cuz if there is a null in the middle of the list,
is_null or is_pair will not work
*/

tree_sum(my_tree);


// QN 3

function accumulate_tree(f, op, initial, tree) {
    return accumulate_tree(
        (x, ys) => !is_list(x)
                   ? op(f(x), ys) // if x is data
                   : op(accumulate_tree(f, op, initial, x),
                          ys), // if x is tree
        initial, tree);
}

/*
x will be a data or tree
ys is a result
f turns data into results -> can be number into number or number into string
op combines results -> eg sum (x,y)=>x+t

test out op using accumulate_tree function
properties of op:
- op(a,b ) === op(b, a)
- op(a, op(b, c)) === op(op(a, b), c)
- op(a, initial) === a


