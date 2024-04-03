'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config: {
            dir: {
                'app': 'app',
                'test': 'test',
                'dist': 'dist'

            }
        }
    });

    grunt.loadTasks('support/customNodeModules/grunt-burrows-requirejs_tidy/tasks');
    grunt.loadTasks('support/customNodeModules/grunt-burrows-require_build/tasks');
};
