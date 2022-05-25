const myAsyncIterator = {
    async* [Symbol.asyncIterator](){
        yield 1;
        yield 2;
        yield 3;
    }
};

class MyArray{
    static [Symbol.hasInstance](instance){
        return Array.isArray(instance);
    }
}

(async () => {
    for await (const x of myAsyncIterator){
        console.log(x);
    }
})();
