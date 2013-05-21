/*jshint nomen:false */
/*globals require, console, complete, __dirname, process */

'use strict';

var exec = require('child_process').exec,

commands = {
    minify: './node_modules/.bin/uglifyjs ./src/vagueTime.js --compress --mangle --output ./src/vagueTime.min.js',
    test: './node_modules/.bin/mocha --ui tdd --reporter spec --colors ./test/vagueTime.js',
    lint: './node_modules/.bin/jshint ./src/vagueTime.js --config config/jshint.json',
    prepare: 'npm install'
};

desc('Minify the source code for deployment.');
task('minify', function () {
    runCommand('minify', 'Minifying...');
}, {
    async: true
});

desc('Run the unit tests.');
task('test', function () {
    runCommand('test', 'Testing...');
}, {
    async: true
});

desc('Lint the source code.');
task('lint', function () {
    runCommand('lint', 'Linting...');
}, {
    async: true
});

desc('Install dependencies.');
task('prepare', function () {
    runCommand('prepare', 'Preparing the build environment...');
}, {
    async: true
});

function runCommand (command, message) {
    console.log(message);
    exec(commands[command], { cwd: __dirname }, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (typeof error === 'object' && error !== null) {
            console.log(error.message);
            process.exit(1);
        }
        complete();
    });
}

