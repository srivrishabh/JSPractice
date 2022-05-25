class PubSub{
    static #map = new Map();

    static subscribe(topic, callback){
        const map = PubSub.#map;
        if(map.has(topic)){
            const callbacks = map.get(topic);
            callbacks.push(callback);
        }else{
            const callbacks = new Array();
            callbacks.push(callback)
            map.set(topic, callbacks);
        }
    }

    static publish(topic, constext, ...args){
        const map = PubSub.#map;
        if(map.has(topic)){
            const callbacks = map.get(topic);
            callbacks.forEach(element => {
                element.apply(constext, args);
            });
        }
    }

    static unsubscribe(topic, callback){
        const map = PubSub.#map;
        if(map.has(topic)){
            let callbacks = map.get(topic);
            callbacks = callbacks.filter(elem => elem !== callback);
            map.set(topic, callback);
        }
    }
}

function test(){
    const callback = (args) => {console.log("Inside :: ", args)};
    PubSub.subscribe("TEST", callback);
    setTimeout(() => {
        PubSub.publish("TEST", this, "successfully executed pubsub");
    }, 3000);
}

test();