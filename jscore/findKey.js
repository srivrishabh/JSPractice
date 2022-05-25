function findInJson(object, key){
    //base condition
    if(object === null || object === undefined){
        return null;
    }
    if(object[key]){
        return object[key];
    }
    let value = null;
    for(let k in object){
        if(typeof object[k] === 'object'){
            let val = findInJson(object[k], key);
            if(val){
                value = val;
            }
        }
    }
    return value;
}

function findValuesInJson(object, key, values = []){
    //base condition
    if(object === null || object === undefined){
        return values;
    }
    for(let k in object){
        if(k === key){
            values.push(object[k]);
        }
        if(typeof object[k] === 'object'){
            values = findValuesInJson(object[k], key, values);
        } 
    }
    return values;
}