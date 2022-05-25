const mapPolyfill = function(callback){
    const res = [];
    for(let i = 0; i < this.length; i++){
        res.push(callback(this[i], i, this));
    }
    return res;
}

Array.prototype.myMap = mapPolyfill;

const arr = [20,30, 40,50, 60];
arr.myMap((x, i) => {
    if(i % 2 === 0){
        return x * x;
    }
    return x;
});