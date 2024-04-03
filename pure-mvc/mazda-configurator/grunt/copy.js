'use strict';

module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: 'app',
                dest: 'dist',
                src: [
                    '*.{ico,txt}',
                    '.htaccess',
                    '!scripts/vendor/*.js',
                    'styles/vendor/normalize.css',
                    'resources/**/*.*'
                ]
            },
            {
                src: ['app/scripts/core/support/UrlExtractor.js'],
                dest: 'dist/scripts/support/UrlExtractor.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/services/LoadSyncDataService.js'],
                dest: 'dist/scripts/support/services/LoadSyncDataService.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/LocaleDictionary.js'],
                dest: 'dist/scripts/support/LocaleDictionary.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/GlobalConstants.js'],
                dest: 'dist/scripts/support/GlobalConstants.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/GlobalConfig.js'],
                dest: 'dist/scripts/support/GlobalConfig.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/LaunchConfig.js'],
                dest: 'dist/scripts/support/LaunchConfig.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/support/PlatformDetector.js'],
                dest: 'dist/scripts/support/PlatformDetector.js',
                filter: 'isFile'
            },
            {
                src: ['app/components/modernizr/modernizr.js'],
                dest: 'dist/scripts/vendor/modernizr.js',
                filter: 'isFile'
            },
            {
                src: ['app/components/jquery/jquery.min.js'],
                dest: 'dist/scripts/vendor/jquery.min.js',
                filter: 'isFile'
            },
            {
                src: ['app/components/requirejs/require.js'],
                dest: 'dist/scripts/vendor/require.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/puremvc-1.0.1.min.js'],
                dest: 'dist/scripts/vendor/puremvc-1.0.1.min.js',
                filter: 'isFile'
            },
            {
                src: ['app/components/underscore/underscore-min.js'],
                dest: 'dist/scripts/vendor/underscore-min.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/adapt.min.js'],
                dest: 'dist/scripts/vendor/adapt.min.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/json2.js'],
                dest: 'dist/scripts/vendor/json2.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/polyfill.min.js'],
                dest: 'dist/scripts/vendor/polyfill.min.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/string-splice.js'],
                dest: 'dist/scripts/vendor/string-splice.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/html5shiv.js'],
                dest: 'dist/scripts/vendor/html5shiv.js',
                filter: 'isFile'
            },
            {
                src: ['app/scripts/core/vendor/spin.min.js'],
                dest: 'dist/scripts/vendor/spin.min.js',
                filter: 'isFile'
            }
        ]
    },
    test: {
        files: [
            {
                expand: true,
                dot: true,
                flatten: true,
                dest: 'test/resources/html-templates',
                src: ['app/resources/html-templates/*.html']
            }
        ]
    }
};
