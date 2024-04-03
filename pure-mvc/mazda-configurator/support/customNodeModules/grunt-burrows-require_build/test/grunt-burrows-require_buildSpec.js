'use strict';

var grunt = require('grunt');

exports.basicAssumptions = {
    equal2: function (test) {
        test.equal(1 + 1, 2);
        test.done();
    }
};

exports.requireBuild = {
    testTaskRuns: function (test) {
        grunt.config.set('burrows-require_build.options.locale', 'en-au');

        grunt.util.spawn({
            grunt: false,
            args: ['burrows-require_build']
        }, function () {
            test.ok(grunt.config.get('requirejs.en-au.options.locale').length === 1);
            test.done();
        });
    }/*,

    noAdditionalFiles: function (test) {
        grunt.config.set('burrows-require_build.options.locale', 'en-gb');

        grunt.util.spawn({
            grunt: false,
            args: ['burrows-require_build']
        }, function (err, result) {
            test.ok(grunt.config.get('requirejs.en-au.locale').length === 1);
            test.done();
        });
    }*/

};