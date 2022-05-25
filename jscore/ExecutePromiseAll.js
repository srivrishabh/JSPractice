const ExecutePromises = (promises) => {
    let results = [];
    let errors = [];

    const resolvingPromises = promises.map(promise => new Promise((resolve) => {
        const resArray = new Array(2);
        promise.then(result => {
            resArray[0] = result;
        }).catch(err => {
            resArray[1] = err;
        }).finally(() => {
            resolve(resArray);
        })
    }));

    return Promise.all(resolvingPromises).then((items) => {
        items.forEach(item => {
            if(item[1]){
                errors.push(item[1]);
            }else{
                results.push(item[0]);
            }
        });
        return{
            results,
            errors
        };
    });
}