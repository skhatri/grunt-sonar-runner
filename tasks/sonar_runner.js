/*
 * grunt-sonar-runner
 * https://github.com/skhatri/grunt-sonar-runner
 *
 * Copyright (c) 2014 Suresh Khatri
 * Licensed under the MIT license.
 */

'use strict';

var childProcess = require('child_process'), format = require('util').format, os = require('os'), path = require('path');

module.exports = function (grunt) {
    var SONAR_SCANNER_HOME = path.normalize(process.env.SONAR_SCANNER_HOME || __dirname+'/../sonar-scanner-4.5');
    var SONAR_SCANNER_OPTS = process.env.SONAR_SCANNER_OPTS || "";

    var JAR = SONAR_SCANNER_HOME + '/lib/sonar-scanner-cli-4.5.0.2216.jar';
    var SONAR_SCANNER_COMMAND = 'java ' + '-Dscanner.home="' + SONAR_SCANNER_HOME + '"' + SONAR_SCANNER_OPTS + ' -jar "' + JAR +'"';
    var LIST_CMD = (/^win/).test(os.platform()) ? 'dir "' + JAR + '"' : 'ls "' + JAR + '"';

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

        options.sonar.sourceEncoding = options.sonar.sourceEncoding || 'UTF-8';
        if (!options.projectHome) {
            options.sonar.host = options.sonar.host || {url: 'http://localhost:9000'};
        }
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
        
        if (options.projectHome) {
            var projectProperties = path.join(options.projectHome, ".sonar/conf/sonar-project.properties");
            SONAR_SCANNER_COMMAND += ' -Dproject.settings=' + projectProperties + ' -Dproject.home=' + options.projectHome;        
            grunt.file.write(projectProperties, props.join(options.separator)); 
        } else {
            grunt.file.write(SONAR_SCANNER_HOME + '/conf/sonar-scanner.properties', props.join(options.separator));
        }
        
        if (options.debug) {
            grunt.log.writeln('Sonar client configured ');
        }


        var execCmd = dryRun ? LIST_CMD : SONAR_SCANNER_COMMAND;

        grunt.log.writeln("sonar-scanner CMD: \n\n" + SONAR_SCANNER_COMMAND +"\n");

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
