function createIntervalPolyfill(){
    let intervalId = 0;
    let intervalMap = {};
    function setIntervalPolyfill(callback, delay = 0, ...args){
        let id = intervalId++;
        function repeat(){
            intervalMap[id] = setTimeout(() => {
                callback(...args);
                if(intervalMap[id]){
                    repeat();
                }
            }, delay);
        }
        repeat();
        return id;
    }
    function clearIntervalPolyfill(intervalId){
        clearTimeout(intervalId);
        delete intervalMap[intervalId];
    }
    return {
        setIntervalPolyfill,
        clearIntervalPolyfill
    }
}

module.exports = {
    setIntervalPolyfill,
    clearIntervalPolyfill
} = createIntervalPolyfill();