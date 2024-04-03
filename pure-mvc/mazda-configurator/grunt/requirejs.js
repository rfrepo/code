'use strict';

module.exports = {
    dist: {
        options: {
            findNestedDependencies: true,
            baseUrl: 'app/scripts/core',
            name: 'main',
            out: '<%= dir.dist %>/scripts/mazda-configurator.min.js',
            optimize: 'none',
            uglify: {
                toplevel: true,
                ascii_only: true,
                beautify: false,
                max_line_length: 1000,
                no_mangle: false
            }
        }
    }
};

