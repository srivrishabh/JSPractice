const states = {
    PENDING: 0,
    REJECTED: 1,
    FULFILLED: 2
}

class CustomPromise{
    constructor(executor){
        this.state = states.PENDING;
        this.value = undefined;
        this.handlers = [];
        try{
            executor(this.resolve.bind(this), this.reject.bind(this));
        }catch(err){
            this.reject(err);
        }
    }
    resolve(value){
        this.updateResult(value, states.FULFILLED);
    }

    reject(error){        
        this.updateResult(error, states.REJECTED);
    }

    updateResult(value, state){
        setTimeout(()=>{
            if(this.state !== states.PENDING) return;
            this.value = value;
            this.state = state;
            this.executeHandlers();
        },0);
    }

    executeHandlers(){
        if(this.state === states.PENDING) return null;
        this.handlers.forEach(handler => {
            if(this.state === states.FULFILLED){
                return handler.onSuccess(this.value);
            }
            return handler.onFailure(this.value);
        });
        this.handlers = [];
    }

    addHandlers(handlers){
        this.handlers.push(handlers);
        this.executeHandlers();
    }

    then(onSuccess, onFailure){
        return new CustomPromise((res, rej) => {
            this.addHandlers({
                onSuccess:function(value){
                    if(!onSuccess){
                        return res(value);
                    }
                    try{
                        return res(onSuccess(value));
                    }catch(e){
                        return rej(e);
                    }
                },
                onFailure: function(value){
                    if(!onFailure){
                        return rej(value);
                    }
                    try {
                        return res(onFailure(value))
                    } catch(e) {
                        return rej(e);
                    }
                }
            });
        });
    }

    catch(onFailure){
        return this.then(null, onFailure);
    }

}

const testPromiseWithLateResolve = new CustomPromise((res, rej) => {
    setTimeout(() => {
      res('Promise 1 is resolved')
    }, 1000);
  });
  
  testPromiseWithLateResolve.then((val) => {
    console.log(val);
  });

  /**
   * Promise all
   */

  const customPromiseAll = promises => {
        if(!Array.isArray(promises)){
            promises = [promises];
        }
        const result = new Array(promises.length);
        const count = 0;
        return new Promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(item => {
                    count++;
                    result[index] = item;
                    if(count === promises.length){
                        resolve(result);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        });
  }