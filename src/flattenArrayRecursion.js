function flatten(arr, depth = 1, i = 0){
    if(i == arr.length){
        return [];
    }
    if(!Array.isArray(arr)){
        return [arr];
    }
    let acc = [];
    let first = arr[i];
    let restFlatten = flatten(arr, depth, i + 1);
    if(Array.isArray(first)){
        if(depth <= 0){
            acc.push(first)
        }else{
            for(let i = 0; i < first.length; i++){
                const temp = flatten(first[i], depth - 1, 0)
                acc.push(...temp);
            }
        }        
    }else{
        acc.push(first);
    }
    acc.push(...restFlatten);
    return acc;
}

module.exports = {
    flatten: flatten
}