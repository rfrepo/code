'use strict';

module.exports = {
    options: {
        sassDir: 'app/sass',
        cssDir: 'app/styles',
        imagesDir: 'app/resources/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/resources/fonts',
        importPath: 'app/components',
        relativeAssets: true
    },
    dist: {

    },
    server: {
        options: {
            debugInfo: true
        }
    }
};
