//Question 2
// function subsets(xs) {
//     if (is_null(xs)) {
//         return list(null);
//     } else {
//     // use head combo c
    
//     //map(item-> do something item, list)
//     // no head
//         const headless = subsets(tail(xs));
//     // use head
//         const heads = map(y => pair(head(xs), y), headless);
//         return append(heads, headless);
//     } 
// }

// draw_data(subsets(list(1, 2, 3)));
// 1 2
// 1 3
// 1 null 

// 1 2 3
// 1 & subset list (list(2...), list(3...)) . _
//                 1.      1.      -> if it contains head 
//   subsets 2,3 

//Question 3

function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        return accumulate(append,
                          null,
            map(x =>
                map(y => pair(x, y),
                    permutations(remove(x, xs))), xs));
    }
}

draw_data(permutations(list(1,2,3)));


