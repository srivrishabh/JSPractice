process.on('message', (msg) => {
    console.log(`message from parent : ${msg}`);
});
process.send({executed: false});
for(let i = 0; i < 10; i++){    
    setTimeout(() => {
        process.send(`hello ${i}`);
    }, 2000);    
}

process.send({executed: true});
