'use strict';

module.exports = {
    'default': [
        'prompt:build',
        'test',
        'core-build'
    ],

    'test': [
        'jshint',
        'clean:server',
        'compass',
        'copy:test',
        'connect:test',
        'mocha'
    ],

    'build': [
        'prompt:build',
        'core-build'
    ],

    'core-build': [
        'clean:dist',
        'burrows-require_build:build',
        'requirejs:dist',
        'compass:dist',
        'useminPrepare',
        'concurrent:copy',
        'concurrent:usemin',
        'burrows-require_build:environment'
    ]

};

/*    grunt.registerTask('deleteOldZips', function () {
 grunt.file.delete('DISTRIBUTABLE/');
 });

 grunt.registerTask('deploy-staging', [
 'deleteOldZips',
 'compress',
 'ftp-deploy:deploy-staging'
 ]);

 grunt.registerTask('deploy-live', [
 'deleteOldZips',
 'compress',
 'ftp-deploy:deploy-live'
 ]);*//*

 grunt.registerTask('watch-css', ['watch_sass']);
 */

