const cluster = require('cluster');
const os = require('os');
const noOfUsers = function(){
    this.count = this.count || 5;
    this.count = 5 * this.count;
    return this.count;
}
if(cluster.isMaster){
    const core = os.cpus().length;

    console.log(`Forking for ${core} CPUs`);
    for(let i = 0; i < core; i++){
        cluster.fork();
    }

    const updateWorkers = () => {
        const users = noOfUsers();
        Object.values(cluster.workers).forEach(worker => {
            worker.send(users);
        });
    }
    updateWorkers();
    setInterval(updateWorkers, 5000);

    cluster.on('exit', (worker, code, signal) => {
        if(code !== 0 && !worker.exitedAfterDisconnect){
            console.log(`Worker ${worker.id} crashed. Starting a new worker.`);
            cluster.fork();
        }
    });

    cluster.on('error', (err)=>{
        console.log(`Error : ${err}`)
    });
    // when we get this signal means the worker has been killed
    //Zero downtime
    process.on('SIGUSR2', ()=>{
        const workers = Object.values(cluster.workers);

        const restartWorker = (wIdx) => {
            const worker = workers[wIdx];
            if(!worker){
                return;
            }
            worker.on('exit', ()=>{
                if(!worker.exitedAfterDisconnect) return;
                console.log(`Exited process : ${worker.process.pid}`);
                cluster.fork().on('listening', () => {
                    restartWorker(wIdx + 1);
                });
            });
            worker.disconnect();
        }
        restartWorker(0);
    })
}else{
    require('./server');
}