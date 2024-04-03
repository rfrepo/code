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

        requirejs: {
            options: {
                baseUrl: 'test/fixtures/core'
            },
            'en-au': {
                options: {
                    mainConfigFile: 'app/scripts/requireConfig-aus.js',
                    stubModules: ['jquery', 'core/mazda.utils']
                }
            }
        },

        'burrows-require_build': {
            options: {
                locale: 'en-au'
            }
        },

        nodeunit: {
            tests: ['test/*Spec.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-jshint');
    grunt.loadNpmTasks('../../../../node_modules/grunt-contrib-nodeunit');

    grunt.registerTask('test', ['nodeunit']);

    grunt.registerTask('default', ['jshint', 'test']);
};