'use strict';

var grunt = require('grunt'), should=require('should');

describe('Sonar Runner', function () {

    var sonarConfig;

    beforeEach(function () {
        var config = grunt.file.read('sonar-scanner-2.6/conf/sonar-runner.properties');
        var lines = config.split('\n');
        sonarConfig = Object.create(null);
        lines.forEach(function (line) {
            var lineParts = line.split('=');
            sonarConfig[lineParts[0]] = lineParts[1];
        });
    });

    it('set host url', function () {
        sonarConfig['sonar.host.url'].should.equal('http://localhost:9000');
    });

    it('default encoding is UTF-8', function () {
        sonarConfig['sonar.sourceEncoding'].should.be.equal('UTF-8');
    });
    
    it('default language is multi language (not set)', function () {
        should.not.exist(sonarConfig['sonar.language']);
    });
});
