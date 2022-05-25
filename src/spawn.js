const {spawn} = require('child_process');

const child = spawn('cd');

child.on('error', function(err) {
    console.log(`${err}`);
});

child.stdout.on('data', (data) => {
    console.log(`Response from child :: ${data}`);
});