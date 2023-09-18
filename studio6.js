// Qn 1
function my_map(f, lst){
    return accumulate( (y, x) => pair(f(y), x) , null, lst);
}

// Qn 2
function remove_duplicates(lst) {
    return accumulate(
             (x, y) => pair(x, remove_duplicates(filter(t => t !== x, y))),
             null,
             lst);
    // return is_null(lst)
    //       ? null
    //       : pair(
    //           head(lst),
    //           filter(x => x !== head(lst), remove_duplicates(tail(lst))));
}
// Qn 3
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));
        // Combinations that do not use the head coin
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        // Combinations that use the head coin.
        const combi_C = map(x => pair(head(coins), x), combi_B);
    return append(combi_A, combi_C);
    }
}
const dec = list(1,2,3);
const test = null;
// display_list(map(x => x, null)); returns null due to base case of map
display_list(append(test,dec));

//draw_data(makeup_amount(70,  list(10, 20, 30, 40)));