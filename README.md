# grunt-sonar-runner

> Sonar Analysis Runner from grunt

[![Build Status](https://travis-ci.org/skhatri/grunt-sonar-runner.png)](https://travis-ci.org/skhatri/grunt-sonar-runner) [![NPM version](https://badge.fury.io/js/grunt-sonar-runner.png)](http://npmjs.org/package/grunt-sonar-runner)
[![Dependency Status](https://david-dm.org/skhatri/grunt-sonar-runner.png)](https://david-dm.org/skhatri/grunt-sonar-runner)
## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sonar-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sonar-runner');
```

## The "sonarRunner" task

### Overview
In your project's Gruntfile, add a section named `sonarRunner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
                        url: 'jdbc:mysql://localhost:3306/sonar',
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
        }
    }
});
```

### Options

#### options.debug
Type: `Boolean`
Default value: `'false'`

A Boolean value to display debug information when preparing sonar analysis.

#### options.separator
Type: `String`
Default value: os.EOL

A string value representing a new line character to separate individual sonar properties


#### options.dryRun
Type: `Boolean`
Default value: 'false'

A flag to run it in dry mode. The configuration is checked but not execute

#### options.maxBuffer
Type: `Number`
Default value: `'null'`

maxBuffer specifies the largest amount of data allowed on stdout or stderr - if this value is exceeded then the child process is killed and an error returned from sonar-runner.  See: [child_process.exec()](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)


#### options.sonar.host.url
Type: `String`
Default value: 'http://localhost:9000'

Sonar Dashboard URL

#### options.sonar.jdbc.url
Type: `String`
Default value: ''

JDBC connection url



#### options.sonar.jdbc.username
Type: `String`
Default value: ''

JDBC connection username


#### options.sonar.jdbc.password
Type: `String`
Default value: ''

JDBC connection password


#### options.sonar.sources
Type: `String`
Default value: ''

comma separated list of directories to analyse. All js files in the provided directories will be included.


#### options.sonar.projectKey
Type: `String`
Default value: ''

project key usually of form group:artifactId:version



#### options.sonar.projectName
Type: `String`
Default value: ''

Project Summary



#### options.sonar.projectVersion
Type: `String`
Default value: ''

Current project build version



#### options.sonar.language
Type: `String`
Default value: null

Sets the project language. A list of language plugins can be found [here](http://docs.sonarqube.org/display/SONAR/Plugin+Library). If this property is undefined, a multi language project will be assumed and the sources searched for valid/supported languages.



#### options.sonar.javascript.lcov.reportPath
Type: `String`
Default value: -

Path to the LCOV Code Coverage File to be used in Sonar



#### options.sonar.exclusions
Type: `String` or `[String]`  
Default value: null

A list of directories and files that should be excluded from Sonar analysis. A list of wildcards that can be use can be found [here](http://docs.codehaus.org/display/SONAR/Narrowing+the+Focus#NarrowingtheFocus-Patterns).



### Usage Examples

The configuration code below shows all possible options that are currently supported by the plugin. Any additional sonar properties can be added right inside the sonar object literal.

```js
grunt.initConfig({
  sonarRunner: {
              analysis: {
                  options: {
                      debug: true,
                      separator: '\n',
                      dryRun: false,
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
                          language: 'js',
                          sourceEncoding: 'UTF-8'
                      }
                  }
              }
          }
});
```

To run
```
grunt sonarRunner:analysis
```

## Release History
