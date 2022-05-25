function* fibonacci(){
    let current = 0;
    let next = 1;
    while(true){
        const result = yield current;
        [current, next] = [next, current + next];
        if(result){
            current = 0;
            next = 1;
        }
    }
}

function* fibonacciGen(length){
    let current = 0;
    let next = 1;
    while(true){
        length--;
        yield current;
        [current, next] = [next, current + next];
        if(length === 0){
            break;
        }
    }
    return;
}

const fibo = fibonacci();

console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next(true).value); //reset
console.log(fibo.next().value);
console.log(fibo.next().value);
console.log(fibo.next().value);