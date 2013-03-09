#!/usr/bin/env node

require('js-yaml');

var marked = require('marked');
var _s = require('underscore.string');

var utils = require('./utils');

main();

function main() {
    var targets = {
        'all': generateAll,
        'bower': generator('component.json'),
        'readme': generator('README.md'),
        'index': generateIndex,
        'package': generator('package.json')
    };
    var target = process.argv[2];

    if(!target) {
        console.error('Missing target!');
    }
    else if(!(target in targets)) {
        console.error('Invalid target! Try one of these:', Object.keys(targets).join(', '));
    }
    else {
        targets[target]();
    }

    function generateAll() {
        for(var target in targets) {
            if(target !== 'all') targets[target]();
        }
    }

    function generator(name) {
        return generate.bind(null, '_meta/_' + name, name, transform);
    }

    function transform(tpl, ctx) {
        return tpl.replace(/\{\{ [a-z_ ]+ \}\}/gi, function(match) {
            return ctx[_s.rtrim(_s.ltrim(match, '{'), '}').trim()];
        });
    }
}

function generateIndex() {
    var prefix = '---\nlayout: project\n---\n';

    utils.write('index.html', prefix + transformIndex(utils.read('README.md')));

    function transformIndex(data) {
        var tokens = marked.lexer(data).map(function(t) {
            if(t.type == 'code') {
                t.type = 'html';
                t.text = '{% highlight ' + t.lang + ' %}\n' +
                    t.text +
                    '\n{% endhighlight %}\n';
            }

            return t;
        });
        tokens.links = [];

        return marked.parser(tokens);
    }
}

function generate(source, target, transformer) {
    utils.write(target, transformer(utils.read(source), require('../_config.yml')));
}
