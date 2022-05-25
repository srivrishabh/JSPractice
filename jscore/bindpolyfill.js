Function.prototype.myBind = function(obj, ...args){
    const func = this;
    return function(...argv){
        func.call(obj, ...[...args, ...argv]);
    }
}

const object = {
    name: 'rishabh',
    age: '33'
}

const showdetails = function(){
    console.log(`${this.name} is ${this.age} years old`);
}

const binded = showdetails.myBind(object);

binded();