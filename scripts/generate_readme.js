#!/usr/bin/env node

var fs = require('fs');
var path = require('path');


main();

function main() {
    var includePath = '_includes';
    var tplPath = 'scripts';
    var target = 'README.md';

    write(inject(readIncludes(includePath), read(tplPath + '/' + target)), target);
}

function readIncludes(p) {
    var ret = {};

    readDir(p).map(function(v) {
        return ret[v] = read(path.join(p, v));
    });

    return ret;
}

function inject(ctx, tpl) {
    return tpl.replace(/\{\{[ ]*[a-zA-Z_.]+[ ]*\}\}/gi, function(match) {
        // TODO: tidy up
        return ctx[match.split(' ')[1].trim()];
    });
}

function readDir(path) {
    return fs.readdirSync(path);
}

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(data, target) {
    fs.writeFileSync(target, data);
}
