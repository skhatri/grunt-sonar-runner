/*
 * grunt-sonar-runner
 * https://github.com/skhatri/grunt-sonar-runner
 *
 * Copyright (c) 2014 Suresh Khatri
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process'), format = require('util').format, os = require('os');

module.exports = function (grunt) {
    var SONAR_RUNNER_HOME = process.env.SONAR_RUNNER_HOME || __dirname+'/../sonar-runner-2.4';

    var JAR = '/lib/sonar-runner-dist-2.4.jar';
    var SONAR_RUNNER_COMMAND = 'java -jar ' + SONAR_RUNNER_HOME + JAR+' -Drunner.home=' + SONAR_RUNNER_HOME;
    var LIST_CMD = (/^win/).test(os.platform()) ? 'dir '+SONAR_RUNNER_HOME + JAR : 'ls '+SONAR_RUNNER_HOME + JAR;

    var mergeOptions = function (prefix, effectiveOptions, obj) {
        for (var j in obj) {
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
        var options = this.options({
            debug: false,
            separator: os.EOL,
            dryRun: false
        });
        var data = this.data;
        var callback = (typeof data.callback === 'function') ? data.callback : function () {
        };
        var dryRun = options.dryRun;
        var done = this.async();

        // in case the language property isn't set sonar assumes this is a multi language project
        if (options.sonar.language) {
            options.sonar.language = options.sonar.language;
        }
        options.sonar.sourceEncoding = options.sonar.sourceEncoding || 'UTF-8';
        options.sonar.host = options.sonar.host || {url: 'http://localhost:9000'};
        if (Array.isArray(options.sonar.exclusions)) {
            options.sonar.exclusions = options.sonar.exclusions.join(',');
        }

        var effectiveOptions = Object.create(null);
        mergeOptions('sonar.', effectiveOptions, options.sonar);

        var props = [];
        if (options.debug) {
            grunt.log.writeln('Effective Sonar Options');
            grunt.log.writeln('-----------------------');
        }
        for (var o in effectiveOptions) {
            var line = o + '=' + effectiveOptions[o];
            props.push(line);
            if (options.debug) {
                grunt.log.writeln(line);
            }
        }


        grunt.file.write(SONAR_RUNNER_HOME + '/conf/sonar-runner.properties', props.join(options.separator));
        if (options.debug) {
            grunt.log.writeln('Sonar client configured ');
        }


        var execCmd = dryRun ? LIST_CMD : SONAR_RUNNER_COMMAND;

        grunt.log.writeln("sonar-runner exec: " + SONAR_RUNNER_COMMAND);

        var exec = childProcess.exec(execCmd,
            options.maxBuffer ? { maxBuffer: options.maxBuffer } : {},
            callback);

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
