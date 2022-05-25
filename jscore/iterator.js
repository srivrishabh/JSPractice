const makeIterator = array => {
    let next = 0;
    return {
        next: () => {
            return next >= array.length ? {done: true, value: null} :
            {done: false, value: array[next++]};
        }
    }
}

class SimpleIterator{
    constructor(array){
        this.array = array;
    }

    [Symbol.iterator](){
        let nextIndex = 0;
        return{
            next: () => {
                return nextIndex >= this.array.length ? {done: true, value: null} :
                {done: false, value: this.array[nextIndex++]};    
            }
        }
    }
}

const obj = new SimpleIterator([1,2,2,4,6,3,4]);
console.log(...obj);