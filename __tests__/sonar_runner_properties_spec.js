'use strict';

let grunt = require('grunt'), should = require('should');

describe('Sonar Runner Properties', function () {

    let sonarConfig;

    beforeEach(() => {
        let config = grunt.file.read('sonar-scanner-4.5/conf/sonar-scanner.properties');
        let lines = config.split('\n');
        sonarConfig = Object.create(null);
        lines.forEach(function (line) {
            let lineParts = line.split('=');
            sonarConfig[lineParts[0]] = lineParts[1];
        });
    });

    it('set host url', () => {
        sonarConfig['sonar.host.url'].should.equal('http://localhost:9000');
    });

    it('default encoding is UTF-8', () => {
        sonarConfig['sonar.sourceEncoding'].should.be.equal('UTF-8');
    });

    it('default language is multi language (not set)', () => {
        should.not.exist(sonarConfig['sonar.language']);
    });

    it('database config is picked from jdbc node', () => {
        sonarConfig['sonar.jdbc.url'].should.be.equal('jdbc:mysql://localhost:3306/sonar');
        sonarConfig['sonar.jdbc.username'].should.be.equal('sonar');
        sonarConfig['sonar.jdbc.password'].should.be.equal('sonar');
    });

});