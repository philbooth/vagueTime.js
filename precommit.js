#!/usr/bin/env node

(function () {
    'use strict';

    var currentDirectory, errorFlag = false,

    exec = require('child_process').exec;

    saveCurrentDirectory();
    moveToProjectDirectory();
    verifyModifications();

    function saveCurrentDirectory () {
        currentDirectory = process.cwd();
    }

    function moveToProjectDirectory () {
        process.chdir(__dirname);
    }

    function verifyModifications () {
        exec(
            'git status --porcelain | grep -E "^(M|A)" | sed -E "s/^(M|A). //"',
            function (error, stdout) {
                if (error) {
                    console.log('WARNING: Failed to get modified file list, this commit will not be verified.');
                    return;
                }

                verifyFiles(stdout.split('\n'));
            }
        );
    }

    function verifyFiles (files) {
        verifyFile(files, 0, done);
    }

    function verifyFile (files, index, callback) {
        var file;

        if (index < files.length) {
            file = files[index];

            if (fileIsJavascript(file)) {
                verifyJavascriptFile(file, function () {
                    verifyFile(files, index + 1, callback);
                });
            } else {
                verifyFile(files, index + 1, callback);
            }
        } else {
            callback();
        }
    }

    function fileIsJavascript (file) {
        var extension = getFileExtension (file);

        if (extension === 'js' || extension === 'json') {
            return true;
        }

        return false;
    }

    function getFileExtension (file) {
        return file.substr(file.lastIndexOf('.') + 1);
    }

    function verifyJavascriptFile (file, callback) {
        lintJavascriptFile(file, function () {
            testJavascriptFile(file, callback);
        });
    }

    function lintJavascriptFile (file, callback) {
        jakeJavascriptFile('lint', file, callback);
    }

    function testJavascriptFile (file, callback) {
        jakeJavascriptFile('test', file, callback);
    }

    function jakeJavascriptFile (command, file, callback) {
        exec([
            'jake ',
            command,
        ].join(''), function (error, stdout) {
            if (error) {
                console.log(stdout);
                errorFlag = true;
            } else {
                console.log([
                    file,
                    ': No ',
                    command,
                    ' errors.'
                ].join(''));
            }
            callback();
        });
    }

    function done () {
        restoreCurrentDirectory();

        if (errorFlag === true) {
            console.log('Commit aborted. Please fix your code.');
            process.exit(1);
        }

        console.log('Committing...');
    }

    function restoreCurrentDirectory () {
        process.chdir(currentDirectory);
    }
}());

