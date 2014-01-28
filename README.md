# grunt-sonar-runner

> Sonar Analysis Runner from grunt

## Getting Started
This plugin requires Grunt `~0.4.2`

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

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

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

To run
```
grunt sonarRunner:analysis
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
