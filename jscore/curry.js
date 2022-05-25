// const curry1 = function(func){
//     return function(a){
//         return function(b){
//             return func(a, b);
//         }
//     }
// }



const curry = function(func){
    return function curried(...args){
        if(args.length >= func.length){
            return func.apply(this, args);
        }else{
            return curried.bind(this, ...args);
        }
    }
}
const add = (a, b) => {
    return a + b;
}
const curriedSum = curry(add);



console.log(curriedSum(2,4));