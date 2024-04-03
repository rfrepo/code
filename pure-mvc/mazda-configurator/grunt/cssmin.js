'use strict';

module.exports = {
    dist: {
        files: {
            'dist/styles/main.css': [
                'app/styles/main.css'
            ],
            'dist/styles/mobile.main.css': [
                'app/styles/mobile.main.css'
            ]
        }
    },
    aus: {
        files: {
            'dist/styles/main.css': [
                'app/styles/main.aus.css'
            ],
            'dist/styles/mobile.main.css': [
                'app/styles/mobile.main.aus.css'
            ]
        }
    }
};

