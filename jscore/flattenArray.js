function flattenRec(arr, depth = 1){
    return depth > 0 ? 
    arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenRec(val, depth - 1) : val), []) 
    : arr.slice();
}

console.log("flatten recursive :: " + flattenRec([1,2,3,[4,5]], 2));

function flattenIterative(arr){
    const stack = [...arr];
    const res = [];
    while(stack.length > 0){
        const elem = stack.pop();
        if(Array.isArray(elem)){
            stack.push(...elem);
        }else{
            res.push(elem);
        }
    }
    return res.reverse();
}

function* flattenGenerator(array, depth){
    if(!depth){
        depth = 1;
    }

    for(const item of array){
        if(Array.isArray(item)){
            yield* flattenGenerator(item, depth - 1); 
        }else{
            yield item;
        }
    }
}