function reduce(arr, reducerFn, acc){
    if(!acc){
        acc = [];
    }
    for(let i = 0; i < arr.length; i++){
        acc = reducerFn(acc, arr[i], i, arr);
    }
    return acc;
}