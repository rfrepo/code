'use strict';

var fs = require('fs');

exports.basicAssumptions = {
    equal2: function (test) {
        test.equal(1 + 1, 2);
        test.done();
    }
};

exports.requirejsTidy = {
    simple: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simpleFile.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simpleFile.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    },

    missingSupportFile: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simpleMissingSupportFile.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simpleMissingSupportFile.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    },

    declaredLocalVar: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simpleLocalVarDeclared.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simpleLocalVarDeclared.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    },

    depCommentedOut: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simpleDepCommentedOut.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simpleDepCommentedOut.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    },

    simalarClassNames: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simalarClassNames.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simalarClassNames.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    },

    noDeps: function (test) {
        var src = fs.readFileSync('test/fixtures/tmp/simpleNoDeps.txt', {'encoding': 'utf-8'}),
            expected = fs.readFileSync('test/expected/simpleNoDeps.txt', {'encoding': 'utf-8'});

        test.equal(src, expected);
        test.done();
    }
};