#!/usr/bin/env node

'use strict';

var cli, fs, path, srcPath, libPath, languagesPath, rwrr;

cli = require('commander');
fs = require('fs');
path = require('path');

srcPath = path.resolve(__dirname, 'src');
libPath = path.resolve(__dirname, 'lib');
languagesPath = path.resolve(srcPath, 'languages');

rwrr = parseInt('644', 8); // Octal literals not allowed in strict mode

build();

function build() {
    var languages;

    parseCommandLine();

    languages = getLanguages();

    checkLanguages(languages);

    writeLibrary(
        injectDefaultLanguage(
            injectLanguageModules(
                readMainModule(),
                readLanguageModules(languages)
            ),
            cli.default || languages[0]
        ),
        isUniversalBuild() ? '' : '-' + languages.join('-')
    );
}

function parseCommandLine () {
    cli.usage('[options]')
       .option('-l, --language <languages>', 'comma-separated list of 2-character language codes, or `all` for all defined (default)')
       .option('-d, --default <language>', '2-character language code of the default language, defaults to the first specified/detected')
       .parse(process.argv);
}

function getLanguages () {
    if (isUniversalBuild()) {
        return getAllLanguages();
    }

    return cli.language.split(',');
}

function isUniversalBuild () {
    return cli.language === 'all' || !cli.language;
}

function getAllLanguages () {
    console.log('Detecting languages...');

    return fs.readdirSync(languagesPath).map(function (filename) {
        var extensionIndex = filename.lastIndexOf('.js'), language;

        if (extensionIndex === -1) {
            language = filename;
        } else {
            language = filename.substr(0, extensionIndex);
        }

        console.log('Detected language: ' + language);

        return language;
    });
}

function checkLanguages (languages) {
    if (languages.length === 0) {
        throw new Error('I see no work.');
    }
}

function readMainModule () {
    return fs.readFileSync(path.resolve(srcPath, 'vagueTime.js'), 'utf8');
}

function readLanguageModules (languages) {
    var modules = new Array(languages.length);

    console.log('Reading language modules...');

    languages.forEach(function (language, index) {
        modules[index] = fs.readFileSync(path.resolve(languagesPath, language + '.js'), 'utf8');

        console.log('Read language module: ' + language);
    });

    return modules;
}

function injectLanguageModules (script, modules) {
    return inject(script, 'languages', modules.join(',\n'));
}

function inject (script, splitPoint, injection) {
    var split = script.split('/*#' + splitPoint + '*/');

    if (split.length !== 2) {
        throw new Error('Injection point error: ' + splitPoint);
    }

    return split[0] + injection + split[1];
}

function injectDefaultLanguage (script, defaultLanguage) {
    return inject(script, 'defaultLanguage', ' = \'' + defaultLanguage + '\'');
}

function writeLibrary (library, suffix) {
    var outputPath;

    console.log('Writing library...');

    outputPath = path.resolve(libPath, 'vagueTime' + suffix + '.js');

    fs.writeFileSync(
        outputPath,
        library,
        {
            encoding: 'utf8',
            mode: rwrr
        }
    );

    console.log('Written library to: ' + outputPath);
}

