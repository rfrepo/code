module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            test: ['tmp', 'test/fixtures/tmp']
        },

        copy: {
            files: {
                expand: true,
                cwd: 'test/fixtures/',
                dest: 'test/fixtures/tmp/',
                src: '*',
                filter: 'isFile'
            }
        },

        'burrows-requirejs_tidy': {
            files: ['test/fixtures/tmp/*.txt'],
            options: {
                baseUrl: 'test/fixtures/'
            }
        },

        nodeunit: {
            tests: ['test/*Spec.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-jshint');
    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-clean');
    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-copy');
    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-nodeunit');

    grunt.registerTask('test', ['clean', 'copy', 'burrows-requirejs_tidy', 'nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);
};