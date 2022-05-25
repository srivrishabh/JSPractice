const { Writable, Readable } = require('stream');
//Echo stream
// const outStream = new Writable({
//     write(chunk, encoding, callback){
//         console.log(chunk.toString());
//         callback()
//     }
// });

// const inStream = new Readable();
// inStream.push("Hello Rishabh");
// inStream.push(null);

const inStream = new Readable({
    read(size){
        setTimeout(() => {
            if(this.code > 90){
                this.push(null);
                return;
            }
            this.push(String.fromCharCode(this.code++));
        }, 200);
    }
});
inStream.code = 65;
inStream.pipe(process.stdout);

//process.stdin.pipe(outStream);