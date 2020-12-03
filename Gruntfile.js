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
                        login: 'admin',
                        password: 'admin',
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            url: 'jdbc:h2:tcp://localhost:9092/sonar',
                            username: 'sonar',
                            password: 'sonar'
                        },
                        projectKey: 'sonar:grunt-sonar-runner:3.0.0',
                        projectName: 'Grunt Sonar Runner',
                        projectVersion: '3.0.1',
                        sources: ['tasks'].join(','),
                        language: 'js',
                        sourceEncoding: 'UTF-8',
                        javascript: {
                            lcov: {
                                reportPaths: 'coverage/lcov.info'
                            }
                        }
                    }
                }
            },
            dryRun: {
                options: {
                    dryRun: true,
                    debug: true,
                    separator: '\n',
                    sonar: {
                        login: 'admin',
                        password: 'admin',
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            url: 'jdbc:mysql://localhost:3306/sonar',
                            username: 'sonar',
                            password: 'sonar'
                        },
                        projectKey: 'sonar:grunt-sonar-runner:3.0.1',
                        projectName: 'Grunt Sonar Runner',
                        projectVersion: '3.0.1',
                        sources: ['tasks'].join(','),
                        exclusions: '**/R.js'
                    }
                }
            }
        },
        
        run: {
          jest_test: {
            exec: 'npm run jest-test --silent'
          }
        }
    });


    grunt.loadTasks('tasks');


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('test', ['clean', 'sonarRunner:dryRun', 'run:jest_test']);

    grunt.registerTask('default', ['jshint', 'test']);

};
