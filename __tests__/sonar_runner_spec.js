var grunt = require('grunt'), should = require('should'), os = require("os");

class GruntSpy {

    constructor(options, file) {
        this.fns = {};
        this.options = options;
        this.data = {
            callback: function () {
            }
        };
        this.async = () => {
            return ()=>{};
        };
        this.file = file;
        this.log = {
            write: () => {
            },
            writeln: () => {
            },
        };
        this.verbose = {
            ok: () => {
            }
        };
    }

    registerMultiTask(name, description, fn) {
        this.fns["sonarRunner"] = fn;
    }

    getFn() {
        return this.fns["sonarRunner"];
    }

}

describe('Sonar Runner', () => {
    let sonarRunner = require("../tasks/sonar_runner");


    it("sonar config", () => {
        let options = function () {
            return {
                dryRun: true,
                debug: true,
                sonar: {
                    sourceEncoding: 'utf-8'
                },
                separator: os.EOL
            };
        };
        let content = {};
        let key = "";
        let file = {
            write: function (name, data) {
                key = name;
                content[name] = content[name] || [];
                content[name].push(...data.split("\n"));
            },
            read: function (name) {
            }
        };
        let spy = new GruntSpy(options, file);
        sonarRunner(spy);
        let analysisFn = spy.getFn();
        analysisFn.call(spy);

        let data = content[key];
        data.should.containEql("sonar.host.url=http://localhost:9000");
    });


});