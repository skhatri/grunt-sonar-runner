/*
 * grunt-sonar-runner
 * https://github.com/skhatri/grunt-sonar-runner
 *
 * Copyright (c) 2014 Suresh Khatri
 * Licensed under the MIT license.
 */

'use strict';

let childProcess = require('child_process'), format = require('util').format, os = require('os'),
    path = require('path');


module.exports = function (grunt) {
    const SONAR_SCANNER_HOME = path.normalize(process.env.SONAR_SCANNER_HOME || __dirname + '/../sonar-scanner-4.5');
    const SONAR_SCANNER_OPTS = process.env.SONAR_SCANNER_OPTS || "";

    let JAR = `${SONAR_SCANNER_HOME}/lib/sonar-scanner-cli-4.5.0.2216.jar`;
    let SONAR_SCANNER_COMMAND = `java -Dscanner.home="${SONAR_SCANNER_HOME}" ${SONAR_SCANNER_OPTS} -jar "${JAR}"`;
    let LIST_CMD = (/^win/).test(os.platform()) ? 'dir "' + JAR + '"' : 'ls "' + JAR + '"';

    let mergeOptions = function (prefix, effectiveOptions, obj) {
        for (let j in obj) {
            if (obj.hasOwnProperty(j)) {
                if (typeof obj[j] === 'object') {
                    mergeOptions(prefix + j + '.', effectiveOptions, obj[j]);
                } else {
                    effectiveOptions[prefix + j] = obj[j];
                }
            }
        }
    };
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('sonarRunner', 'Sonar Analysis Runner from grunt', function () {
        let options = this.options({
            debug: false,
            separator: os.EOL,
            dryRun: false
        });
        let data = this.data;
        let callback = (typeof data.callback === 'function') ? data.callback : () => {
        };
        let dryRun = options.dryRun;
        let done = this.async();
        options.sonar.sourceEncoding = options.sonar.sourceEncoding || 'UTF-8';
        if (!options.projectHome) {
            options.sonar.host = options.sonar.host || {url: 'http://localhost:9000'};
        }
        if (Array.isArray(options.sonar.exclusions)) {
            options.sonar.exclusions = options.sonar.exclusions.join(',');
        }

        let effectiveOptions = Object.create(null);
        mergeOptions('sonar.', effectiveOptions, options.sonar);

        let props = [];
        if (options.debug) {
            grunt.log.writeln('Effective Sonar Options');
            grunt.log.writeln('-----------------------');
        }
        for (let o in effectiveOptions) {
            let line = `${o}=${effectiveOptions[o]}`;
            props.push(line);
            if (options.debug) {
                grunt.log.writeln(line);
            }
        }

        if (options.projectHome) {
            let projectProperties = path.join(options.projectHome, ".sonar/conf/sonar-project.properties");
            SONAR_SCANNER_COMMAND += ' -Dproject.settings=' + projectProperties + ' -Dproject.home=' + options.projectHome;
            grunt.file.write(projectProperties, props.join(options.separator));
        } else {
            grunt.file.write(SONAR_SCANNER_HOME + '/conf/sonar-scanner.properties', props.join(options.separator));
        }

        if (options.debug) {
            grunt.log.writeln('Sonar client configured ');
        }


        let execCmd = dryRun ? LIST_CMD : SONAR_SCANNER_COMMAND;

        grunt.log.writeln("sonar-scanner CMD: \n\n" + SONAR_SCANNER_COMMAND + "\n");

        let exec = childProcess.exec(execCmd,
            options.maxBuffer ? {maxBuffer: options.maxBuffer} : {}, callback);

        exec.stdout.on('data', function (c) {
            grunt.log.write(c);
        });
        exec.stderr.on('data', function (c) {
            grunt.log.error(c);
        });

        exec.on('exit', function (code) {
            if (code !== 0) {
                grunt.log.error(format('Return code: %d.', code));
                return done(false);
            }
            grunt.verbose.ok(format('Return code: %d.', code));
            done(true);
        });
    });

};
