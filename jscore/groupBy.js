
//using object
const groupBy = (arr, condition) => {
    if(arr.constructor == Array.constructor){
        return arr.reduce((acc, item) => {
            const key = typeof condition === 'function' ? condition(item) : item[condition];
            if(!acc.hasOwnProperty(key)){
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
    }
    throw new Error('please provide array.')
}

//using map => key and array of objects as value
const groupByMap = (arr, condition) => {
    if(arr.constructor == Array.constructor){
        arr.reduce((acc, item) => {
            const key = typeof condition === 'function' ? condition(item) : item[condition];
            const collection = map.get(key);
            if(!collection){
                map.set(key, [item]);
            }else{
                collection.push(item);
            }
            return map;
        }, new Map());
    }
}