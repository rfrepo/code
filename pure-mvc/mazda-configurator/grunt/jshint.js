'use strict';

module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    all: [
        'Gruntfile.js',
        '<%= dir.app %>/scripts/**/*.js',
        '!<%= dir.app %>/scripts/core/vendor/*',
        '<%= dir.test %>/spec/**/*.js'
    ]
};
