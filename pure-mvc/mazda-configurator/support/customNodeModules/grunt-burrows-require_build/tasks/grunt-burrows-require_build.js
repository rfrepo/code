module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('burrows-require_build', function () {
        var options = this.options(),
            basePath = grunt.config.get('requirejs.dist.options.baseUrl'),
            locale = options.locale,
            environment = options.environment,
            files = grunt.file.expand(basePath + '/../' + locale + '/**/*.js',
                '!' + basePath + '/../' + locale + '/requireConfig.js');

        if (this.target === 'build') {
            setRequireBuildParameters(files, locale);
        } else if (this.target === 'environment') {
            setupEnvironment(environment);
        }


    });

    function setRequireBuildParameters(fileArray, locale) {
        if (fileArray.length !== 0) {
            setFileIncludes(fileArray);
            setRequireConfigFile(locale);
            setRequireOutputFile(locale);
        } else {
            setRequireConfigFile('core');
        }
    }

    function setupEnvironment(environment) {
        var distPath = grunt.config.get('dir.dist');

        if (environment === 'preview') {
            grunt.file.delete(distPath + '/index.html');
            grunt.file.copy(distPath + '/index-preview.html', distPath + '/index.html');
            grunt.file.delete(distPath + '/index-preview.html');
        }
    }

    function setFileIncludes(fileArray) {
        var baseUrl = grunt.config.get('requirejs.dist.options.baseUrl'),
            includeFiles = [];

        fileArray.forEach(function (file) {
            file = file.replace(baseUrl + '/', '');
            file = file.replace('.js', '');
            includeFiles.push(file);
        });
        grunt.config.set('requirejs.dist.options.include', includeFiles);
    }

    function setRequireConfigFile(locale) {
        var baseUrl = grunt.config.get('requirejs.dist.options.baseUrl'),
            distPath = grunt.config.get('dir.dist');

        grunt.config.set('requirejs.dist.options.mainConfigFile', baseUrl + '/../' + locale + '/requireConfig.js');
        grunt.file.copy(baseUrl + '/../' + locale + '/requireConfig.js', distPath + '/scripts/requireConfig-dist.' +
            locale + '.js');
    }

    function setRequireOutputFile(locale) {
        var distPath = grunt.config.get('dir.dist');

        grunt.config.set('requirejs.dist.options.out', distPath + '/scripts/mazda-configurator.' + locale + '.min.js');
    }
};
