const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const path = require('path');
const {Transform} = require('stream');
const file = path.join(__dirname, process.argv[2]);

const progress = new Transform({
    transform(chunk, encoding, callback){
        process.stdout.write('.');
        callback(null, chunk);
    }
});

fs.createReadStream(file)
.pipe(crypto.createDecipher('aes128', 'rishabh'))
.pipe(zlib.createGunzip())
.pipe(progress)
.pipe(fs.createWriteStream(file.slice(0, -3)))
.on('finish', () => console.log('done'));