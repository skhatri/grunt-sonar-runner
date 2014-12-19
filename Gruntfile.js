/*
 * grunt-sonar-runner
 * https://github.com/skhatri/grunt-sonar-runner
 *
 * Copyright (c) 2014 Suresh Khatri
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        sonarRunner: {
            analysis: {
                options: {
                    debug: true,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            url: 'jdbc:h2:tcp://localhost:9092/sonar',
                            username: 'sonar',
                            password: 'sonar'
                        },
                        projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                        projectName: 'Grunt Sonar Runner',
                        projectVersion: '0.10',
                        sources: ['test'].join(','),
                        language: 'js',
                        sourceEncoding: 'UTF-8'
                    }
                }
            },
            dryRun: {
                options: {
                    dryRun: true,
                    debug: true,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            url: 'jdbc:mysql://localhost:3306/sonar',
                            username: 'sonar',
                            password: 'sonar'
                        },
                        projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                        projectName: 'Grunt Sonar Runner',
                        projectVersion: '0.10',
                        sources: ['test'].join(','),
                        exclusions: '**/R.js'
                    }
                }
            }
        },

        // Unit tests.
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }

    });


    grunt.loadTasks('tasks');


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');


    grunt.registerTask('test', ['clean', 'sonarRunner:dryRun', 'mochaTest']);

    grunt.registerTask('default', ['jshint', 'test']);

};
