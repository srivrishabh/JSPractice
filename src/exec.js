const {exec} = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
if(err)
throw err;

console.log(`${stdout}`);
});