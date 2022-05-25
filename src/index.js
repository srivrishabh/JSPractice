console.log("*********************************");
console.log("*********************************");
console.log("*********************************");
console.log("My first test package");

setImmediate(()=>{
    console.log("Set Immediate");
})

setTimeout(()=>{
    console.log('Inside SetTimeout');
}, 0);

process.nextTick(()=>{
    console.log('Inside process next tick');
})