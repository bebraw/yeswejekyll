var fs = require('fs');

function read(input) {
    return fs.readFileSync(input, 'utf-8');
}
exports.read = read;

function write(target, data) {
    fs.writeFileSync(target, data);
}
exports.write = write;
